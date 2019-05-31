const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
    pic:String,
    name:{
        type:String,
        required:true    },
    description:String,
    price:Number,
    createAt:{
        type:Date ,default:Date.now()
    }

})
const product=mongoose.model('product',productSchema);
module.exports={product};