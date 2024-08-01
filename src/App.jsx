
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

import './App.css';
function App() {

 const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
      const authState = onAuthStateChanged(auth, (user) => {

        if (user) {
          setIsLoggedIn(user)
          console.log(user);
        } else{
          console.log("No user Found");
        }

      });
        
      return () => authState(); 
    }, []);


  return (
    <>
    {
      isLoggedIn &&  (
        <>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-5">
                <h1> <img src={isLoggedIn.photoURL} style={{width: "50px", height : "50px", borderRadius : "50%"}} alt="photo" /> </h1>
                <h1> {isLoggedIn.displayName} </h1>
                <h1> {isLoggedIn.email} </h1>
            </div>
          </div>
        </div>
        </>
      ) 
    }

     <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
     <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </>
  )
}

export default App
