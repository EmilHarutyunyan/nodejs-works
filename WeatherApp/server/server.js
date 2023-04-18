import express from "express"
import morgan from "morgan"
import chalk from "chalk"
import cors from "cors"
import weatherRoutes from "./routes/weatherRoutes.js"
const app = express()


const errorMsg = chalk.red;
const successMsg = chalk.blue;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


app.use(weatherRoutes);

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`listening port ${process.env.PORT}`));
});

