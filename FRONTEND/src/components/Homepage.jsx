import {useSelector,useDispatch} from "react-redux"
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {listProducts} from "../slice/ProductSlice.jsx"
import {addToCart} from '../slice/AccountSlice.jsx'
export default function HomePage(){
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch]);

    const {data} = useSelector((state)=>{
        return state.products
    })

    const products = data.filter((ele)=>{
        return ele.isApproved==true && ele.rejected==false
    })

    const handleViewProduct=(id)=>{
        navigate(`/product-detail/${id}`)
    }

    const account=useSelector((state)=>{
        return state.account
    })
    console.log(account.data.cart)
    const handleAddCart=(id)=>{
        if(!account.data.cart.includes(id)){
            dispatch(addToCart(id))
        }else{
            alert('already added in cart')
        }
    }
    return(
        <div className="bg-gray-100 h-screen">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((ele)=>{
                        return(
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <div className="mb-4">
                                    <img onClick={()=>{
                                        handleViewProduct(ele._id)
                                    }}/>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600" onClick={()=>{
                                        handleViewProduct(ele._id)
                                    }}>{ele.name.slice(0,20)+"..."}</h2>
                                    <p className="text-gray-600 mt-1 cursor-pointer" onClick={()=>{
                                        handleViewProduct(ele._id)
                                    }}>Rs.{ele.price}</p>
                                    <div className="flex justify-between mt-4">
                                        <button onClick={()=>{
                                            handleAddCart(ele._id)
                                        }} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">Add to cart</button>
                                        <button onClick={()=>{
                                            handleViewProduct(ele._id)
                                        }} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">View Details</button>
                                        </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}