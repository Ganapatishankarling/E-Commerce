import express from 'express';
import {checkSchema} from 'express-validator';
import configureDB from './config/DB.js';
import cors from 'cors';

const app = express();
const port = 3035;
app.use(cors());
app.use(express.json());
configureDB();

// accounts
import userController from './app/controllers/User-Controller.js';
import { userRegisterValidationSchema,userLoginValidationSchema } from './app/validators/User-Validation-Schema.js';
import { authenticateUser } from './app/middlewares/User-Authentication.js';
import { userAuthorize } from './app/middlewares/User-Authorization.js';
import { idValidationSchema } from './app/validators/Id-Validation-Schema.js';

//for Cactegory
import categoryController from './app/controllers/Category-Controller.js';
import {categoryValidationSchema} from './app/validators/Category-Validation-Schema.js';

import productController from './app/controllers/Product-Controller.js';
//for account
app.post('/register',checkSchema(userRegisterValidationSchema),userController.register);
app.post('/login',checkSchema(userLoginValidationSchema),userController.login);
app.get('/account', authenticateUser,userAuthorize(['admin','buyer','seller']),userController.account);
app.delete('/remove/:id',authenticateUser,checkSchema(idValidationSchema),userController.remove)
app.put('/activation/:id',authenticateUser,userAuthorize(['admin']),checkSchema(idValidationSchema),userController.activation);
app.put('/update-account/:id',authenticateUser,checkSchema(idValidationSchema),userController.update)
app.get('/users',authenticateUser,userAuthorize(['admin']),userController.list);


//for category
app.get('/category',categoryController.list)
app.post('/category',authenticateUser,userAuthorize(['admin']),checkSchema(categoryValidationSchema),categoryController.create);
app.get('/category/:id',authenticateUser,userAuthorize(['admin']),checkSchema(idValidationSchema),categoryController.show)
app.delete('/categories/:id',authenticateUser,userAuthorize(['admin']),checkSchema(idValidationSchema),categoryController.remove);
app.put('/category/:id',authenticateUser,userAuthorize(['admin']),checkSchema(idValidationSchema),categoryController.update);

//for Products
app.get('/product',productController.list);
app.post('/product',authenticateUser,userAuthorize(['seller']),productController.create);
app.put('/product/:id',authenticateUser,userAuthorize(['seller']),checkSchema(idValidationSchema),productController.update);
app.delete('/product/:id',authenticateUser,userAuthorize(['seller']),checkSchema(idValidationSchema),productController.remove);
app.put('/productapprove/:id',authenticateUser,userAuthorize(['admin']),checkSchema(idValidationSchema),productController.approve);
app.get('/productmy',authenticateUser,productController.show);
app.post('/enquiry/:id',authenticateUser,userAuthorize(['buyer']),checkSchema(idValidationSchema),productController.addEnquiry);
app.put('/remove-enquiry/:id/:enid',authenticateUser,userAuthorize(['buyer']),checkSchema(idValidationSchema),productController.removeEnquiry)
app.post('/response/:id',authenticateUser,userAuthorize(['seller']),checkSchema(idValidationSchema),productController.responseToEnquiry)

//for product view and increase views
app.get('/product/:id',productController.showProduct);

//interested Buyer 
app.post('/interested-buyer/:id',authenticateUser,userAuthorize(['buyer']),productController.interestedBuyer);
app.delete('/remove-interested-buyer/:id',authenticateUser,userAuthorize(['buyer']),productController.removeInterestedBuyer);

// for Cart

app.post('/cart/:id',authenticateUser,userAuthorize(['buyer']),productController.addToCart)
app.post('/remove-cart/:id',authenticateUser,userAuthorize(['buyer']),productController.removeCart)



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});