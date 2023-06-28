import bcrypt from 'bcryptjs';
import User from '../models/schema/userSchema.js';
import { AppError, CommonError } from '../middlewares/errorHandler.js';

const userService = {
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new AppError(CommonError.INVALID_INPUT, '유저를 생성하는데 에러가 발생', 400);
    }
  },

  getUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw new AppError(CommonError.INVALID_INPUT, '유저를 가져오는데 에러 발생', 400);
    }
  },

  // updateUser: async (userId, userData) => {
  //   try {
  //     const updatedUser = await User.findByIdAndUpdate({ _id: userId }, userData, {
  //       new: true,
  //     });
  //     return updatedUser;
  //   } catch (error) {
  //     throw new Error('Failed to update user');
  //   }
  // },

  // deleteUser: async (userId) => {
  //   try {
  //     const deletedUser = await User.findByIdAndDelete(userId);
  //     return deletedUser;
  //   } catch (error) {
  //     throw new Error('Failed to delete user');
  //   }
  // },

  hashPassword: async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Failed to hash password');
    }
  },

  getUserInfo: async (userId) => {
    try {
      const userInfo = await User.findById({ _id: userId });
      return userInfo;
    } catch (error) {
      throw new Error('Failed to fetch user information');
    }
  },
};

export default userService;
