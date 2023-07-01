import { format } from "date-fns";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext/userContext";
import { BiEdit } from "react-icons/bi";

function PdfPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/pdfData/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postData) => {
        setPostInfo(postData);
      });
  }, []);

  if (!postInfo) {
    return "";
  }

  

  return (
    <div className="post-page">
      <h1>created by {postInfo.name}</h1>
      <time>{format(new Date(postInfo.createdAt), "MMM d yyyy HH:mm")}</time>
      <div className="author">by {postInfo.email}</div>
      {userInfo.id === postInfo._id && (
        <div className="edit-row">
          <Link to={`/edit/${postInfo._id}`} className="edit-btn">
            <BiEdit />
            Edit this pdf
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`${apiUrl}/${postInfo?.image}`} alt="img" />
      </div>
      <div className="content">
        <object
          data={`${apiUrl}/${postInfo.file}`}
          type="application/pdf"
          width="100%"
          height="600px"
        >
          <p>
            Your browser does not support PDF viewing. Please download the PDF
            file to view it.
          </p>
        </object>
      </div>
    </div>
  );
}

export default PdfPage;
