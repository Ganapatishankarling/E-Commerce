import MenuBar from "./MenuBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import {useSelector} from 'react-redux'
function Classified(){
    const {isLoggedIn}=useSelector((state)=>{
        return state.account
    })
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="shadow-md bg-white p-4">
                <MenuBar/>
            </div>
                <div className="flex">
                    {isLoggedIn && (
                        <div className="w-64 bg-white shadow-lg p-4">
                        <SideBar/>
                    </div>
                    )}
                     <div className="flex-1 p-4">
               <Outlet/>
           </div> 
                
            </div>
        </div>
    )
}
export default Classified;