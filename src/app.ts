import compression from "compression";
import express, { Application, NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { getConfig } from "./utils/cofig";
import xss from "xss";
import { errorHandler } from "./middlewares/error-handler";
import { RegisterRoutes } from "./routes/v1/routes";
import { StatusCode } from "./utils/consts";
import { logger } from "./utils/logger";
import swaggerUi from "swagger-ui-express";
import path from "path";

const app: Application = express();
const config = getConfig();

// Security: Set various HTTP headers to help protect the app
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
      },
    },
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
    frameguard: { action: "deny" },
  })
);

// CORS: Allow cross-origin requests
app.use(
  cors({
    origin: config.env !== "development" ? "https://your-domain.com" : "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

// Logging: Log HTTP requests
app.use(morgan("combined"));

// Compression: Compress response bodies
app.use(compression());

// Rate Limiting: Limit repeated requests to public APIs
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});
app.use("/api/auth/", authLimiter);

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(generalLimiter);

// Body parser: Parse incoming request bodies in JSON format, with a limit of 10mb
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Sanitize user input to prevent XSS attacks
app.use((req, _res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

//API Routes
RegisterRoutes(app);
// Serve the Swagger UI
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json", // Point to the generated Swagger JSON file
    },
  })
);

// Serve the generated Swagger JSON file
app.get("/swagger.json", (_req, res) => {
  res.sendFile(path.join(__dirname, "./swagger-dist/swagger.json"));
});
// Catching invalid
app.use("*", (req: Request, res: Response, _next: NextFunction) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  logger.error(`${fullUrl} endpoint does not exist`);
  res
    .status(StatusCode.NotFound)
    .json({ message: "The endpoint called does not exist." });
});

//error handler
app.use(errorHandler);

export default app;
