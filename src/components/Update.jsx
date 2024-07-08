import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState();

    const [error, setError] = useState("");

    const navigate = useNavigate(); 
    const {id} = useParams();
  // get single user data 
  const getSingleUser = async () =>{
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();

    if(!response.ok){
      console.log(result.errror);
      setError(result.error);
    }
    if(response.ok){
      setError("");
      console.log("updated user: ", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  }

  // send update data to the backend
  const handleUpdate = async(e) =>{
    e.preventDefault();
      const userUpdate = {name, email, age};
      const response = await fetch(`http://localhost:5000/${id}`,{
        method : "PATCH",
        body: JSON.stringify(userUpdate),
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await response.json();
      if(!response.ok){
        console.log(result.errror);
        setError(result.error);
      }
      if(response.ok){
        console.log(result);
        setError("");
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
        navigate("/all");

      }
  }


  useEffect(()=>{
    getSingleUser();
  }, [])

  return (
    <div className='container my-3'>
    {error && <div class="alert alert-danger">
      {error}
      </div>}
    <h1 className='text-center'>Update the data</h1>
      <form onSubmit={handleUpdate}>
      <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)} />
      </div>
      <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
      </div>
      <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e)=> setAge(e.target.value)}/>
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
      </form>
  </div>
  )
}

export default Update
