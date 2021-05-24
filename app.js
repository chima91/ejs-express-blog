const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const cookieParser = require('cookie-parser');

// connect MongoDB Atlas
const dbURI ='mongodb+srv://user_20210510:test_202105_8@practicenosql.oq6tw.mongodb.net/ejs-express-blog?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'about' });
});
app.use('/blogs', blogRoutes);
app.use(authRoutes);
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});


// mongoose test below

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'my chima blog3',
//         snippet: 'What is going on?',
//         body: 'foooooooooooooooooooooooooo'
//     })
//     blog.save()
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// });
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });
// app.get('/single-blog', (req, res) => {
//     Blog.findById('609a7bbd850c1d124991da60')
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// });