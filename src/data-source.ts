import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'


dotenv.config();

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env

// Configuration for the database connection
  
//   export const AppDataSource = new DataSource({
//     type: "sqlite", // Assuming SQLite database
//     database: DB_DATABASE,
//     synchronize: NODE_ENV === "dev"? false: false,
//     logging: NODE_ENV === "dev"? false: false,
//     entities: [process.env.NODE_ENV === 'production' ? 'build/entity/*.js' : 'src/entity/*.ts'], // Adjust paths based on your project structure
//     migrations: [process.env.NODE_ENV === 'production' ? 'build/migrations/*.js' : 'src/migrations/*.ts'], // Adjust paths based on your project structure
//     subscribers: [],
//   });

export const AppDataSource = new DataSource({
    
    type: "mssql",
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: NODE_ENV === "dev"? false: false,
    logging: NODE_ENV === "dev"? false: false,
    entities: [process.env.NODE_ENV === 'production' ? 'build/entity/*.js' : 'src/entity/*.ts'],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
});