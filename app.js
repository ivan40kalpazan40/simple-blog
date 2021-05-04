const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const _ = require('lodash');
const app = express();

const Post =  require('./models/post');


const port = process.env.PORT || 3000;

const messages = require( __dirname + '/scripts/contents');
const trunc = require('./scripts/truncator');
const posts = [{newPost:messages.longText, title: 'Title'}];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));


mongoose.connect('mongodb+srv://ivan:1234@cluster0.h4o6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })


app.get('/', function(req, res){
    Post.find({}, function(err, data) {
        if(err) return console.log('Error was found when retrieving data from DB!' + err);
        res.render('home', { message: messages.homePageContent, data });
    });
    
});


app.get('/about', function(req, res){
    res.render('about', { message: messages.aboutPageContent });
});

app.get('/contact', function(req, res){
    res.render('contact', { message: messages.contactPageContent });
});

app.get('/compose', function(req, res){
    res.render('compose', {});
});

app.post('/compose', function(req, res){
    const title = req.body.title;
    const newPost = req.body.newPost;
    const post = new Post({ title, content: newPost });
    post.save(function(err, data){
        if(err) return console.log(`Error occurred while composing this post! ` + err);
        res.redirect('/');
    });
    
});


app.get('/home', function(req, res){
    res.redirect('/');
});

app.get('/posts/:id', function(req, res){
    const id = req.params.id;
    Post.findById(id, function(err, data) {
        if(err) return console.log('Error occurred while retrieving post: ' + err);
        const { title, content } =  data;
        res.render('post', { title, content });
    });
});

app.get('/*', function(req, res){
    res.send('Error');
});

app.listen(port, function(){
    console.log(`Server started on port ${port}...`);
});
