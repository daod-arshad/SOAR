import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import axios from "../axios.js"
//import * as jwt_decode from 'jwt-decode'

const PrivateRoute = React.memo( function PrivateRoute({children}) {
  
  
  const[cookies, removeCookie] = useCookies([]);
  let navigate = useNavigate();
 // const [loggedIn, setLoggedIn] = useState(false)



//  const checkLogged= ()=>{
//     let id = 0;
//     const getId = () => id++;
//     try {
//          let token = Cookies.get("jwt");
//          let decodedToken = jwt_decode(token);
//          console.log("Decoded Token", decodedToken);
//         let currentDate = new Date();
// // JWT exp is in seconds
//         if (decodedToken.exp * 1000 < currentDate.getTime()) {
//           console.log("Token expired.");
//           setLoggedIn(false);
//         } else {
//           console.log("Valid token");
//           setLoggedIn(true);
//           navigate("/playbook")}
//         }
// catch {
// setLoggedIn(false)
// }
// console.log(loggedIn)}

  // const jwtval = Cookies.get('jwt');
  // console.log("jwtvalue: " +jwtval)
  useEffect(()=>{
    const verifyUser = async()=>{
      if (!cookies.jwt){
        // document.location.href= "/"
        
        navigate('/');
        console.log("gfgfghggh");}
    
      // } 
      else{
        {cookies.jwt?
          axios
          .post("/user/playbook", {},{
        // withCredentials: true,
      }).then((response)=>{
        //checkLogged()

  
      },[])
      .catch(err => console.log("Nothing")) : navigate("/");
          
    }
  }
  
        // if (cookies.jwt === jwtval){
        //     console.log('matched')
        //   }
        //   else{
        //     document.location.href= "/"
        //   }
        
        
        // }
    }
    
    verifyUser();
},[cookies, navigate, removeCookie]);

return (
   <>
{children}
   </>
)}

);

export default PrivateRoute;