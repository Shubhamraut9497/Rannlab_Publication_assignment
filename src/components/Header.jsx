import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/userContext";

function Header() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { setUserInfo, userInfo } = useContext(UserContext);
  //   useEffect(() => {
  //     fetch(`${apiUrl}/profile`, {
  //       credentials: "include",
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((userInfo2) => {
  //         setUserInfo(userInfo2);
  //       });
  //   }, []);
    const logout=()=>{
      fetch(`${apiUrl}/logout`,{
        credentials:"include",
        method:"POST",
      })
      setUserInfo(null);
    }
  const email = userInfo?.email;
  return (
    <header>
      <Link to="/" className="logo">
        RannLab Publication
      </Link>
      <nav>
        {email && (
          <>
            <a style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
          </>
        )}
        {!email && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
