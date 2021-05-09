const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.listen(3000);

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