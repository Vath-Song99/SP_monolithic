import app from "./app";
import { AppDataSource } from "./database";
import { getConfig } from "./utils/cofig";
import { logger, logInit } from "./utils/logger";

async function run() {
  try {
    // Initialize environment
    const currentEnv = process.env.NODE_ENV || "development";
    const config = getConfig(currentEnv);

    // Activate logger
    logInit({ env: currentEnv, logLevel: config.logLevel });
    logger.info(`SCM server has started with process id ${process.pid}`);

    // active server posgresql
    const posgres = AppDataSource.getInstance();
    await posgres.getConnect();

    // Start server
    const server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });

    // Exit handler to gracefully shut down the server
    const exitHandler = async () => {
      if (server) {
        server.close(() => {
          logger.info("Server closed!");
          // Add any other cleanup code here, like disconnecting from a database
          logger.info("Posgresql disconnected!");
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    // Error handler for unexpected errors
    const unexpectedErrorHandler = (error: unknown) => {
      logger.error("Unhandled error", { error });
      exitHandler();
    };

    // Global error handling
    process.on("uncaughtException", unexpectedErrorHandler); // Synchronouse
    process.on("unhandledRejection", unexpectedErrorHandler); // Asynchronouse

    // Handle SIGTERM signal for graceful shutdown
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      if (server) {
        // Stop the server from accepting new requests but keep existing connections open until all ongoing requests are done
        server.close(() => {
          logger.info("Server closed due to SIGTERM");
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    });
  } catch (error: unknown) {
    logger.error("SCM Server failed!", { error });
    process.exit(1);
  }
}

run();
