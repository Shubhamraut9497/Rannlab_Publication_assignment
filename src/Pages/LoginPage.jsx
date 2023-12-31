import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext/userContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo}=useContext(UserContext);

  const apiUrl = process.env.REACT_APP_API_URL;
  const submitFormLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials:"include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        console.log(userInfo); // Check the response data
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      console.log(response.status); // Check the response status
      alert("Wrong credentials");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={submitFormLogin}>
      <h1>Login</h1>
      <input
        type="text"
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginPage;
