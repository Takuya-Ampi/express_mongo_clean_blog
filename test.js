const mongoose = require('mongoose')
require('./models/BlogPost.js')
const BlogPost = mongoose.model('BlogPost')
require('./models/User')
const User = mongoose.model('User')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

// テストデータの作成(Create)
// BlogPost.create({
//   title: 'testTitle',
//   body: 'WeMakeTestBody'
// }, (error, blogPost)=> {
//   console.log(error, blogPost)
// })

const id = "5fbb44f4a7e9a82a3a334b1f"


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

// User.findByIdAndDelete(id, (error, blogPost)=>{
//   console.log(error, blogPost)
// })
