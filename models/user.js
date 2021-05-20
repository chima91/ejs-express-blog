const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'メールアドレスを入力してください。'],
        lowercase: true,
        validate: [isEmail, '正しいメールアドレスを入力してください。']
    },
    passwd: {
        type: String,
        required: [true, 'パスワードを入力してください。'],
        minlength: [6, 'パスワードは6文字以上にしてください。']
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;