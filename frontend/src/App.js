import Playbook from "./homepage/Playbook";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestPage from "./TestPage"
import Login from "./loginSignup/Login.js"
import jwt_decode from "jwt-decode";
import Signup from "./loginSignup/Signup";
import React ,{ useState, useEffect } from "react"


function App() {
  let id = 0;
  const getId = () => id++;
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    try {
      let token = localStorage.getItem("token");
      let decodedToken = jwt_decode(token);
      // console.log("Decoded Token", decodedToken);
      let currentDate = new Date();
      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        setLoggedIn(false);
      } else {
        console.log("Valid token");
        setLoggedIn(true);
      }
    }
    catch {
      setLoggedIn(false)
    }
    
    },[]);
  
    

  return (
    <div className="app">
        <div className="app_body">
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Login/>} />
              
             
              {loggedIn
                ? [
                    <React.Fragment key={getId()}>
                      <Route path="test" element={<TestPage />} />,
                      <Route path="/signup"  element= {<Signup/>}/>
                    </React.Fragment>,
                  ]
                : null}
                
            </Route>
            <Route path="*" element={<p>Path not resolved !</p>} />
            <Route path="playbook" element={<Playbook />} />

          </Routes>
        </Router>
      </div>
    </div>
  );}

export default App;
