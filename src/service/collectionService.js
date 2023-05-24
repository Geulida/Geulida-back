import Collection from "../models/schema/collectionSchema.js";

class CollectionService {
  async createCollection(color, style, summary, url) {
    try {
      const newCollection = new Collection({
        color,
        style,
        summary,
        url
      });
      const savedCollection = await newCollection.save();
      return savedCollection;
    } catch (error) {
      console.error(error);
      throw new Error('저장에 실패했습니다.');
    }
  }

  async getCollectionsPerPage(collectionsPerPage, offset) {
    try {
    const collections = await Collection.find()
    .skip(offset)
    .limit(collectionsPerPage);
    return collections;
    } catch (error) {
    throw new Error('컬렉션 불러오는데 실패했습니다.');
    }
    }
    
    async getCollection(id) {
    try {
    const collection = await Collection.findById(id);
    return collection;
    } catch (error) {
    throw new Error('컬렉션 불러오는데 실패했습니다.');
    }
    }

  async deleteCollection(id) {
    try {
      await Collection.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('삭제에 실패했습니다.');
    }
  }
}

export default CollectionService;
