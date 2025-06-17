import {fetchUserAccount,removeCart} from '../slice/AccountSlice'
import {listProducts} from '../slice/ProductSlice'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Cart(){
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        dispatch(fetchUserAccount())
        dispatch(listProducts())
    },[])
    
    const {data}=useSelector((state)=>{
        return state.account
    })

    console.log(data)
    const products = useSelector((state)=>{
        return state.products;
    })

    // ;

    const cart = [...(data.cart || [])] // this avoids carshing if data.cart is undefined
    .reverse()
    .filter(id => id && products.data?.some(p=>p._id === id))
    .map(id => products.data?.find(product => product._id === id))

    console.log(cart)
    const totalBill = cart.reduce((acc,cv)=>{
        return acc+cv.price
    },0)

    const handleViewProduct=(id)=>{
        navigate(`/product-detail/${id}`)
    }

    const handleRemoveCart=(id)=>{
        dispatch(removeCart(id))
    }

    return(
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="border rounded p-4 bg-gray-50">
                            <p className="text-sm text-gray-500">Products</p>
                            <p className="text-xl font-semibold">{cart.length}</p>
                        </div>
                        <div className="border rounded p-4 bg-gray-50">
                            <p className="text-sm text-gray-500">Bill</p>
                            <p className="text-xl font-semibold">{totalBill}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">Buy Now</button>
                        </div>
                    </div>
                </div>
                {cart.map((product)=>{
                    return(
                        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
                            <div>
                                <div className="w-20 h-20 flex-shrink-0">
                                    <img src={product.image} alt="product" className="w-full h-full object-cover rounded-md"/>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-gray-800 font-medium">{product.name.slice(0,34)+'...'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Rs.{product.price}</p>
                                </div>
                                <div>
                                    <button onClick={()=>{
                                        handleRemoveCart(product._id)
                                    }} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}