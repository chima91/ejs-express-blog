const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'メールアドレスを入力してください。'],
        lowercase: true,
        validate: [isEmail, '正しいメールアドレスを入力してください。']
    },
    password: {
        type: String,
        required: [true, 'パスワードを入力してください。'],
        minlength: [6, 'パスワードは6文字以上にしてください。']
    }
});

// データベースにユーザ情報を保存する前に、パスワードをハッシュ化する
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ユーザがログインするための静的メソッド
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('パスワードが正しくありません。')
    }
    throw Error('メールアドレスが正しくありません。')
}

const User = mongoose.model('user', userSchema);
module.exports = User;