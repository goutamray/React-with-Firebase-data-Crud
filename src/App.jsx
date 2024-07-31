

import { useEffect, useState } from 'react'
import './App.css'
import { createDev, deleteSingleDev, getAllDevRealTime } from './firebase/database';
import { serverTimestamp } from 'firebase/firestore';

import { getDownloadURL, ref , uploadBytesResumable,  } from 'firebase/storage';
import { storage } from './firebase';


function App() {
  const [input, setInput] = useState({
    name : "",
    age : "",
    skill : "",
    photo: "",
    createdAt : serverTimestamp(),
    status : true,
    trash : false, 
  });

  const [devdata, setDevData] = useState([]); 

  const [file, setFile] = useState([]); 


  // handle input change 
  const handleInputChange = (e) => {
    setInput((prevState) =>( {
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }


 // create new dev
 const handleDevsCreate = async (e) => {
   e.preventDefault();

  const fileRef = ref(storage, file.name); 

 const fileData = await uploadBytesResumable(fileRef, file);

  const link = await getDownloadURL(fileData.ref);


   await createDev("devs", {...input, photo : link} ); 
   setInput({
      name : "",
      age : "",
      skill : "",
      photo: "",
   })
   e.target.reset(); 
 };


 // delete single dev
 const handleDeleteDev = async (id) => {
    await deleteSingleDev("devs", id)
 }


 // get all devs 
  useEffect(() => {
     getAllDevRealTime("devs", setDevData);

 }, []); 



  return (
    <>
      <div className="container mt-5">
        <div className="row mb-2 justify-content-center ">
          <div className="col-md-5">
            <div className="card">
               <h4 className='text-center'> Add New Student </h4>
               <div className="card-body">
                  <form onSubmit={handleDevsCreate}>
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
                      placeholder='Age' 
                      className='form-control mb-1'
                      name='age'
                      value={input.age}
                      onChange={handleInputChange}
                      />
                    <input 
                      type="text" 
                      placeholder='Skill' 
                      className='form-control mb-1'
                      name='skill'
                      value={input.skill}
                      onChange={handleInputChange}
                      />
                    <input 
                      type="file" 
                      className='form-control'
                      onChange={(e) => setFile(e.target.files[0])}
                      />

                    <button type='submit' className='btn btn-primary mt-2'> Create </button>
                  </form>
               </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <table className='table '>
                  <thead>
                       <tr>
                         <th> # </th>
                         <th> Photo </th>
                         <th> Name </th>
                         <th> Age </th>
                         <th> Skill </th>
                         <th> Action </th> 
                       </tr>
                  </thead>
                  <tbody>
                    {
                      devdata.map((item, index) => {
                        return  <tr key={index}>
                        <td> { index + 1} </td>

                        <td> 
                          <img src={item.photo} style={{width : "50px", height: "50px", borderRadius: "50%"}} alt="" />
                        </td>

                        <td> {item.name}</td>
                        <td> {item.age} </td>
                        <td> {item.skill} </td>
                        <td> 
                          <button className='btn btn-sm btn-info'> View </button>
                          <button className='mx-1 btn btn-sm btn-warning'> Edit </button>
                          <button className='btn btn-sm btn-danger' onClick={() => handleDeleteDev(item.id)}> Delete </button>
                        </td>
                     </tr>
                      })
                    }
                 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
