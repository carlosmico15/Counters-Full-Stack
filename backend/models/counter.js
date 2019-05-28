const mongoose=require('mongoose');

const counterSchema=new mongoose.Schema({
    count:Number,
})
const CounterModel=mongoose.model("Counter",counterSchema)
module.exports=CounterModel;