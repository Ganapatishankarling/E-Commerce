import {validationResult} from 'express-validator';
import User from '../models/UsersModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userController = {};

userController.list = async(req,res)=>{
    const users = await User.find()
   return res.json(users)
};

userController.register= async(req,res)=>{
    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
    }
    const body = req.body
    try{
        const totalUser = await User.countDocuments()
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const  hashPassword = await bcryptjs.hash(body.password,salt)
        user.password = hashPassword
        if(totalUser === 0){
            user.role='admin'
            user.isActive=true
        }
        if(totalUser>0 && user.role==='admin'){
            return res.status(400).json({error:'admin already exists'})
        }
        if(totalUser>0 && !user.role){
            return res.status(400).json({error:'role is required'})
        }
        if(user.role==='buyer'){
            user.isActive=true
        }
        if(!['admin','buyer','seller'].includes(user.role)){
            return res.status(400).json({error:'please choose one role'})
        }
        await user.save()
        return res.json(user)

    }catch(err){
        return res.status(500).json({errors:err.errors})
    }
}

userController.login=async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({error:'invalid email or passsword'})
        }
        const isVerified = bcryptjs.compare(password,user.password)
        if(!isVerified){
            return res.status(404).json({error:'invalid email or password'})
        }
        const tokenData = {userId:user._id,role:user.role}
        const token = jwt.sign(tokenData,'ganapati@123',{expiresIn:'7d'})
        res.json({token})
    }catch(err){
        return res.status(500).json({error:'something went wrong'})
    }
}

userController.account = async (req,res)=>{
        const userId=req.userId;
    
        try{
            const userAccount= await User.findById(userId)
       return res.json(userAccount);
        }catch(error){
            console.log(error)
        }
    }

userController.remove = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:'user not found'})
    }
    const id = req.params.id
    try{
        if(req.role==='admin' ||req.userId === id){
            const user = await User.findByIdAndDelete(id)
            if(!user){
                return res.status(404).json({error:'user not found'})
            }
            return res.json(user)
        }
        return res.status(403).json({error:'you cannot delete this account user is invalid'})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'something went wrong'})
    }
}
userController.activation=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id = req.params.id
    const {isActive} = req.body
    try{
        const user = await User.findByIdAndUpdate(id,{isActive},{new:true})
        if(!user){
            return res.status(404).json({error:'user not found'})
        }
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'something went wrong'})
    }
}

userController.update = async(req,res)=>{
    const id = req.params.id
    const {name,email,password} = req.body
    try{
        if(id==req.userId){
            const salt = await bcryptjs.genSalt()
            const hashPassword = await bcryptjs.hash(password,salt)
            const user = await User.findByIdAndUpdate(id,{name,email,password:hashPassword},{new:true})
            if(!user){
                return res.status(404).json({error:'user not found'})
            }
            return res.json(user)
        }
        return res.json({error:'you cannot update this account'})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'something went wrong'})
    }
}
export default userController