import { messageFish, statusCode } from "../constants/constants.js";
import fishService from "../services/fishService.js";
import redis from 'redis';
const redisClient = redis.createClient();
await redisClient.connect();
redisClient.on('error', err => console.log('Redis Client Error', err));

const getLists = async (req,res) => {
  try {
    const fishList = await fishService.getFishLists();
    res.status(statusCode.ok).json(fishList);
  } catch (error) {
    res.status(statusCode.badRequest).json(error)
  }
} 
const getSpecies = async (req,res) => {
  let {species} = req.params;
  let fish = null;

  try {
    // try to get the data from the cache
    fish = await redisClient.get(species);
  } catch (err) {
    res.sendStatus(statusCode.server);
  }

  // if data is in cache, send data to client
  if (fish !== null) {
    res.status(statusCode.ok).send(JSON.parse(fish));
    return;
  }

  try {
    // otherwise, fetch data from API
    fish = await fishService.getFishSpecies(species);
    // and store it in Redis. 2000 is the time to live in seconds
    await redisClient.set(species, JSON.stringify(fish), { EX: 2000 });
    res.status(statusCode.ok).send(fish);
  } catch (err) {
  
    res.status(statusCode.badRequest).json({message:err});
  }
}
const deleteSpecies = async (req,res) => {
  let { species } = req.params;
  let fish = null;
  try {
    // try to get the data from the cache
    fish = await redisClient.get(species);
  } catch (err) {
    res.sendStatus(statusCode.server);
  }
  // if data is in cache, send data to client
  if (fish === null) {
    res.status(statusCode.badRequest).send({ message: messageFish.notFoundSpeciesKey });
    return;
  }
  try {
    await redisClient.del(species);
    res.status(statusCode.ok).send({ message: `${messageFish.deleteKeySpecies} ${species}`});
  } catch (err) {
    res.sendStatus(statusCode.server);
  }

}

const fishController = { getLists, getSpecies, deleteSpecies }
export default fishController 