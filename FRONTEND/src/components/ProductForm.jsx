import {useState,useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {listCategories} from '../slice/CategorySlice';
import {fetchUserAccount} from "../slice/AccountSlice"
import {createProduct,updateProduct,fetchMyProducts} from '../slice/ProductSlice';
export default function ProductForm(){
    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)
    const [description,setDescription] = useState('');
    const [image,setImage] = useState('');
    const [category,setCategory] = useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id} = useParams()

    useEffect(()=>{
        dispatch(listCategories());;
    },[]);

    useEffect(()=>{
        dispatch(fetchMyProducts())
    },[])

    useEffect(()=>{
        dispatch(fetchUserAccount())
    },[])

    const {data}=useSelector((state)=>{
        return state.categories;
    });

    const user=useSelector((state)=>{
        return state.account;
    });

    const listProducts=useSelector((state)=>{
        return state.products
    })

    useEffect(()=>{
        if(id && listProducts.data.length>0){
            const product = listProducts.data.find((ele)=>ele._id===id)
            console.log(product)
            if(product){
                setName(product.name)
                setCategory(product.category)
                setPrice(product.price)
                setDescription(product.description)
                setImage(product.image)

            }
        }
    },[id,listProducts.data])

    console.log(user.user)

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(id){
            const product = listProducts.data.find((ele)=>ele._id===id)
            const formData={...product,name,price,image,description,category}
            const result = await dispatch(updateProduct({id,formData}))

            if(updateProduct.fulfilled.match(result)){
                await dispatch(fetchMyProducts())
                navigate('/my-product')
            }else{
                console.error('failed to create catrgoty')
            }
        }else{
            
        const formData={
            name,
            price,
            image,
            description,
            category,
            seller:user.data._id
        };
        const result = await dispatch(createProduct(formData));

            if (createProduct.fulfilled.match(result)) {
                await dispatch(fetchMyProducts());
                navigate('/my-product');           
            } else {
                console.error("Failed to create category");
            }
        }
    }


    return(
        
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="mb-4"><h2 className="text-2xl font-bold text-gray-800">Create New Product</h2></div>
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Product Form Component</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text"
                        palceholder="Enter Product Name"
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        <input 
                        type="number"
                        placeholder="Enter Product Price"
                        value={price}
                        onChange={(e)=>{
                            setPrice(e.target.value)
                        }} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        <input 
                        type="text"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e)=>{
                            setDescription(e.target.value)
                        }} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        <input
                        type="text"
                        placeholder="Enter product image"
                        value={image}
                        onChange={(e)=>{
                            setImage(e.target.value)
                        }} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        <select onChange={(e)=>{
                            setCategory(e.target.value)
                        }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-200">
                            <option>Select Category</option>
                            {data.map((ele)=>{
                                return <option key={ele._id} value={ele._id}>
                                    {ele.name}
                                </option>
                            })}
                        </select>
                        <div>
                            <input type="submit" value='Add Product' className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}