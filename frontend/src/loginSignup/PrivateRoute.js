import {useNavigate} from 'react-router-dom';
import React, {useEffect} from "react";
import axios from 'axios';
const PrivateRoute = React.memo( function PrivateRoute({children}) {


  const authorizationToken = localStorage.getItem('User');
  // const decodedToken = jwt_decode(authorizationToken);
  // console.log("decodedToken",decodedToken);

  // const isExpired = decodedToken ? new Date().getTime() > decodedToken.exp * 1000 : true;

  // console.log(isExpired)

  //const location = useLocation();
  const navigate = useNavigate();
  
    useEffect(()=>{
    const verifyUser = async()=>{
      if (!authorizationToken){
        navigate('/')
      }
 }
      
    verifyUser();
},[navigate, authorizationToken]);


  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${authorizationToken}`
    }
  });

  const currentRoute = window.location.pathname;
  // console.log(currentRoute);
  
  axiosInstance.post(`http://localhost:9000/user/${currentRoute}`) // <-- this is the protected endpoint
    .then(response => {
      // console.log(response.data);
    })
    .catch(error => {
     // Wait for 0.5 seconds before redirecting to the login route
      setTimeout(removeTokenAndRedirect, 500);
      //document.location.href= '/';
    });


    function removeTokenAndRedirect() {
      localStorage.removeItem('User');
      window.location.href = '/';
    }
  
    
    // axiosInstance.post('http://localhost:9000/user/dashboard') // <-- this is the protected endpoint
    // .then(response => {
    //   console.log(response.data);
    // })
    // .catch(error => {
    //  // Wait for 0.5 seconds before redirecting to the login route
    //   setTimeout(removeTokenAndRedirect, 500);
    //   //document.location.href= '/';
    // });




return (
   <>
{children}
 
      {/* {isAuthenticated() ? (
          {children}
        ) : (
          <navigate to={{ pathname: loginPath, state: { from: location.pathname } }} replace />
        )
      } */}
    
   </>
)}

);

export default PrivateRoute;