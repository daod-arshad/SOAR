import Playbook from "./homepage/Playbook";
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import TestPage from "./TestPage"
import Login from "./loginSignup/Login.js"
import PrivateRoute from "./loginSignup/PrivateRoute.js"
import Signup from "./loginSignup/Signup";
import "./style/App.css"
import React, { useEffect, useState} from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function App() {

  const [user,setLoginUser] = useState([]);

  useEffect(()=>{
    setLoginUser(localStorage.getItem('User'))
  },[])
    
  const updatedUser = (user)=>{
    localStorage.setItem('User',user);
    setLoginUser(user);
  }



  return (
    <>
    <div className="app">
        <Router>
          <Routes>
            <Route path="/">
              <Route index element= {<Login updatedUser={updatedUser} />}/> 

                    <Route path="test" element={<PrivateRoute><TestPage/></PrivateRoute>} />
                    <Route path="signup" element={<PrivateRoute><Signup /></PrivateRoute>} />
                    <Route path="playbook" element={<PrivateRoute><Playbook/></PrivateRoute>} />
                    <Route path="*" element={<h1>Path not Resolved</h1>} />
                 
           
                {/* <Route path="*" element={<Navigate to="/" replace/>} /> */}
              {/* )} */}
            </Route>
          </Routes>
        </Router>
    </div>
    </>
  );}

export default App;
