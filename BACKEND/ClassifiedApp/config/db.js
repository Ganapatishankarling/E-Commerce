import mongoose from 'mongoose'
const configureDB = async ()=>{
    const url = 'mongodb://localhost:27017/classified-app-apr2025'
    try{
        await mongoose.connect(url)
        console.log('db is connected')
    }catch(err){
        console.log(err)
    }
}
export default configureDB