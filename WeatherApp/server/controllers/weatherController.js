import getFormattedWeatherData from "../service/weatherService.js";

const handleError = (res, error) => {
  res.status(200).json({ error });
};


const getWeather = async (req, res) => {
  const { city = "Armenia", units="metric" } = req.body;
  try {
    const weatherInfo = await getFormattedWeatherData({ q:city, units });
    res.status(200).json(weatherInfo);
  } catch (error) {
    handleError(res, error);
  }

}
export {getWeather}