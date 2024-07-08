import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState();

    const [error, setError] = useState("");

    const navigate = useNavigate(); 

    console.log(name, email, age);

    const handlesubmit = async(e) =>{
      e.preventDefault();
      const addUser = {name, email, age};
      const response = await fetch("http://localhost:5000",{
        method : "POST",
        body: JSON.stringify(addUser),
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
        setName("");
        setEmail("");
        setAge(0);
        navigate("/all");

      }
    }

  return (
    <div className='container my-3'>
      {error && <div class="alert alert-danger">
        {error}
        </div>}
      <h1 className='text-center'>Enter the data</h1>
        <form onSubmit={handlesubmit}>
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
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Create
