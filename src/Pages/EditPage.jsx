import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

function EditPage() {
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [address, setAddress] = useState("")
  const [redirect,setRedirect]=useState(false);
  const {id}=useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  const updatePost=async(e)=>{
    e.preventDefault();
    const data=new FormData();
    data.set("name",name);
    data.set("educaton",education)
    data.set("address",address);
    const response=await fetch(`${apiUrl}/updatePdf/${id}`,{
        method:"PUT",
        body:data,
    })
    if(response.ok)
    setRedirect(true)
  }
  if(redirect){
    return <Navigate to={`/`}/>
  }
  return (
    <form onSubmit={updatePost}>
      <input
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
      type="education"
      placeholder="education"
      value={education}
      onChange={(e)=>setEducation(e.target.value)}
      />
      <input
        type="address"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button style={{ marginTop: "5px" }}>Update Pdf</button>
    </form>
  );
}

export default EditPage;
