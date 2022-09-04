const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/can-of-books',{useNewUrlParser: true, useUnifiedTopology: true}) ;  

const booksSchema = new mongoose.Schema({
    title: String,
    description:String,
    status :String
  });
  let book=mongoose.model('books',booksSchema)

  let seedData=async()=>{
let firstBook= new book({
    title : 'Scripture Reflections',
    description:"Scripture Reflections of a Christian in the Marketplace - Old Testament: Laying Down Our Work, Family, and All That Matters Before Jesus", 
    status:'instock'

})
let secondBook= new book({
    title : 'Talking To Strangers',
    description:"Compelling, haunting, tragic stories… resonate long after you put the book down' James McConnachie, Sunday Times Book of the Year", 
    status:'instock'

})
let thirdBook= new book({
    title : 'The Institute',
    description:"It does everything you'd expect of a masterpiece - and it is one' Sunday Express ", 
    status:'instock'

})
await firstBook.save()
await secondBook.save()
await thirdBook.save()
  }

  module.exports= book