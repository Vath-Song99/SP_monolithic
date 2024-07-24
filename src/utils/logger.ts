// logger.js
import winston from "winston";
import path from "path";

const { combine, timestamp, printf, colorize, align } = winston.format;

// Create a Winston Logger
export const logger = winston.createLogger({
  defaultMeta: { service: "SCM_monolithic" },
  format: combine(
    colorize({ all: true }),
    timestamp(),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [], // Initially empty, will be configured in logInit
});

export const logInit = ({
  env,
  logLevel,
}: {
  env: string | undefined;
  logLevel: string | undefined;
}) => {
  // Output Logs to the Console (Unless it's Testing)
  logger.add(
    new winston.transports.Console({
      level: logLevel || "info",
      silent: env === "testing",
    })
  );

  if (env !== "development") {
    logger.add(
      new winston.transports.File({
        level: logLevel || "info",
        filename: path.join(__dirname, "../../logs/scm.log"),
      })
    );
  }
};

export const logDestroy = () => {
  logger.clear();
  logger.close();
};
