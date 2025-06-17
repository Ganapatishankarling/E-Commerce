import {ShoppingBasket} from 'lucide-react'
import {useNavigate,useLocation,Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { fetchUserAccount } from '../slice/AccountSlice.jsx'
import {useEffect} from  'react'

export default function MenuBar(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    console.log(location.pathname.slice(1))

    const {data,isLoggedIn}=useSelector((state)=>{
        return state.account
    })

    useEffect(()=>{
        dispatch(fetchUserAccount())
    },[isLoggedIn])

    return(
        <div className="bg-gray-100 p-4 shadow-md rounded-lg max-w-md mx-auto mt-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    {isLoggedIn && (
                        <button className="relative flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={()=>{
                            navigate('/cart')
                        }}><ShoppingBasket/><span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{location.pathname.slice(1) === 'view-cart' ? '' : `${data?.cart?.length}`}</span></button>
                    )}
                </div>

                <h2 className="text-xl font-semibold">Classified App</h2>
            </div>
            {!localStorage.getItem('token') ? (
                <div>
                 <Link to='/login'>
                 <div className="mb-2 px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg shadow text-center transition font-medium">
                     Login
                 </div>
                 </Link>
     
                 <Link to='/register'>
                 <div className="px-4 py-2 bg-white text-green-600 hover:bg-green-50 rounded-lg shadow text-center transition font-medium">
                     Register
                 </div>
                 </Link>
                 </div>
            ):null}
           
        </div>
    )
}