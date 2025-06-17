import Product from "../models/ProductModel.js"
import Category from "../models/CategoryModel.js"
export const productValidationSchema = {
    name:{
        in:['body'],
        exists:{
            errorMessage:'name field is required'
        },
        notEmpty:{
            errorMessage:'name cannot be empty'
        },
        trim:true,
    },
    price:{
        in:['body'],
        exists:{
            errorMessage:'price field is required'
        },
        notEmpty:{
            errorMessage:'price cannot be empty'
        },
        isFloat:{
            errorMessage:'price should be a number'
        },
        trim:true,
    },
    description:{
        in:['body'],
        exists:{
            errorMessage:'description field is required'
        },
        notEmpty:{
            errorMessage:'description cannot be empty'
        },
        trim:true,
    },
    category:{
        in:['body'],
        exists:{
            errorMessage:"category field is required"
        },
        notEmpty:{
            errorMessage:'category cannot be empty'
        },
        trim:true,
    },
    image:{
        in:['body'],
        exists:{
            errorMessage:'image field is required'
        },
        notEmpty:{
            errorMessage:'image cannot be empty'
        },
        trim:true,
    },
    sellerId:{
        in:['body'],
        exists:{
            errorMessage:'sellerId field is required'
        },
        notEmpty:{
            errorMessage:'sellerId cannot be empty'
        },
        trim:true,
    },
    isApproved:{
        in:['body'],
        exists:{
            errorMessage:'isApproved field is required'
        },
        notEmpty:{
            errorMessage:'isApproved cannot be empty'
        },
        trim:true,
        isBoolean:{
            errorMessage:'isApproved should be a boolean value'
        },
        custom:{            
            options:async function(value){
                try{
                    const product = await Product.findOne({sellerId:value})
                    if(product){
                        throw new Error('product already exists')                   
                    }
                }catch(err){
                    throw new Error(err.message)
                }
                return true
            }
        }
    }
}
