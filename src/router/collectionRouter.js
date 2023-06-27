import { Router } from 'express';
import { collectionController } from '../controller/index.js';
import { validateRequestBody } from '../middlewares/validateRequest.js';
import { isAuth } from '../utils/token.js';

const collectionRouter = Router();

collectionRouter.post('/collection', isAuth, validateRequestBody(['color', 'hexcode', 'style', 'summary', 'url']), collectionController.createCollection);
collectionRouter.get('/collection/:id', isAuth, collectionController.getCollection);
collectionRouter.get('/collection', isAuth, collectionController.getCollectionsByPage);
collectionRouter.delete('/collection/:id', isAuth, collectionController.deleteCollection);

export default collectionRouter;
