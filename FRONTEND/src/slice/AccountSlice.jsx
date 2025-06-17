import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from '../config/axios.jsx'

export const fetchUserAccount = createAsyncThunk('users/fetchUserAccount',async(undefined,{rejectWithValue})=>{
    try{
        const response = await axios.get('/account',{headers:{Authorization:localStorage.getItem('token')}})
        return response.data
    }catch(err){
        console.log(err)
        return(rejectWithValue({message:'something went wrong'}))
    }
})

export const deleteAccount=createAsyncThunk('users/deleteUser',async(id)=>{
    try{
        const response = await axios.delete(`/remove/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
        return id
    }catch(err){
        console.log(err)
    }
})

export const addToCart=createAsyncThunk('/products/addToCart',async(id,{})=>{
    try{
        const response=await axios.post(`/cart/${id}`,{},{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
})

export const removeCart=createAsyncThunk('/products/removeCart',async(id,{})=>{
    try{
        const response=await axios.post(`remove-cart/${id}`,{},{
            headers:{Authorization:localStorage.getItem('token')}
        })
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
})

const accountSlice=createSlice({
    name:'account',
    initialState:{
        data:{},
        isLoggedIn:false,
        serverError:null
    },
    extraReducers:(builder)=>{
         builder.addCase(fetchUserAccount.fulfilled,(state,action)=>{
                    state.data=action.payload
                    state.isLoggedIn=true
                });
                builder.addCase(fetchUserAccount.rejected,(state,action)=>{
                    state.serverError=action.payload
                });
       
        builder.addCase(deleteAccount.fulfilled,(state,action)=>{
           state.data={}
           localStorage.removeItem('token')
        })
        builder.addCase(addToCart.fulfilled,(state,action)=>{
            state.data=action.payload
        })
        builder.addCase(removeCart.fulfilled,(state,action)=>{
            state.data=action.payload
        })
    }
})
export default accountSlice.reducer