import mongoose from 'mongoose'
import {Schema,model} from 'mongoose'
const UserSchema = new Schema({
    name:String,
    email:String,
    password:String,
    cart:[],
    role:{type:String,enum:['admin','seller','buyer']},
    isActive:{type:Boolean,default:false}
},{timestamps:true})
const User = model('User',UserSchema)
export default User