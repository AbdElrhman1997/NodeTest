const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ArticleSchema=new Schema({
    name:String,
    age:String,
    salary:String,
    date:{type:Date,default:Date.now}
})

const Article=mongoose.model('Article',ArticleSchema);

module.exports=Article;