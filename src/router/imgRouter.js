import { Router } from "express";
import { imgController } from "../controllers/imgController.js";
const imgRouter = Router();

imgRouter.post("/", imgController.createImg);

export default imgRouter;
