const User = require('../models/user');

const handleErrors = err => {
    // console.log(err.message, err.code);
    let errors = { email: '', passwd: ''};

    if(err.code === 11000) {
        errors.email = '入力されたメールアドレスは既に登録されています。'
        return errors;
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('auths/signup', { title: 'サインアップ' });
}

module.exports.login_get = (req, res) => {
    res.render('auths/login', { title: 'ログイン' });
}

module.exports.signup_post = async (req, res) => {
    const { email, passwd } = req.body;

    try {
        const user = await User.create({ email, passwd })
        res.status(201).json(user);
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = (req, res) => {
    const { email, passwd } = req.body;
    
}