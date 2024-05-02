import { AppDataSource } from "./data-source";
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import userRouter from "./routes/auth/routes";
import mainRouter from "./routes/main/routes";
import "reflect-metadata";
import { log } from "console";
import { errorHandler } from "./middleware/error.middleware";
dotenv.config();

const app = express();

app.use(express.json());
app.use(errorHandler);

const { PORT = 3000 } = process.env;

app.use("/api/v1/users/auth", userRouter);
app.use("/api/v1/users/main", mainRouter);

app.get("*", (req: Request, res: Response, next: ()=> void ) => {
    res.status(505).json({ message: "bad request"});
});


AppDataSource.initialize().then(async ()=> {
    app.listen(PORT, ()=>{
        console.log("Server is running on http://localhost: "+ PORT); 
    });
    console.log("Datasource has been initialized!");
    
}).catch((error) => console.log(error));

