const mongoose = require('mongoose')
require('./models/BlogPost.js')
const BlogPost = mongoose.model('BlogPost')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

// テストデータの作成(Create)
// BlogPost.create({
//   title: 'testTitle',
//   body: 'WeMakeTestBody'
// }, (error, blogPost)=> {
//   console.log(error, blogPost)
// })

const id = "5fba51ba1586060f93f86250"


// テストデータの検索(Read)
// BlogPost.find({
//   title: 'testTitle'
// }, (error, blogPost)=>{
//   console.log(error, blogPost)
// })
// BlogPost.find({
//   _id: id
// }, (error, blogPost)=>{
//   console.log(error, blogPost)
// })

// テストデータの更新(Update)
// BlogPost.findByIdAndUpdate(id,{
//   title: 'UpdatedTitle',
// }, (error, blogPost)=>{
//   console.log(error, blogPost)
// })

// テストデータの削除(Delete)
// BlogPost.findByIdAndDelete(id, (error, blogPost)=>{
//   console.log(error, blogPost)
// })
