import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";

import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { getDownloadURL, ref , uploadBytesResumable,  } from 'firebase/storage';
import { storage } from '../../firebase'; 

const Register = ({ isLoggedIn, setIsLoggedIn }) => {
  const [input, setInput] = useState({
    name : "",
    email : "",
    password : "",
    photo: "",
    createdAt : serverTimestamp(),
    status : true,
    trash : false, 
  });

  const [file, setFile] = useState([]); 

    // handle input change 
    const handleInputChange = (e) => {
      setInput((prevState) =>( {
        ...prevState,
        [e.target.name] : e.target.value
      }))
    }

  // create new user 
  const handleUserRegister = async(e) => {
    e.preventDefault();

   const data = await createUserWithEmailAndPassword(
       auth, 
       input.email,
       input.password
    );
  
    const fileRef = ref(storage, file.name); 
    const fileData = await uploadBytesResumable(fileRef, file);

    const link = await getDownloadURL(fileData.ref);


    await updateProfile(data.user, {
       displayName : input.name,
       photoURL : link
    })


    await signOut(auth); 
    setIsLoggedIn(false); 
  } 

  // sign out user 
  const handleUserSignOut = async() => {
    await signOut(auth); 
    setIsLoggedIn(false); 
  }; 


  return (
    <>
       <div className="container mt-5">
        {
          isLoggedIn ?
           <button className="btn btn-sm btn-primary" onClick={handleUserSignOut}> Logout </button> : 
           <h1> You are logged out </h1>
        }

        <div className="row mb-2 justify-content-center ">
          <div className="col-md-5">
            <div className="card">
               <h4 className='text-center'> Register  </h4>
               <div className="card-body">
                  <form onSubmit={handleUserRegister}>
                    <input 
                      type="text" 
                      placeholder='Name' 
                      className='form-control mb-1'
                      name='name'
                      value={input.name}
                      onChange={handleInputChange}
                      />
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
                    <input 
                      type="file" 
                      className='form-control'
                      onChange={(e) => setFile(e.target.files[0])} 
                      />
                    <button type='submit' className='btn btn-primary mt-2'> Register  </button>
                  </form>
                  <hr /> 
            
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register




