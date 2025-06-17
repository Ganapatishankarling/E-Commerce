import {useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import {listCategories,deleteCategory} from "../slice/CategorySlice.jsx"
import {useNavigate,Link} from "react-router-dom"
import {assignEditId} from "../slice/CategorySlice.jsx"
export default function Category(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {data,serverError,editId} = useSelector((state)=>{
        return state.categories
    })
    useEffect(()=>{
        dispatch(listCategories())
    },[dispatch])

    const handleDelete = (id)=>{
        dispatch(deleteCategory(id))
    }
    return(
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-xl p-6">
                <tabel className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-4 py-3 font-medium text-gray-700">Category Name</th>
                            <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ele)=>{
                            return (
                                <tr key={ele.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{ele.name}</td>
                                    <td className="px-4 py-2"><button onClick={()=>{
                                        navigate(`/add-category/${ele._id}`)
                                    }} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Edit</button><button onClick={()=>{handleDelete(ele._id)}} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </tabel>
                <div>
                    <button onClick={()=>{navigate('/add-category')}} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">AddCategory</button>
                </div>
            </div>
        </div>
    )
}