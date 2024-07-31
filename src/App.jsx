

import { useEffect, useState } from 'react'
import './App.css'
import { createDev, getAllDev } from './firebase/database'

function App() {
  const [input, setInput] = useState({
    name : "",
    age : "",
    skill : "",
  });
  const [devdata, setDevData] = useState([]); 

  console.log(devdata);



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
   await createDev("devs", input)
 };


 // get all devs 
  useEffect(() => {
  const getDevsData = async() => {
    const ddd = await getAllDev("devs");
    setDevData(ddd);
  
  };
  
  getDevsData();
 }, [] )



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
                      className='form-control'
                      name='skill'
                      value={input.skill}
                      onChange={handleInputChange}
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
                        <td> {item.name}</td>
                        <td> {item.age} </td>
                        <td> {item.skill} </td>
                        <td> 
                          <button className='btn btn-sm btn-info'> View </button>
                          <button className='mx-1 btn btn-sm btn-warning'> Edit </button>
                          <button className='btn btn-sm btn-danger'> Delete </button>
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
