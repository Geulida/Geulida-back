import CollectionService from "../service/collectionService.js";

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
    if (!collection) {
        res.status(404).json({ message: '존재하지 않는 컬렉션입니다.' });
      } else {
        res.json(collection);
      }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

async deleteCollection(req, res) {
    const { id } = req.params;
    try {
      const collectionService = new CollectionService();
      await collectionService.deleteCollection(id);
      res.status(204).json({ message: '삭제되었습니다.' });
    } catch (error) {
      if (error.message === '이미 삭제되었거나 존재하지 않는 컬렉션입니다.') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
  }

export default collectionController