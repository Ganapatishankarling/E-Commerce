import User from "../models/UsersModel.js";
export const userRegisterValidationSchema = {
    name:{
        in:['body'],
        exists:{
            errorMessage:'name field is required'
        },
        notEmpty:{
            errorMessage:'name field should not be empty'
        },
        trim:true
    },
    email:{
        in:['body'],
        exists:{
            errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:"email field should not be empty"
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options:async function(value){
                try{
                    const user = await User.findOne({email:value})
                    if(user){
                        throw new Error('email already exists')
                    }
                }catch(err){
                    throw err
                }
                return true
            }
        }
    },
    password:{
        in:['body'],
        exists:{
            errorMessage:'password field is required'
        },
        notEmpty:{
            errorMessage:'password field should not be empty'
        },
        trim:true,
        isStrongPassword:{
            options:{
                minLength:8,
                minUpperCase:1,
                minLowerCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:'password should be 8 character long and must contain atleast, one uppercase, one lowercase,one number and one symbol'            
        }
    }
}
export const userLoginValidationSchema={
    email:{
        in:['body'],
        exists:{
            errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:'email field should not be empty'
        },
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:'please provide valid email'
        }
    },
    password:{
        in:['body'],
        exists:{
            errorMessage:'password field is required'
        },
        notEmpty:{
            errorMessage:'password field should not be empty'
        },
        trim:true,
        isStrongPassword:{
            options:{
                minLength:8,
                minUpperCase:1,
                minLowerCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:'password should be 8 character long and must contain atleast, one uppercase, one lowercase,one number and one symbol'
        }        
    }    
}
