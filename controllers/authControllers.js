const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleErrors = err => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    if(err.message === '正しくないメールアドレス') {
        errors.email = '正しいメールアドレスを入力してください。';
    }
    if(err.message === '正しくないパスワード') {
        errors.password = '正しいパスワードを入力してください。';
    }

    if(err.code === 11000) {
        errors.email = '入力されたメールアドレスは既に登録されています。';
        return errors;
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
    return jwt.sign({ id }, 'od-grn-jazz line bot', {
        expiresIn: maxAge
    });
};

module.exports.signup_get = (req, res) => {
    res.render('auths/signup', { title: 'サインアップ' });
}

module.exports.login_get = (req, res) => {
    res.render('auths/login', { title: 'ログイン' });
}

module.exports.logout_get = (req, res) => {
    res.cookie('myJwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body; // 分割代入

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('myJwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body; // 分割代入

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('myJwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}