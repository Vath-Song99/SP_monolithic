import path from "path";
import dotenv from "dotenv";
import { ApiError } from "@SP/errors/api-error";

function createConfig(configPath: string) {
  dotenv.config({ path: configPath });

  // Validate essential configuration
  const requiredConfig = ["NODE_ENV", "PORT", "DATABASE_URL", "LOG_LEVEL"];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    throw new ApiError(
      `Missing required environment variables: ${missingConfig.join(", ")}`
    );
  }

  // Return configuration object
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoUrl: process.env.MONGODB_URL,
    logLevel: process.env.LOG_LEVEL,
  };
}

export function getConfig(currentEnv: string = "development") {
  const configPath = path.join(
    __dirname,
    currentEnv === "development"
      ? "../../configs/.env"
      : currentEnv === "staging"
      ? "../../configs/.env.staging"
      : currentEnv === "production"
      ? "../../configs/.env.production"
      : "../../configs/.env.test"
  );
  return createConfig(configPath);
}
