import {useDispatch,useSelector} from 'react-redux'
import {useParams} from "react-router-dom"
import {useEffect,useState} from "react"
import {viewProduct,sendEnquiry} from "../slice/ProductSlice"
import {fetchUserAccount,addToCart} from "../slice/AccountSlice"
import {listCategories} from '../slice/CategorySlice'
export default function ProductDetails(){
    const [message,setMessage] = useState('')
    const dispatch=useDispatch()
    const {id}=useParams()
    useEffect(()=>{
        dispatch(viewProduct(id))
        if(localStorage.getItem('token')){
            dispatch(fetchUserAccount())
        }
        dispatch(listCategories())
    },[dispatch])

    const {productDetail} = useSelector((state)=>{
        return state.products
    });

    console.log(productDetail)

    const {data} = useSelector((state)=>{
        return state.account
    })

    const categories = useSelector((state)=>{
        return state.categories
    })

    const category=categories.data.find((ele)=>{
        return ele._id==productDetail.category
    })
    console.log(category)
    let enquiries;

    // if(productDetail && productDetail.enquires && data?._id){
    //     enquiries = productDetail.enquires.filter(ele => ele.buyer === data._id)
    // }

    if (productDetail && productDetail.enquiries) {
        enquiries = productDetail.enquiries.map(ele => ele);
    }


    console.log(enquiries)
    const handleSendEnquiry=(e)=>{
        e.preventDefault()

        if(message.trim().length>0){
            if(localStorage.getItem('token')){
                const formData={
                    name:data.name,
                    messages:message,
                }
                const id=productDetail._id

                dispatch(sendEnquiry({id,formData}))
                setMessage('')
            }else{
                alert('login to send Message')
            }
        }
    }
    const handleAddCart=(id)=>{
        if(!data.cart.includes(id)){
            dispatch(addToCart(id));
            // console.log(id)
            // alert(id)
        }else{
            alert('already added in cart')
        }
    }
    return(
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="md:col-span-2">
                            <div className="grid grid-cols-4 gap-2">
                                <div className="md:col-span-2">
                                    <img src={productDetail.image} className="h-96 w-full object-cover rounded"/>
                                </div>
                                <div className="md:col-span-2">
                                    <img src={productDetail.image} className="h-96 w-full object-cover rounded"/>
                                </div>
                                <div className="md:col-span-2">
                                    <img src={productDetail.image} className="h-96 w-full object-cover rounded"/>
                                </div>
                                <div className="md:col-span-2">
                                    <img src={productDetail.image} className="h-96 w-full object-cover rounded"/>
                                </div>
                            </div>
                            <div className="border rounded overflow-hidden mb-6">
                                <img src={productDetail.image} className="w-full h-80 object-cover"/>
                            </div>
                            <div className="bg-white shadow p-4 rounded-lg space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        <div>
                                            {enquiries && enquiries.length > 0 ? (
                                                enquiries.map((ele)=>{
                                                    <div className="mb-4 border-b pb-4">
                                                        <div className="flex items-center gap-2 text-sm font-medium">
                                                            {/* <CircleUser/> */}
                                                            <span>{ele.name}</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600">{ele.messages}</p>
                                                        </div>
                                                        <div className="text-gray-500 text-sm mt-1">
                                                            {ele.response.map((ele)=>{
                                                                return(
                                                                    <p className="text-gray-600">{ele}</p>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>                                                 
                                                })
                                            ):(
                                                <div>
                                                    <p className="text-gray-500">No enquires from you yet</p>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 border-t pt-4">
                                                <div>
                                                    <p className="text-xl font-bold cursor-pointer">+</p>
                                                    <form onSubmit={handleSendEnquiry} className="flex-grow">
                                                        <input 
                                                        type="text" 
                                                        placeholder="Type a message" 
                                                        value={message}
                                                        onChange={(e)=>{
                                                            setMessage(e.target.value)
                                                        }} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"/>
                                                    </form>
                                                </div>
                                                <p onClick={handleSendEnquiry} className="text-blue-600 font-medium cursor-pointer hover:underline">Send</p>
                                            </div>
                                        </div>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800">{productDetail.name}</h2>
                            <p className="text-gray-500">{productDetail.views}</p>
                            <p className="text-gray-600">{category?.name}</p>
                            <p className="text-gray-600"><span className="text-gray-800 font-semibold">Rs.{productDetail.price}</span></p>
                            <div className="flex gap-4">
                                <button onClick={()=>{
                                    handleAddCart(productDetail._id)
                                }} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Add to Cart</button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Buy Now</button>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-600">Product Details</p>
                                <div className="text-gray-700">
                                    <p>{productDetail.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}