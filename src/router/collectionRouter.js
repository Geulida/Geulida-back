import { Router } from "express";
import { collectionController } from "../controller/index.js";
const collectionRouter = Router();

collectionRouter.post('/collection', collectionController.createCollection);
collectionRouter.get('/collection/:id', collectionController.getCollection);
collectionRouter.get('/collection', collectionController.getCollectionsByPage);
collectionRouter.delete('/collection/:id', collectionController.deleteCollection);

export default collectionRouter;