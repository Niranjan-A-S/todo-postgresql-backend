import dotenv from "dotenv";
import express from "express";
import { HTTP_PORT } from "./constants";
import { connectToDB } from "./config/db";
import { Pool } from "pg";
import { errorHandler } from "./middlewares/error-handler";
import { todosRouter } from "./routes/todos";


//to read .env file
dotenv.config();

//connecting to database
export const pool = connectToDB().then((pool: Pool) => {
    console.log(`Connected to database successfully`);
    return pool;
});

const app = express();

//body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for registering pool
app.use((req, res, next) => {

    (req as any).pool = pool;
    next();
})

app.use('/', todosRouter)

//error-handling middleware
app.use(errorHandler);

app.listen(HTTP_PORT, () => {
    console.log(`Server started running on port ${HTTP_PORT}`);
});
