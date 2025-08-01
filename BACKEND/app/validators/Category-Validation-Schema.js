import Category from "../models/CategoryModel.js"
export const categoryValidationSchema = {
    name:{
        in:['body'],
        exists:{
            errorMessage:'name field is required'
        },
        notEmpty:{
            errorMessage:'name cannot be empty'
        },
        trim:true,
        custom:{
            options:async function(value){
                try{
                    const category = await Category.findOne({name:value})
                    if(category){
                        throw new Error('category already exists')
                    }
                }catch(err){
                    throw new Error(err.message)
                }
                return true
            }
        }
    }
}