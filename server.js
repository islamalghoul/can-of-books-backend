'use strict';
let book=require('./mongo')
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})
let handelupdate=(req,res)=>{
  const id = req.params.id;
  const {title,description,status} = req.body; //Destructuring assignment
  console.log(req.body);
  book.findByIdAndUpdate(id,{title,description,status},(err,result)=>{

      if(err) {
          console.log(err);
      }
      else {
        book.find({},(err,result)=>{
              if(err)
              {
                  console.log(err);
              }
              else
              {
                console.log(result)
                  res.send(result);
                  
              }
          })
      }
  })

}
app.put('/books/:id',handelupdate);


let deleteHandler=(req,res)=>{
  let id=req.params.id
  console.log(id)
  book.deleteOne({_id:id},(err,result)=>{
    book.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          
          res.send(result);
      }
  })

  })
  }
  let bookshandler= async(req,res)=>{
    let{title,description,status,email,name}=req.body;
    console.log(title,description,status)
    console.log('hi from frontend')
    await book.create({
      title: title,
      description:description,
      status :status,
      email:email,
       name :name
    })
    book.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          
          res.send(result);
      }
  })
  } 
app.delete('/books/:id',deleteHandler)
app.post('/books',bookshandler)

app.get('/',(req,res)=>{
  res.send('home route request received')
})
app.get('/books',(req,res)=>{

  book.find({},(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(result);
        res.send(result);
    }
})
})






app.get('/books/:email',(req,res)=>{
  let email=req.params.email
  book.find({email : email},(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(result);
        res.send(result);
    }
})
})




app.listen(PORT, () => console.log(`listening on ${PORT}`));
