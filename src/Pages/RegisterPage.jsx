import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [file, setFiles] = useState("");

  const [redirect, setRedirect] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const submitForm = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("name", name);
    data.set("email", email);
    data.set("password", password);
    data.append("image", image[0]);
    data.append("file", file[0]);

    const api = await fetch(`${apiUrl}/register`, {
      method: "POST",
      body: data,
    });

    if (api.status === 200) {
      alert("Registration Successful");
      setRedirect(true);
    } else {
      alert("Registration failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <form className="login" onSubmit={submitForm}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="file-input">
        <div
          type="button"
          className="select-photo"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <RiImageAddLine
            className="file-icon"
            style={{ marginRight: "10px", border: "2px-solid-#ddd" }}
          />
          {image && image[0] ? image[0].name : "Select Photo"}
        </div>
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files)}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <input
        type="file"
        name="file"
        onChange={(e) => setFiles(e.target.files)}
      />

      <button>Register</button>
    </form>
  );
}

export default RegisterPage;
