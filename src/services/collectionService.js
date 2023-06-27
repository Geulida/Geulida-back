import { AppError, CommonError } from "../middlewares/errorHandler.js";
import Collection from "../models/schema/collectionSchema.js";
import mongoose from "mongoose"

class CollectionService {
  async createCollection(color, hexcode, style, summary, url) {
    try {
      const newCollection = new Collection({
        color,
        hexcode,
        style,
        summary,
        url
      });
      const savedCollection = await newCollection.save();
      return savedCollection;
    } catch (error) {
      console.error(error);
      throw new AppError(CommonError.UNEXPECTED_ERROR,'저장에 실패했습니다.',500);
    }
  }

  async getCollectionsPerPage(collectionsPerPage, offset) {
    try {
    const collections = await Collection.find()
    .skip(offset)
    .limit(collectionsPerPage);
    return collections;
    } catch (error) {
    throw new AppError(CommonError.UNEXPECTED_ERROR,'컬렉션 불러오는데 실패했습니다.',500);
    }
    }
    
    async getCollection(id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        // 입력값이 유효한 ObjectId 형식이 아닌 경우 404 에러 반환
        throw new AppError(CommonError.RESOURCE_NOT_FOUND, '존재하지 않는 컬렉션입니다.', 404);
      }
      try {
        const collection = await Collection.findById(id);
        if (!collection) {
          throw new AppError(CommonError.RESOURCE_NOT_FOUND, '존재하지 않는 컬렉션입니다.', 404);
        }
        return collection;
      } catch (error) {
        console.error(error);
        throw new AppError(CommonError.UNEXPECTED_ERROR, '컬렉션 조회에 실패했습니다.', 500);
      }
    }

  async deleteCollection(id) {
    try {
      await Collection.findByIdAndDelete(id);
    } catch (error) {
      throw new AppError(CommonError.UNEXPECTED_ERROR,'삭제에 실패했습니다.',500);
    }
  }
}

export default CollectionService;
