import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { logger } from "@SP/utils/logger";

export class AppDataSource {
  private static instance: AppDataSource;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true,
      logging: false,
      entities: [User],
      migrations: [],
      subscribers: [],
    });
  }

  public static getInstance(): AppDataSource {
    if (!AppDataSource.instance) {
      AppDataSource.instance = new AppDataSource();
    }
    return AppDataSource.instance;
  }

  public static resetInstance() {
    AppDataSource.instance = new AppDataSource();
  }

  public async initialize(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      logger.info("Data Source has been initialized!");
    } else {
      logger.info("Data Source is already initialized.");
    }
  }

  public async destroy(): Promise<void> {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      logger.info("Data Source has been destroyed.");
    } else {
      logger.info("Data Source is not initialized.");
    }
  }

  public async getConnect(): Promise<DataSource> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    return this.dataSource;
  }

  public getUserRepository() {
    if (!this.dataSource.isInitialized) {
      logger.info("Data Source is not initialized.");
    }
    return this.dataSource.getRepository(User);
  }

  public isInitialized(): boolean {
    return this.dataSource.isInitialized;
  }
}
