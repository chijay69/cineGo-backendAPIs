import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
// const dataSource = require("typeorm").DataSource;
import dotenv from 'dotenv';


dotenv.config();

// const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env

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

// export const AppDataSource = new DataSource({
    
//     type: "mssql",
//     host: DB_HOST,
//     port: parseInt(DB_PORT),
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: DB_DATABASE,
//     synchronize: NODE_ENV === "dev"? false: false,
//     logging: NODE_ENV === "dev"? false: false,
//     entities: [User],
//     migrations: [__dirname + "/migration/*.ts"],
//     subscribers: [],
//     options: {
//         connectTimeout: 30000, // 30 seconds (adjust as needed)
//     }
// });


dotenv.config(); // Load environment variables

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env;

export const datasourceoptions : DataSourceOptions = {
  type: "postgres", // Default to mssql if DB_TYPE is not set
  host: DB_HOST,
  port: parseInt(DB_PORT, 10), // Parse port as integer (base 10)
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: NODE_ENV === "dev" ? false: false, // Set synchronize based on NODE_ENV
  logging: NODE_ENV === "dev"? false: false, // Set logging based on NODE_ENV
  entities: [NODE_ENV === 'dev' ? 'src/entity/*.ts' : 'build/entity/*.js'],
  migrations: [NODE_ENV === 'dev' ? __dirname + "/migration/*.ts": __dirname + "/migration/*.js" ], // Adjust path if necessary
  subscribers: [],
};

export const AppDataSource = new DataSource(datasourceoptions);

