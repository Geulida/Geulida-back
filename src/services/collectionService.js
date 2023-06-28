import { AppError, CommonError } from '../middlewares/errorHandler.js';
import Collection from '../models/schema/collectionSchema.js';
import mongoose from 'mongoose';

class CollectionService {
  async createCollection(email, color, hexcode, style, summary, url) {
    try {
      const newCollection = new Collection({
        email,
        color,
        hexcode,
        style,
        summary,
        url,
      });
      const savedCollection = await newCollection.save();
      return savedCollection;
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(CommonError.UNEXPECTED_ERROR, '컬렉션 생성에 실패했습니다.', 500);
      }
    }
  }

  async getCollection(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        // 입력값이 유효한 ObjectId 형식이 아닌 경우 404 에러 반환
        throw new AppError(CommonError.RESOURCE_NOT_FOUND, '존재하지 않는 컬렉션입니다.', 404);
      }

      const collection = await Collection.findById(id).exec();
      if (!collection) {
        throw new AppError(CommonError.RESOURCE_NOT_FOUND, '존재하지 않는 컬렉션입니다.', 404);
      }

      return collection;
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(CommonError.UNEXPECTED_ERROR, '컬렉션 조회에 실패했습니다.', 500);
      }
    }
  }
  async getCollectionsPerPage(collectionsPerPage, offset, email) {
    try {
      const collections = await Collection.find({ email }).skip(offset).limit(collectionsPerPage);

      return collections;
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(CommonError.UNEXPECTED_ERROR, '컬렉션 조회에 실패했습니다.', 500);
      }
    }
  }

  async deleteCollection(id) {
    try {
      const deletedCollection = await Collection.findByIdAndDelete(id);
      if (!deletedCollection) {
        throw new AppError(CommonError.RESOURCE_NOT_FOUND, '존재하지 않는 컬렉션입니다.', 404);
      }
      return deletedCollection;
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(CommonError.UNEXPECTED_ERROR, '컬렉션 삭제에 실패했습니다.', 500);
      }
    }
  }
}

export default CollectionService;
