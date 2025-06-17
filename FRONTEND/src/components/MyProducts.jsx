import {useSelector,useDispatch} from "react-redux"
import {useEffect,useState} from "react"
import {useNavigate,Link} from "react-router-dom"
import {fetchMyProducts,assignEditId,deleteProduct} from "../slice/ProductSlice"
import {listCategories} from '../slice/CategorySlice'
export default function MyProducts() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [image,setImage] = useState('image')
    console.log(image)
    const [title,setTitle] = useState('title')
    const [price,setPrice] = useState('price')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [views,setViews] = useState('views')
    const [status,setStatus] = useState('status')
    const [enquiry,setEnquiry] = useState('enquiry')
    const [action,setAction] = useState('action')

    const {data} = useSelector((state)=> state.products)
    console.log(data)

    const categories = useSelector((state)=>{
        return state.categories
    })

    useEffect(()=>{
        dispatch(fetchMyProducts())
        dispatch(listCategories())
    },[dispatch])

    const handleDelete=(id)=>{
        dispatch(deleteProduct(id))
    }

    const products = data.map(product =>{
        const category = categories.data.find(cat => cat._id === product.category)
        return {
            ...product,category:category ? category.name  : 'Unknown'
        }
    })

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <label htmlFor="image">Image</label>
                    <input id="image" type="checkbox" className="cursor-pointer accent-blue-600" checked={image=="image"} onChange={()=>{
                        setImage(image=='image'?'':'image')
                    }}/>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="Title">Title</label>
                    <input id="Title" type="checkbox" className="cursor-pointer accent-blue-600" checked={title=='title'} onChange={()=>{
                        setTitle(title==='title'?'':'title')
                    }}/>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="Description">Description</label>
                    <input id="Description" type="checkbox" className="cursor-pointer accent-blue-600" checked={description=="description"} onChange={()=>{
                        setDescription(description=='description'?'':'description')
                    }}/>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="Category">Category</label>
                    <input id="Category" type="checkbox" className="cursor-pointer accent-blue-600" checked={category=="category"} onChange={()=>{
                        setCategory(category=='category'?'':'category')
                    }}/>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="Price">Price</label>
                    <input id="Price" type="checkbox" className="cursor-pointer accent-blue-600" checked={price=="price"} onChange={()=>{
                        setPrice(price=='price'?'':'price')
                    }}/>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="Views">Views</label>
                    <input id="Views" type="checkbox" className="cursor-pointer accent-blue-600" checked={views=="views"} onChange={()=>{
                        setViews(price=='views'?'':'views')
                    }}/>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="Status">Status</label>
                    <input id="Status" type="checkbox" className="cursor-pointer accent-blue-600" checked={status=="status"} onChange={()=>{
                        setStatus(status=='status'?'':'status')
                    }}/>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="Enquiry">Enquiry</label>
                    <input id="Enquiry" type="checkbox" className="cursor-pointer accent-blue-600" checked={enquiry=="enquiry"} onChange={()=>{
                        setEnquiry(enquiry=='enquiry'?'':'enquiry')
                    }}/>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="Action">Action</label>
                    <input id="Action" type="checkbox" className="cursor-pointer accent-blue-600" checked={action=="action"} onChange={()=>{
                        setAction(action=='action'?'':'action')
                    }}/>
                </div>
            </div> */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h className="text-2xl font-semibold text-gray-800 mb-4">My Products</h>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table>
                        <thead>
                            <tr>
                                
                                    <th className="p-3">Image</th>
                               
                                   
                                    <th className="p-3">Product Namee</th>
                                
                                   
                                    <th className="p-3">Product Price</th>
                                
                                   
                                    <th className="p-3">Description</th>
                                
                                   
                                    <th className="p-3">Category</th>
                                
                                   
                                    <th className="p-3">Total Views</th>
                               
                                   
                                    <th className="p-3">Products Status</th>
                                
                                   
                                    <th className="p-3">Enquiry</th>
                                
                                   
                                    <th className="p-3">Actions</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((ele)=>{
                              return  <tr key={ele._id} className="border-t hover:bg-gray-50">
                                    
                                        <td className="p-3">
                                            <div>
                                                <img src={ele.image} alt="" className="h-12 w-12 object-cover rounded"/>
                                            </div>
                                        </td>
                                    
                                    
                                        <td className="p-3">{ele.name}</td>
                                    
                                    
                                        <td className="p-3"><span className="text-gray-600">Rs.</span>{ele.price}/-</td>
                                    
                                    
                                        <td className="p-3">{ele.description}</td>
                                    
                                    
                                        <td className="p-3">{ele.category}</td>
                                    
                                    
                                        <td className="p-3">{ele.views}</td>
                                    
                                    
                                        <td className="p-3">{ele.isApproved ? 'Approved' : 'Not Approved'}</td>
                                    
                                    
                                        <td className="p-3"><Link to={`/product-enquiry/${ele._id}`}><button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">View Enquiry</button></Link></td>
                                    
                                    
                                        <td className="p-3">
                                            <div>
                                                <button onClick={()=>{
                                                    dispatch(assignEditId(ele._id))
                                                    navigate(`/add-product/${ele._id}`)
                                                }} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Edit</button>
                                                <button onClick={()=>{
                                                    {handleDelete(ele._id)}
                                                }} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
                                            </div>
                                            </td>
                                    
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={()=>{
                        navigate('/add-product')
                    }} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Add Product</button>
                </div>
            </div>
        </div>
    )
}