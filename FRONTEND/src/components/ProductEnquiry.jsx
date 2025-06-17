import {useParams,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect,useState} from 'react'
import {sendResponse,assignEditId,deleteProduct,fetchMyProducts} from '../slice/ProductSlice'
export default function ProductEnquiry(){
    const {id}=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [message,setMessage] = useState('')
    const {data}=useSelector((state)=>state.products)
    console.log(data)

    useEffect(()=>{
        dispatch(fetchMyProducts());
    },[dispatch]);

    const product=data.find((ele)=>{
        return ele._id==id
    })

    const categories=useSelector((state)=>{
        return state.categories
    })

    const category=categories.data.find((ele)=>{
        return ele._id==product.category
    })
    console.log(product)

    const handleSendResponse=(enquiryId)=>{
        const replyMessage=message[enquiryId]?.trim()
        if(!replyMessage) return
        const formData={
            response:replyMessage,
            enquiryId:enquiryId
        }
        // console.log(`replying to ${enquiryId} with message:${replyMessage}`)
        dispatch(sendResponse({formData,id}))

        setMessage(prey => ({...prey,[enquiryId]:''}))
    }
    const handleDelete=(id)=>{
        dispatch(deleteProduct(id));
        navigate('/my-product')
    }
    return(
        <div className="p-6 max-w-7xl mx-auto">
            {product&&(
        <div className="space-y-8">
        <div>
          <div className="text-center">
          <h2 className="text-2xl font-bold">Product Enquiry and Detals</h2>
          </div>
           
        </div> 
       
       
    <div className="grid md:grid-cols-2 gap-8">
  <div>
  <div className="space-y-4">
   <div className="text-sm text-gray-500"><p>{category.name}</p></div>
     <div className="border rounded overflow-hidden">
     <img
       src={product.image}
       alt="product"
     className="w-full h-64 object-cover"/>
     </div>
   </div>
  </div>
   
   <div className="space-y-2">
     <h2 className="text-xl font-semibold">{product.name}</h2>
     {/* <p>Views</p> */}
     <p className="text-gray-600">Views: {product.views}</p>

     
     <h1 className="text-2xl font-bold text-green-600">Rs.{product.price}/-</h1>
     <p className="text-gray-700 font-medium">Product Detail</p>
     <p className="text-gray-600">{product.description}</p>

     <div className="flex gap-4 mt-4">
      <button onClick={()=>{
        dispatch(assignEditId(id));
        navigate(`/add-product/${id}`);
      }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit Product</button>
      <button onClick={()=>{handleDelete(id)}} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete Product</button>
     </div>

     <div>
     <div>



     <div>
        <img src={product.image} alt="" className="rounded border object-cover h-20"/>
     
        <img src={product.image} alt="" className="rounded border object-cover h-20"/>
     
        <img src={product.image} alt="" className="rounded border object-cover h-20"/>
     
        <img src={product.image} alt="" className="rounded border object-cover h-20"/>
     </div> 

     </div>
     </div>
 
     
   </div>
 
   
 </div>

     <div className="space-y-6">
      <div>
      <h2 className="text-lg font-semibold"> Product Enquiries :-</h2>
      <div className="space-y-4 mt-4">
         {product.enquiries.map((ele)=>{
             return <div key={ele._id} className="p-4 border rounded-lg bg-white shadow">
                 <div>
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    
                       <span>{ele.name}</span>
                   </div>
                 <p className="text-gray-600">{ele.messages}</p>
                 <div className="text-sm mt-2 space-y-1 text-gray-500">
                 {ele.response.map((ele)=>{
                  return(
                    <div>
                      <p>{ele}</p>
                    </div>
                  )
                 })}
                 </div>

                 <div>
                  <div>
                        <div>

                        <form onSubmit={(e)=>{
                          e.preventDefault()
                          handleSendResponse(ele._id);
                          }} className="mt-4 flex items-center gap-2">
                            <input type="text" placeholder="Reply. . ."  value={message[ele._id] || ''}
                                 onChange={(e) => {
                                 setMessage({ ...message, [ele._id]: e.target.value });
                             }} className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </form>
                        </div>
                        <p onClick={()=>{handleSendResponse(ele._id)}} className="text-blue-600 font-medium cursor-pointer hover:underline"></p>
                      </div>
                 </div>

                </div>
             </div>
         })}
     </div>
     </div>
     </div>
  </div>
       )}
    </div>
   ) 
}
