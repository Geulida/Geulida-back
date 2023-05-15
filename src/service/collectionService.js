import Collection from "../models/schema/collectionSchema.js";

class CollectionService {
  async createCollection(color, style, summary, result) {
    try {
      const newCollection = new Collection({
        color,
        style,
        summary,
        result
      });
      const savedCollection = await newCollection.save();
      return savedCollection;
    } catch (error) {
      console.error(error);
      throw new Error('저장에 실패했습니다.');
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
