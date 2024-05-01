import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import * as dotenv from 'dotenv'


dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env

export const AppDataSource = new DataSource({
    type: "mssql",
    host: DB_HOST || "localhost",
    port: parseInt( DB_PORT || "5432"),
    username: DB_USERNAME || "sa",
    password: DB_PASSWORD || "Admin12345",
    database: DB_DATABASE || "tempdb",
    synchronize: NODE_ENV === "dev"? false: false,
    logging: NODE_ENV === "dev"? false: false,
    entities: [User],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
    options: {
        connectTimeout: 30000, // 30 seconds (adjust as needed)
    }
})
