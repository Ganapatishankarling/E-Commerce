import mongoose from 'mongoose'
import {Schema,model} from 'mongoose'
const ProductSchema = new Schema({
    name:String,
    price:Number,
    description:String,
    image:String,
    category:Schema.Types.ObjectId,
    sellerId:{
        type:Schema.Types.ObjectId,
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    enquiries:[{
        buyer:Schema.Types.ObjectId,
        messages:String,
        response:[],
        name:String
    }],
    views:{
        type:Number,
        default:0
    },
    rejected:{
        type:Boolean,
        default:false
    },
    interestedBuyers:[]
},{timestamps:true});
const Product = model('Product',ProductSchema)
export default Product