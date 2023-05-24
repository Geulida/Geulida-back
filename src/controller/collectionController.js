import CollectionService from "../service/collectionService.js";

const collectionController = {
    async createCollection(req, res) {
  const { color, style, summary, url } = req.body;
  try {
    const collectionService = new CollectionService();
    const savedCollection = await collectionService.createCollection(color, style, summary, url);
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

async getCollectionsByPage(req, res) {
  const { page } = req.query; // /collection?page=2
  try {
    const collectionService = new CollectionService();
    const collectionsPerPage = 12; // 페이지당 컬렉션 수
    const offset = (page - 1) * collectionsPerPage; // 오프셋 계산

    const collections = await collectionService.getCollectionsPerPage(collectionsPerPage, offset);
    if (!collections.length) {
      res.status(404).json({ message: '해당 페이지는 존재하지 않습니다.' });
    } else {
      res.json(collections);
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