const express=require('express');
const mongoose=require('mongoose');
const Article=require('./Models/article');
const app =express();
const PORT =process.env.port||8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.set('view engine','ejs');

mongoose.connect('mongodb+srv://Todo-App:todo-app@cluster0.gfznlld.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    app.listen(PORT,()=>{console.log(`App working in port${PORT}`)});
})
.catch((err)=>{
    console.log(err);
});



app.get('/',(req,res)=>{
    Article.find({age:{$in:[20,19,56]}})
    .sort({age:-1})
    // .select({name:1,salary:1})
    // .limit(3)
    .then((result) => {
        res.render('index',{arrArticles:result});
    })
    .catch((err) => {console.log(err)});
})

app.get('/article-details/:id',(req,res)=>{
    Article.findById(req.params.id)
    .then((result) => {
        res.render('article-details',{article:result})
    })
    .catch((err)=>{console.log(err)});
})

app.post('/',(req,res)=>{
    const article=new Article(req.body);
    article
    .save()
    .then(()=>{res.redirect('/')})
    .catch(err=>console.log(err));
    
})

app.delete('/article-details/:id',(req,res)=>{
    Article.findByIdAndDelete(req.params.id)
    .then(()=>{res.redirect('/')})
    .catch((err) => {console.log(err)})
});

//for auto refresh
const livereload=require('livereload');
const path=require('path');
const liveReloadServer=livereload.createServer();
liveReloadServer.watch(path.join(__dirname,'public'));
const connectLiveReload=require('connect-livereload');
app.use(connectLiveReload());

liveReloadServer.server.once('connection',()=>{
    setTimeout(()=>{
        liveReloadServer.refresh('/');
    },100)
})







