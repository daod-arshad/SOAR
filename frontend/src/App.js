import Playbook from "./homepage/Playbook";
import { BrowserRouter as Router, Routes, Route, Navigate, redirect } from "react-router-dom";
import TestPage from "./TestPage"
import Login from "./loginSignup/Login.js"
import PrivateRoute from "./loginSignup/PrivateRoute.js"
import Signup from "./loginSignup/Signup";
import React from "react";
import Cookies from "js-cookie";


function App() {
  // let navigate = useNavigate(); 
  // let id = 0;
  // const getId = () => id++;
  // const [loggedIn, setLoggedIn] = useState(false)
  // useEffect(() => {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let decodedToken = jwt_decode(token);
  //     // console.log("Decoded Token", decodedToken);
  //     let currentDate = new Date();
  //     // JWT exp is in seconds
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       console.log("Token expired.");
  //       setLoggedIn(false);
  //     } else {
  //       console.log("Valid token");
  //       setLoggedIn(true);
  //       redirect("/playbook")
  //     }
  //   }
  //   catch {
  //     setLoggedIn(false)
  //   }
  //   console.log(loggedIn)
    
  //   },[loggedIn]);
  
    
  

  return (
    <div className="app">
      <div className="app_body">
        <Router>
          <Routes>
            <Route path="/">
              <Route index element= {<Login/>} />
             
     
              // {/* {loggedIn ? ( */}
              //   {/* [ */}
              //     {/* <React.Fragment key={getId()}> */}
                
                    <Route path="test" element={<PrivateRoute><TestPage/></PrivateRoute>} />
                    <Route path="signup" element={<PrivateRoute><Signup /></PrivateRoute>} />
                    <Route path="playbook" element={<PrivateRoute><Playbook /></PrivateRoute>} />
                    <Route path="*" element={<h1>Path not Resolved</h1>} />
                 
                  {/* </React.Fragment> */}
                {/* ] */}
              {/* ) : ( */}
                {/* <Route path="*" element={<Navigate to="/" replace/>} /> */}
              {/* )} */}
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );}

export default App;
