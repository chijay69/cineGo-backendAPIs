import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
// const dataSource = require("typeorm").DataSource;
import dotenv from 'dotenv';


dotenv.config();

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV, DB_SYNCHRONIZE } = process.env


export const AppDataSource = new DataSource({
    
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: Boolean(DB_SYNCHRONIZE),
    logging: NODE_ENV === "dev"? false: false,
    entities: [process.env.NODE_ENV === 'production' ? 'build/entity/*.js' : 'build/entity/*.js'],
    migrations: [__dirname + "/migration/*.js"],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false
      }
});