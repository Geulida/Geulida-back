const { Router } = require('express');
const collectionRouter = Router();

const collectionController = require('../controller/collectionController');

collectionRouter.post('/collection', collectionController.createCollection);
collectionRouter.get('/collection/:id', collectionController.getCollection);
collectionRouter.delete('/collection/:id', collectionController.deleteCollection);

module.exports = collectionRouter;