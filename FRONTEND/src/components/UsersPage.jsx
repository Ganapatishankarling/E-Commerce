import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {listUsers,activeUser} from "../slice/userSlice.jsx"
export default function UsersPage(){
    const [activation,setActivation] = useState('activated')
    const dispatch = useDispatch()
    const {users}=useSelector((state)=>{
        return state.users
    })
    useEffect(()=>{
        dispatch(listUsers())
    },[dispatch])

    const ActivatedUsers=users.filter((ele)=>{
        return ele.isActive==true
    })
    const requestedUsers=users.filter((ele)=>{
        return ele.isActive==false
    })
    const handleActive=(id)=>{
        dispatch(activeUser(id))
    }
    return(
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <div className="flex justify-center gap-4 mb-6">
                <button onClick={()=>{
                    setActivation('activated')
                }} className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    activation === "activated"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}>ActivatedUsers</button>
                <button onClick={()=>{
                    setActivation('requested')
                }} className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    activation === "requested"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}>RequestedUsers</button>
            </div>
            <div>
                <div className="overflow-x-auto">
                    {activation=='activated'&&(
                        <div>
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Role</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">seller</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ActivatedUsers.map((ele)=>{
                                        return(
                                            <tr key={ele._id} className="border-t hover:bg-gray-50">
                                                <td className="px-4 py-2">{ele.name}</td>
                                                <td className="px-4 py-2">{ele.email}</td>
                                                <td className="px-4 py-2">{ele.role}</td>
                                                </tr> 
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activation=='requested'&&(
                        <div>
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Role</th>
                                        <th className="px-4 py-3">Seller</th>
                                        <th className="px-4 py-3">Activation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestedUsers.map((ele)=>{
                                        return(
                                            <tr key={ele._id} className="border-t hover:bg-gray-50">
                                                <td className="px-4 py-2">{ele.name}</td>
                                                <td className="px-4 py-2">{ele.email}</td>
                                                <td className="px-4 py-2">{ele.role}</td>
                                                <td className="px-4 py-2"><button onClick={()=>{
                                                    handleActive(ele._id)
                                                }} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Active</button></td>
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