import jwt from 'jsonwebtoken'
export async function authenticateUser(req,res,next){
    let token = req.headers['authorization']
    if(!token){
        return res.status(401).json({error:'unauthorized access'})
    }
    try{
        // token = token.split(' ')[1]
        const tokenData = jwt.verify(token,'ganapati@123')
        req.userId = tokenData.userId
        req.role = tokenData.role
        console.log(tokenData.role)
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({error:'unauthorized access'})
    }
}