import * as dotenv from "dotenv";
dotenv.config()
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fishRouter from "./routes/fishRouter.js";
import { notFound } from "./middleware/notFound.js";
const app = express()



app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));




app.use(fishRouter)

app.use(notFound)

app.listen(process.env.PORT,(error) => {
  error
    ? console.log("error",(error))
    : console.log(`listening port ${process.env.PORT}`);
})