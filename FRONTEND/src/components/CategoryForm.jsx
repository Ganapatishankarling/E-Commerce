import {useState,useEffect} from "react" //importing useState from react
import {createCategory,listCategories,updateCategory} from "../slice/CategorySlice.jsx" //importing slice file and its functions
import {useDispatch,useSelector} from "react-redux"
import {useNavigate,useParams} from "react-router-dom"
export default function CategoryForm(){
    const [ name,setName] = useState('')
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const {id} = useParams()

        useEffect(()=>{
            dispatch(listCategories())
        },[])

        const {data,serverError,editId}=useSelector((state)=>{
            return state.categories
        })

        useEffect(()=>{
            if(id && data.length>0){
                const category = data.find((ele)=>{
                    return ele._id == id
                })
                console.log(category)
                if(category){
                    setName(category.name)
                }
            }
        },[id,data])

        const handleSubmit = async (e)=>{
            e.preventDefault()
            if(id){
                const category=data.find((ele)=>{
                    return ele._id==id
                })
                const formData={...category,name:name}
                const result = await dispatch(updateCategory({id,formData}))
                if(updateCategory.fulfilled.match(result)){
                    await dispatch(listCategories())
                    navigate('/category')
                }else{
                    console.error('failed to create category')
                }
            }else{
                const formData = {name}
            const result = await dispatch(createCategory(formData))
            if(createCategory.fulfilled.match(result)){
                await dispatch(listCategories())
                navigate('/category')
            }else{
                console.error('failed to create category')
            }
            }
            
        }
    return (
        <div className="max-w-xl mx-auto mt-10 px-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Category</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Enter Category Name" value={name} onChange={(e)=>{setName(e.target.value)}} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <div>
                            <input type="submit" value='Add Category' className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"/>
                            </div>                    
                        </form>
                </div>
            </div>
        </div>
    )
}