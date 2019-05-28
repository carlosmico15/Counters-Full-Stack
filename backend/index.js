const express=require('express');
const app=express();
const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/CounterDB',
{useCreateIndex:true, useNewUrlParser:true})

app.get('/addCounter',(req,res)=>{

})

app.listen(3001)