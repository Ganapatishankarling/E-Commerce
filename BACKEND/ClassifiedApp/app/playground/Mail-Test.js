import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure:true,
    auth:{
        user: 'ganapati123@gmail.com',
        pass:''
    }
})