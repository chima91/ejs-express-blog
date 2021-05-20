module.exports.signup_get = (req, res) => {
    res.render('auths/signup', { title: 'サインアップ' });
}

module.exports.login_get = (req, res) => {
    res.render('auths/login', { title: 'ログイン' });
}

module.exports.signup_post = (req, res) => {
    const { email, passwd } = req.body;
    console.log(email, passwd);

    res.send('new signup');
}

module.exports.login_post = (req, res) => {
    const { email, passwd } = req.body;
    console.log(email, passwd);

    res.send('user login');
}