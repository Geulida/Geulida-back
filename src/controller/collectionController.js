const CollectionService = require('../service/collectionService');

const collectionController = {
    async createCollection(req, res) {
  const { color, style, summary, result } = req.body;
  try {
    const collectionService = new CollectionService();
    const savedCollection = await collectionService.createCollection(color, style, summary, result);
    res.status(201).json(savedCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

async getCollection(req, res) {
  const { id } = req.params;
  try {
    const collectionService = new CollectionService();
    const collection = await collectionService.getCollection(id);
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

async deleteCollection(req, res) {
  const { id } = req.params;
  try {
    const collectionService = new CollectionService();
    await collectionService.deleteCollection(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}}

module.exports = collectionController