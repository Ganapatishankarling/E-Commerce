import React from "react"
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux"
import store from "./config/store.jsx"
console.log('store',store.getState())
store.subscribe(()=>{
  console.log('store',store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
