import {useSelector,useDispatch} from "react-redux"
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {fetchUserAccount} from '../slice/AccountSlice.jsx' 
import {deleteAccount} from '../slice/AccountSlice.jsx'
export default function Account(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchUserAccount())
    },[dispatch])
    const {data} = useSelector((state)=>{
        return state.account
    })
    console.log(data)

    const handleDeleteAccount=async()=>{
        const request=window.confirm('are you sure you want to delete your account');
        if(request){
            const result=await dispatch(deleteAccount(data._id));
            if(deleteAccount.fulfilled.match(result)){
                navigate('/login')
            }
        }
    }
    if(!data) return false
    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">User Account</h2>
            <div className="text-gray-700 mb-6">
            <p className="mb-1">email-{data.email}</p>
            <p className="mb-4">role-{data.role}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
                <h2 className="text-lg font-semibold mb-4 text-center">
                    <div className="space-y-2">
                        <p className="mb-2"><span>{data.name}</span></p>
                        <p className="mb-2"><span>{data.email}</span></p>
                        <p className="mb-4"><span>{data.role}</span></p>
                        <div className="flex gap-4">
                            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Update Profile</button>
                            <button onClick={()=>{
                                handleDeleteAccount()
                            }} className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Delete Account</button>
                        </div>
                    </div>
                </h2>
            </div>
        </div>
    )
}