import { AppError, CommonError } from '../middlewares/errorHandler.js';
import userService from '../services/userService.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.js';

const userController = {
  signup: async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        throw new AppError(CommonError.INVALID_INPUT, '이미 존재하는 이메일 입니다. 다른 이메일로 가입해주세요', 400);
      }

      const hashedPassword = await userService.hashPassword(password);

      const newUser = await userService.createUser({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: '성공적으로 회원가입을 하셨습니다!' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await userService.getUserByEmail(email);

      if (!user) {
        throw new AppError(CommonError.INVALID_INPUT, '유저가 존재하지 않습니다', 400);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new AppError(CommonError.INVALID_INPUT, '유효하지 않은 비밀번호 입니다', 400);
      }

      const token = generateToken(user);

      res.status(200).json({ token, _id: user._id });
    } catch (error) {
      next(error);
    }
  },

  //   updateUser: async (req, res) => {
  //     const { name, phoneNumber, selfIntro, password } = req.body;
  //     const userId = req.user._id;
  //     const files = req.files || [];

  //     const image = files.map((file) => {
  //       return `${file.path}`.replace('public/', '');
  //     });

  //     try {
  //       const updatedUser = await userService.updateUser(userId, {
  //         name,
  //         phoneNumber,
  //         selfIntro,
  //         password,
  //         image,
  //       });

  //       if (!updatedUser) {
  //         return res.status(404).json({ error: 'User not found' });
  //       }

  //       res.status(200).json({ message: 'User updated successfully' });
  //     } catch (error) {
  //       res.status(500).json({ error: 'Internal server error' });
  //     }
  //   },

  //   deleteUser: async (req, res) => {
  //     const userId = req.user._id;

  //     try {
  //       const deletedUser = await userService.deleteUser(userId);

  //       if (!deletedUser) {
  //         return res.status(404).json({ error: 'User not found' });
  //       }

  //       res.status(200).json({ message: 'User deleted successfully' });
  //     } catch (error) {
  //       res.status(500).json({ error: 'Internal server error' });
  //     }
  //   },

  //   getMyInfo: async (req, res) => {
  //     const userId = req.user._id;
  //     try {
  //       const userInfo = await userService.getUserInfo(userId);
  //       if (userInfo) {
  //         res.status(200).json(userInfo);
  //       } else {
  //         res.status(404).json({ message: '유저를 찾을수 없음' });
  //       }
  //     } catch (error) {
  //       res.status(500).json({ message: 'Internal server error' });
  //     }
  //   },
};

export default userController;
