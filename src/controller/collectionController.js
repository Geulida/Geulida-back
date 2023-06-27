import CollectionService from '../services/collectionService.js';
import { AppError, CommonError } from '../middlewares/errorHandler.js';


const collectionController = {
  async createCollection(req, res, next) {
    const { color, hexcode, style, summary, url } = req.body;
    const email = req.user.email;
    try {
      if (!email) {
        throw new AppError(CommonError.UNAUTHORIZED_ACCESS, '로그인 후 이용 가능합니다.', 401);
      }
      const collectionService = new CollectionService();
      const savedCollection = await collectionService.createCollection(email, color, hexcode, style, summary, url);
      res.status(201).json(savedCollection);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async getCollection(req, res, next) {
    const { id } = req.params;
    const email = req.user.email;
    try {
      const collectionService = new CollectionService();
      const collection = await collectionService.getCollection(id);
      if (!email) {
        throw new AppError(CommonError.UNAUTHORIZED_ACCESS, '로그인 후 이용 가능합니다.', 401);
      }
      if (email !== collection.email) {
        throw new AppError(CommonError.UNAUTHORIZED_ACCESS, '나의 컬렉션만 조회가 가능합니다.', 401);
      }
      if (!collection) {
        throw new AppError(CommonError.RESOURCE_NOT_FOUND, '존재하지 않는 컬렉션입니다.', 404);
      }
      res.status(200).json(collection);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async getCollectionsByPage(req, res, next) {
    const { page } = req.query; // /collection?page=2
    const email = req.user.email;
    try {
      if (!email) {
        throw new AppError(CommonError.UNAUTHORIZED_ACCESS, '로그인 후 이용 가능합니다.', 401);
      }
      if (email !== collection.email) {
        throw new AppError(CommonError.UNAUTHORIZED_ACCESS, '나의 컬렉션만 조회가 가능합니다.', 401);
      }
      const collection = await collectionService.getCollection(id);
      const collectionService = new CollectionService();
      const collectionsPerPage = 12; // 페이지당 컬렉션 수
      const offset = (page - 1) * collectionsPerPage; // 오프셋 계산

      const collections = await collectionService.getCollectionsPerPage(collectionsPerPage, offset);
      if (!collections.length) {
        throw new AppError(CommonError.RESOURCE_NOT_FOUND, '해당 페이지는 존재하지 않습니다.', 404);
      }
      res.status(200).json(collections);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async deleteCollection(req, res, next) {
    const { id } = req.params;
    const email = req.user.email;

    try {
      const collectionService = new CollectionService();
      const deletedCollection = await collectionService.deleteCollection(id);

      if (!email) {
        throw new AppError(CommonError.UNAUTHORIZED_ACCESS, '로그인 후 이용 가능합니다.', 401);
      }

      if (email !== deletedCollection.email) {
        throw new AppError(CommonError.UNAUTHORIZED_ACCESS, '나의 컬렉션만 삭제가 가능합니다.', 401);
      }

      if (!deletedCollection) {
        throw new AppError(CommonError.RESOURCE_NOT_FOUND, '없는 컬렉션입니다.', 404);
      }

      res.status(200).json({ message : "삭제되었습니다."});
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default collectionController;
