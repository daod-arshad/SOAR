import { useNavigate } from 'react-router-dom';
import React, {useEffect} from "react";
import { useJwt } from 'react-jwt';
import jwt_decode from 'jwt-decode'
const PrivateRoute = React.memo( function PrivateRoute({children}) {
const maxAge = 30*60


  const authorizationToken = localStorage.getItem('User');
  const decodedToken = jwt_decode(authorizationToken);
  console.log("decodedToken",decodedToken);

  //const expirationTime = decodedToken ? decodedToken.exp * 1000 : 0;
  //const isExpired = new Date().getTime() > expirationTime;
  const isExpired = decodedToken ? new Date().getTime() > decodedToken.exp * 1000 : true;
 // const tt= decodedToken.exp * 1000 < currentDate.getTime())
  console.log(isExpired)

  let navigate = useNavigate();

  useEffect(()=>{
    const verifyUser = async()=>{
      if (!authorizationToken){
        navigate('/')
      }
    
      else{
        if(authorizationToken){
          try{
           // console.log(isExpired)
           // let currentDate = new Date();
            {!(isExpired)
    
              //(decodedToken.exp * 1000 < currentDate.getTime())
              ?   navigate({children}):
              //localStorage.removeItem("User")
               (navigate('/'))
            }
         
          }
          catch(err){
            if (err.message === 'Invalid token specified') {
                // Redirect to login page
                navigate('/');    
          
        }
      }
        }
       
         
  }
 }
      
    verifyUser();
},[navigate]);

return (
   <>
{children}
   </>
)}

);

export default PrivateRoute;