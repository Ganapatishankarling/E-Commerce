import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {listProducts} from '../slice/ProductSlice'
// import { Check } from 'lucide-react'
import {approveProduct,rejectProduct} from '../slice/ProductSlice'
import {listCategories} from '../slice/CategorySlice'
import {listUsers} from '../slice/userSlice'
export default function Product(){
    const [product,setProduct] = useState([])
    const dispatch = useDispatch()
    // console.log(product)

    const users=useSelector((state)=>{
        return state.users
    })
    console.log(users.users)

    const {data}=useSelector((state)=>{
        return state.products
    })

    const categories=useSelector((state)=>{
        return state.categories
    });

    console.log(categories)

    useEffect(()=>{
        dispatch(listProducts())
        dispatch(listCategories())
        dispatch(listUsers())
    },[])

    const products = data.map(product =>{
        const category = categories.data.find(cat => cat._id === product.category)
        const user = users.users.find((user)=>{
            return user._id===product.sellerId
        })
        return{
            ...product,category:category ? category.name  : 'Unknown',seller:user ? user.name : 'Unknown',
        };
    })
    // console.log(products)

    const approvedProducts=products.filter((ele)=>{
        return ele.isApproved==true
    })

    const requestedProduct=products.filter((ele)=>{
        return ele.isApproved==false && ele.rejected==false
    })

    const rejectedProduct = products.filter((ele)=>{
        return ele.rejected==true
    })

    const handleApprove=(id)=>{
        dispatch(approveProduct(id))
    }

    const handleReject=(id)=>{
        dispatch(rejectProduct(id))
    }
    return(
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex flex-wrap gap-4 mb-6">
                <button onClick={()=>{
                    setProduct('approved')
                }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">ApprovedProducts</button>
                <button onClick={()=>{
                    setProduct('requested')
                }} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">RequestedProducts</button>
                <button onClick={()=>{
                    setProduct('rejected')
                }} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">RejectedProducts</button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="overflow-x-auto">
                    {product=='approved' && (
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="w-full table-auto text-sm">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="p-3">image</th>
                                        <th className="p-3">ProductName</th>
                                        <th className="p-3">ProductPrice</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">seller</th>
                                        <th className="p-3">ProductApprove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {approvedProducts.map((ele)=>{
                                        return(
                                            <tr key={ele._id} className="border-t hover:bg-gray-50">
                                                <td className="p-3"><div><img src={ele.image} className="h-12 w-12 object-cover rounded"/></div></td>
                                                <td className="p-3">{ele.name}</td>
                                                <td className="p-3">{ele.price}</td>
                                                <td className="p-3">{ele.category}</td>
                                                <td className="p-3 text-green-600 font-semibold">{ele.seller}</td>
                                                <td>
                                                    <div>
                                                        {ele.isApproved ? 'Approved':''}
                                                    </div>
                                                    </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {product=='requested' && (
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="w-full table-auto text-sm">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="p-3">image</th>
                                        <th className="p-3">ProductName</th>
                                        <th className="p-3">ProductPrice</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">seller</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {requestedProduct.map((ele)=>{
                                    return(
                                        <tr key={ele._id} className="border-t hover:bg-gray-50">
                                            <td className="border-t hover:bg-gray-50"><div> <img src={ele.image}/></div></td>
                                            <td className="p-3">{ele.name}</td>
                                            <td className="p-3">{ele.price}</td>
                                            <td className="p-3">{ele.category}</td>
                                            <td className="p-3">{ele.seller}</td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                <button onClick={()=>{
                                                    handleApprove(ele._id)
                                                }} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Accept</button>
                                                <button onClick={()=>{
                                                    handleReject(ele._id)
                                                }} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Reject</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {product=='rejected' && (
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="w-full table-auto text-sm">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="p-3">image</th>
                                        <th className="p-3">ProductName</th>
                                        <th className="p-3">ProductPrice</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">seller</th>
                                        <th className="p-3">ProductApprove</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rejectedProduct.map((ele)=>{
                                        return(
                                            <tr key={ele._id} className="border-t hover:bg-gray-50">
                                                <td className="p-3"><div> <img src={ele.image}/></div></td>
                                                <td className="h-12 w-12 object-cover rounded">{ele.name}</td>
                                                <td className="h-12 w-12 object-cover rounded">{ele.price}</td>
                                                <td className="h-12 w-12 object-cover rounded">{ele.category}</td>
                                                <td className="h-12 w-12 object-cover rounded">{ele.seller}</td>
                                                <td className="p-3 text-red-600 font-semibold">
                                                    <div>
                                                        {ele.rejected ? "Rejected":""}
                                                    </div>
                                                </td>
                                                <td className="p-3">
                                                    <button onClick={()=>{
                                                        handleApprove(ele._id)
                                                    }} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Approve</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}