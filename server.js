'use strict';
let book=require('./mongo')
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})
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
app.listen(PORT, () => console.log(`listening on ${PORT}`));
// seedData()