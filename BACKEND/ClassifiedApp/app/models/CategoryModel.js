import mongoose from 'mongoose'
import {Schema,model} from 'mongoose'
const CategorySchema = new Schema({
    name:String,
},{timestamps:true})
const Category = model('Category',CategorySchema)
export default Category