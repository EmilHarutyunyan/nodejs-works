import { Router } from "express";
import fishController from "../controllers/fishController.js";



const fishRouter = Router();

fishRouter.get('/fish/lists', fishController.getLists)

fishRouter.route('/fish/:species')
  .get(fishController.getSpecies)
  .delete(fishController.deleteSpecies)

export default fishRouter;