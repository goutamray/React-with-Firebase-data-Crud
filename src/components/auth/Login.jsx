import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import { auth, facebookProvider, googleProvider } from "../../firebase";



const Login = ( { isLoggedIn, setIsLoggedIn  }) => {
  const [input, setInput] = useState({
    email : "",
    password : "", 
  });


    // handle input change 
    const handleInputChange = (e) => {
      setInput((prevState) =>( {
        ...prevState,
        [e.target.name] : e.target.value
      }))

    }

    // login 
    const handleUserLogin = async(e) => {
      e.preventDefault(); 
  
    const data = await signInWithEmailAndPassword(auth, input.email, input.password ); 

    setIsLoggedIn(data.user); 

    }

    // google login 
    const handleGoogleLogin = async() => {
      const data = await signInWithPopup(auth, googleProvider);
      setIsLoggedIn(data.user); 
    }

    // facebook login
    const handleFaceBookLogin = async () => {
      const data =  await signInWithPopup(auth, facebookProvider);
        setIsLoggedIn(data.user); 
    }
    
  return (
    <>
       <div className="container mt-5">
        <div className="row mb-2 justify-content-center ">
          <div className="col-md-5">
            <div className="card">
               <h4 className='text-center'> Login  </h4>
               <div className="card-body">
                  <form onSubmit={handleUserLogin}>
                    <input 
                      type="text" 
                      placeholder='Email' 
                      className='form-control mb-1'
                      name='email'
                      value={input.email}
                      onChange={handleInputChange}
                      />
                    <input 
                      type="text" 
                      placeholder='Password' 
                      className='form-control mb-1'
                      name='password'
                      value={input.password}
                      onChange={handleInputChange}
                      />
                    <button type='submit' className='btn btn-primary mt-2'> Login  </button>
                  </form>
                  <div>  
                      <button onClick={handleGoogleLogin}> Google </button>
                     <button onClick={handleFaceBookLogin}> Facebook </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login


