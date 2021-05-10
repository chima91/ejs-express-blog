const express = require('express');
const app = express();

// connect MongoDB Atlas
const dbURI ='mongodb+srv://user_20210510:test_202105_8@practicenosql.oq6tw.mongodb.net/ejs-express-blog?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    // res.sendFile('./views/index.html', { root: __dirname });
    res.render('index', { title: 'home', blogs });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'about' });
});
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})