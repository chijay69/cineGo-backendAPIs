import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import userRouter from "./routes/auth/routes";
import mainRouter from "./routes/main/routes";
import "reflect-metadata";
import { log } from "console";
import { errorHandler } from "./middleware/error.middleware";
import { port } from './config';

const app = express();

app.use(express.json());
app.use(errorHandler);


app.use("/api/v1/users/auth", userRouter);
app.use("/api/v1/users/main", mainRouter);

app.get("*", (req: Request, res: Response, next: ()=> void ) => {
    res.status(505).json({ message: "bad request"});
});


AppDataSource.initialize().then(async ()=> {
    app.listen(port, ()=>{
        console.log("Server is running on http://localhost: "+ port); 
    });
    console.log("Datasource has been initialized!");
    
}).catch((error) => console.log(error));

