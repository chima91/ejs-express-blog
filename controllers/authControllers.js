const User = require('../models/user');

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
        console.log(err);
        res.status(400).send('error, user not registerd');
    }
}

module.exports.login_post = (req, res) => {
    const { email, passwd } = req.body;
    
}