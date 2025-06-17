import {useState} from "react"
import {isEmail} from 'validator'
import {useNavigate} from 'react-router-dom'
import axios from '../config/axios.jsx'
import {useDispatch} from "react-redux"
import {login} from "../slice/userSlice.jsx"
export default function Login(){
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [clientErrors, setClientErrors] = useState({})
    const [serverErrors,setServerErrors] = useState(null)
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
                    email:email,
                    password:password, 
                }
               try{
                const response = await axios.post("/login",formData)
                console.log(response.data)
                localStorage.setItem('token',response.data.token)
                const userResponse = await axios.get("/account",{headers:{Authorization:localStorage.getItem('token')}})
                console.log(userResponse.data)
                dispatch(login(userResponse.data))
                navigate('/account')
               }catch(err){
                setServerErrors(err.response.data.errors)
                setClientErrors({})
               }
            }
    }
    // const rjpay = ({amount})=>{
    //     // const amount = 500
    //     let totalAmount = amount*100
    //     let options = {
    //         key: "rzp_test_1jetrYAgo8VSXc",
    //         amount: totalAmount,
    //         currency: "INR",
    //         name: "BOOK MY SHOW",
    //         description : "Movies Purchase on Rental",
    //         images:"https://in.bmscdn.com/webin/common/icons/logo.svg",
    //         handler:() => { //this will be triggered when the payment is done
    //            alert ("Payment Done")
    //         },
    //         theme : {color :"#c4242d"}  // theme we changed 
    //      };
    //      let rzp = new window.Razorpay(options) // window we are accessing scriptfile index.html
    //      rzp.open();
    // }

 
    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-6">Login here</h2>
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
                    <label htmlFor="email" className="block font-medium text-gray-700">Enter Email Here:</label><br/>
                    <input type="text" value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="email"/>
                    {clientErrors.email && <p className="text-sm text-red-500 mt-1">{clientErrors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block font-medium text-gray-700">Enter Password Here:</label><br/>
                    <input type="password" value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="password"/>
                    {clientErrors.password && <p className="text-sm text-red-500 mt-1">{clientErrors.password}</p>}
                </div>
                <div>
                <input type="submit" className="w-full mt-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"/>

                </div>
            </form>
            <button onClick={()=>rjpay(3000)} type="button" style={{background:"red",cursor:"pointer"}}>Test</button>
        </div>
    )
}