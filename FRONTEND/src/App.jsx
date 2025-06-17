import './App.css';
import {useEffect} from 'react'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import Register from './components/Register.jsx'
import Account from './components/Account.jsx'
import Login from './components/Login.jsx'
import Category from './components/Category.jsx'
import CategoryForm from './components/CategoryForm.jsx'
import Product from './components/Product.jsx'
import ProductForm from './components/ProductForm.jsx'
import MyProducts from './components/MyProducts.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Dashboard from './components/Dashboard.jsx'
import Homepage from './components/Homepage.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import UsersPage from './components/UsersPage.jsx'
import {useSelector,useDispatch} from 'react-redux'
import ProductEnquiry from './components/ProductEnquiry.jsx'
import {login,logout} from './slice/userSlice.jsx'
import {fetchUserAccount} from './slice/AccountSlice.jsx'
import Cart from './components/Cart.jsx'
import Classified from './components/ClassifiedApp.jsx';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoggedIn} = useSelector((state)=>{
    return state.account;
  })
  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(fetchUserAccount())
      // async function fetchUserAccount(){
      //   try{
      //     const response = await axios.get('/account',{
      //       headers:{
      //         Authorization:localStorage.getItem('token')
      //     }
      //   })
      //     dispatch(login(response.data))
      //   }catch(err){
      //     console.log(err)
      //   }
      // }
      // fetchUserAccount()
    }
  },[])
  return (
    <div className="App">
      <h1>User Auth</h1>
      {/* <ul>
        {isLoggedIn ?( 
          <>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to='/account'>Account</Link></li>
          <li><button onClick={()=>{dispatch(logout());localStorage.removeItem('token');navigate('/login')}}>Logout</button></li>
        </>
        ):(
          <>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
          </>
        )}
      </ul> */}
      <Routes>
        
        <Route path=''element={<Classified/>}> 
        <Route path='/register'element={<Register />}/>
        <Route path='/login'element={<Login />}/>
        <Route path='/account'element={<PrivateRoute><Account /></PrivateRoute>}/>
        {/* <Route path='/dashboard'element={<PrivateRoute permittedRoles={['admin','user']}><Dashboard /></PrivateRoute>}/> */}
        <Route path='/category'element={<Category />}/>
        <Route path='/add-category'element={<CategoryForm />}/>
        <Route path='/add-category/:id'element={<CategoryForm />}/>
        <Route path='/product'element={<Product />}/>
        <Route path='/add-product'element={<ProductForm />}/>
        <Route path='/add-product/:id'element={<ProductForm />}/>
        <Route path='/my-product'element={<MyProducts />}/>
        <Route path='/'element={<Homepage />}/>
        <Route path='/product-detail/:id'element={<ProductDetails />}/>
        <Route path='/users'element={<UsersPage />}/>
        <Route path='/product-enquiry/:id'element={<ProductEnquiry />}/>
        <Route path='/cart'element={<Cart />}/>
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
