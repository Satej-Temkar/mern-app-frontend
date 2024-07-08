import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  async function getData(){
    const response = await fetch("http://localhost:5000");
    const result = await response.json();

    if(!response.ok){
      console.log(result.errror);
      setError(result.error);
    }
    if(response.ok){
      setData(result);
    }

  }

  const deleteData = async (id) =>{
    const response = await fetch(`http://localhost:5000/${id}`, { method: "DELETE"});

    const result = await response.json();

    if(!response.ok){
      console.log(result.errror);
      setError(result.error);
    }
    if(response.ok){
      console.log("Deleted", response.ok);
      setError("Deleted Successfully");

      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }



  useEffect(()=>{
    getData();
  }, [])

  console.log(data);


  
  return (
    <div className="container my-2">
       {error && <div class="alert alert-danger">
        {error}
        </div>}
      <h1 className="text-center py-3">All data</h1>
      <div className="row">
        {data?.map((elem)=>(
          <div key={elem._id} className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{elem.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{elem.email}</h6>
              <p className="card-text">
              {elem.age}
              </p>
              <Link className="link-primary me-5" onClick={()=>deleteData(elem._id)} style={{cursor: "pointer"}}>
               Delete
              </Link>
              <Link to={`/${elem._id}`} className="link-primary" style={{cursor: "pointer"}}>
               Update
              </Link>
            </div>
          </div>
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default Read;
