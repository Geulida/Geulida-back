import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: '이름은 최소 2글자 이상이여야 합니다',
  }),
];

const emailValidator = [
  validate({
    validator: 'matches',
    arguments: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    message: '이메일 형식에 맞게 해주세요!',
  }),
];

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, validate: nameValidator },
    email: { type: String, required: true, unique: true, validate: emailValidator },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
