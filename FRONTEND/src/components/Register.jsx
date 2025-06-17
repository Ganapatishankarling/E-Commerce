import {useState} from "react"
import {isEmail} from 'validator'
import {useNavigate} from 'react-router-dom'
import axios from '../config/axios.jsx'
export default function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [clientErrors, setClientErrors] = useState({})
    const [serverErrors,setServerErrors] = useState(null)
    const [role,setRole] = useState('')
    const navigate = useNavigate()
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const errors = {}
            if(email.trim().length===0){
                errors.email='email is required'
            }else if(!isEmail(email)){
                errors.email='please provide valid email'
            }
            if(password.trim().length===0){
                errors.password='password is required'
            }else if(password.trim().length<8 || password.trim().length>128){
                errors.password='password should be between 8 to 128 characters'
            }
            if(Object.entries(errors).length>0){
                setClientErrors(errors)
            }else{
                const formData = {
                    name:name,
                    email:email,
                    password:password,
                    role:role
                }
               try{
                const response = await axios.post("/register",formData)
                navigate('/login')
               }catch(err){
                setServerErrors(err.response.data.errors)
                setClientErrors({})
               }
            }
    }
    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-6">Register Here</h2>
            {serverErrors && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-2"> These error/s prohibited the form from being saved</h3>
                    <ul className="list-disc list-inside">
                        {serverErrors.map((err,i)=>{
                            return <li key={i}>{err.msg}</li>
                        })}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <div>
                    <label className="block font-medium text-gray-700">Enter Name Here:</label><br/>
                    <input type="text" value={name} onChange={(e)=>{
                        setName(e.target.value)
                    }} className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                    <label htmlFor="email" className="block font-medium text-gray-700">Enter Email Here:</label><br/>
                    <input type="text" value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    id="email" className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    {clientErrors.email && <p className="text-sm text-red-500 mt-1">{clientErrors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block font-medium text-gray-700">Enter Password Here:</label><br/>
                    <input type="password" value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    id="password" className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {clientErrors.password && <p className="text-sm text-red-500 mt-1">{clientErrors.password}</p>}
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mb-2">Select role:</label>
                    <input type="radio" id="seller" name="role" checked={role==="seller"} onChange={()=>{setRole('seller')}} className="mr-2"/> <label htmlFor="seller">seller</label>
                    <input type="radio" id="buyer" name="role" checked={role==="buyer"} onChange={()=>{setRole('buyer')}} className="mr-2"/> <label htmlFor="buyer">buyer</label>
                </div>
                <div>
                <input type="submit" className="w-full mt-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"/>
                </div>
            </form>
        </div>
    )
}