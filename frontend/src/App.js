import Playbook from "./homepage/Playbook";
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import TestPage from "./TestPage"
import Login from "./loginSignup/Login.js"
import PrivateRoute from "./loginSignup/PrivateRoute.js"
import Signup from "./loginSignup/Signup";
import "./style/App.css"
import React, { useEffect, useState} from "react";
import Main from "./dashboard/Main";
import CreateCustomPlaybook from "./playbook/CreateCustomPlaybook";
import PlaybookTable from "./dashboard/PlaybookTable";
import Automation from "./homepage/Automation"
import "semantic-ui-css/semantic.min.css";
import DisplayCustomPlaybook from "./playbook/DisplayCustomPlaybook";
import DisplayTriggers from "./playbook/DisplayTriggers";

function App() {
  
  const [user,setLoginUser] = useState([]);

  useEffect(()=>{
    setLoginUser(localStorage.getItem('User'))
  },[])
    

  // const isAuthenticated = () => {
  //   // Check if the user is authenticated by looking for a session variable
  //   return localStorage.getItem('User') !== null;
  // };

  // if (isAuthenticated()) {

  //   return navigate("/dashboard");
  //   //window.location.href="/dashboard";
  // }

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
                    <Route path='dashboard' element={<PrivateRoute><Main /></PrivateRoute>} />              
                    <Route path='results' element={<PrivateRoute><PlaybookTable/></PrivateRoute>}/>
                    <Route path='automation' element={<PrivateRoute><Automation/></PrivateRoute>}/>
                    <Route path='createplaybook' element={<CreateCustomPlaybook/>}/>
                    <Route path='displayplaybook' element={<DisplayCustomPlaybook/>}/>
                    <Route path='displayTriggers' element={<DisplayTriggers/>}/>
                {/* <Route path="*" element={<Navigate to="/" replace/>} /> */}
              {/* )} */}
            </Route>
          </Routes>
        </Router>
    </div>
    </>
  );}

export default App;
