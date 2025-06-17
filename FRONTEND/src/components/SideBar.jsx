import { Navigation } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {logout} from '../slice/userSlice'
// import logo from "../images/logo (2).png";
export default function SideBar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div>
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <Link to="/account">
              <div className="px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer text-gray-700 font-medium">
                Profile
              </div>
            </Link>

            <Link to="/category">
              <div className="px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer text-gray-700 font-medium">
                Category
              </div>
            </Link>

            <Link to="/product">
              <div className="px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer text-gray-700 font-medium">
                Products
              </div>
            </Link>

            <Link to="/users">
              <div className="px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer text-gray-700 font-medium">
                Users
              </div>
            </Link>

            <Link to="/my-product">
              <div className="px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer text-gray-700 font-medium">
                My Product
              </div>
            </Link>
          </div>

          <div>
            <button onClick={()=>{dispatch(logout());localStorage.removeItem('token');navigate('/login')}} className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
