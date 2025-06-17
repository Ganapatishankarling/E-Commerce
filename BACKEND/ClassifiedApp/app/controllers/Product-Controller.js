import Product from "../models/ProductModel.js"
import User from "../models/UsersModel.js"

const productController = {}

productController.list = async(req,res)=>{
    const products = await Product.find()
    res.json(products)
}

productController.create = async(req,res)=>{
    const {name,price,description,image,category,sellerId} = req.body
    const body = req.body
    try{
        const product = new Product({name,price,description,image,category,sellerId})
        product.sellerId=req.userId
        await product.save()
        res.status(201).json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

productController.update = async(req,res)=>{
    const id = req.params.id
    const {name,price,description,image,category,sellerId} = req.body
    try{
        const body={name,price,description,image,category,sellerId}
        const product = await Product.findByIdAndUpdate(id,body,{new:true})
        if(!product){
            res.status(400).json({error:'product not found'})
        }
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

productController.remove = async(req,res)=>{
    const id = req.params.id
    try{
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({error:'product not found'})
        }
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

productController.approve = async(req,res)=>{
    const id = req.params.id
    const {isApproved,rejected} = req.body
    try{
        const product = await Product.findByIdAndUpdate(id,{isApproved,rejected},{new:true})
        if(!product){
            res.status(400).json({error:'product not found'})
        }
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

productController.show = async (req,res)=>{
    const id = req.params.id
    try{
        const product = await Product.find({sellerId:req.userId})
        if(!product){
            res.status(400).json({error:'product not found'})
        }
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

productController.addEnquiry = async(req,res)=>{
    const {messages,buyer,name} = req.body;
    const id=req.params.id;
    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }
        
        const enquiry={buyer:req.userId,messages,name};
        product.enquiries.push(enquiry);
        await product.save()
       return res.json(product)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
};

productController.removeEnquiry = async(req,res)=>{
    const {id,enquiryId} = req.params
    try{
        const product = await Product.findById(id)
        if(!product){
            res.status(400).json({error:'product not found'})
        }
        const enquiry = product.enquiries.filter((ele)=>{
            return ele.id.toString() !== enquiryId
        })
        const updateProduct=await Product.findByIdAndUpdate(id,{enquiries:enquiry},{new:true})
        res.json(updateProduct)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

productController.responseToEnquiry = async(req,res)=>{
    const {enquiryId,response} = req.body;
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }

        const enquiry = product.enquiries.id(enquiryId);
        if(!enquiry){
            return res.status(404).json({error:"enquiry not found"})
        }
        enquiry.response.push(response);
        product.save()
        // console.log(enquiry);
       return res.json(product)

    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
};

productController.showProduct = async(req,res)=>{
    const id = req.params.id
    try{
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({error:'product not found'})
        }
        product.views+=1
        await product.save()
        return res.json(product)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'something went wrong'})
    }
}

productController.addToCart = async(req,res)=>{
    const id=req.params.id
    try{
        const user = await User.findById(req.userId)
        user.cart.push(id)
        user.save()
        res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'something went wrong'})
    }
}

productController.removeCart=async(req,res)=>{
    const id=req.params.id
    try{
        const user=await User.findById(req.userId)
        const index=user.cart.findIndex((ele)=>{
            return ele==id
        })
        user.cart.splice(index,1)
        user.save()
        res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'something went wrong'})
    }
}

productController.interestedBuyer = async(req,res)=>{
    const id = req.params.id
    // const {interestedBuyer} = req.body
    try{
        const product = await Product.findById(id)
       if(!product){
        return res.status(404).json({error:'product not found'})
       }
       const intId=product.interestedBuyers.filter((ele)=>{
        return ele.buyer == req.userId
       })
       if(intId.length==0){
        product.interestedBuyers.push({buyer:req.userId})
        product.save()
        return res.json(product)
       }
    }catch(err){
        console.log(err)
        return res.status(500).json({error:'something went wrong'})
    }
}

productController.removeInterestedBuyer = async(req,res)=>{
    const id = req.params.id
    try{
        const product = await product.findById(id)
        if(!product){
            return res.status(404).json({eror:'product not found'})
        }
        const index = product.interestedBuyers.findIndex((ele)=>{
            return ele.buyer == req.userId
        })
        product.interestedBuyers.splice(index,1)
        await product.save()
        res.json(product)
    }catch(err){
        console.log(err)
        return res.staus(500).json({error:'something went wrong'})
    }
}
export default productController