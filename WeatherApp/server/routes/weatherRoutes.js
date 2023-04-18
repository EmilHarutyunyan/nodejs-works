import express from "express";
import { getWeather } from "../controllers/weatherController.js";

const weatherRouter = express.Router();

weatherRouter.post('/api/weather', getWeather)

export default weatherRouter