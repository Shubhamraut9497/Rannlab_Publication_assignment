import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function Files({ _id, image, file, createdAt, name }) {
  const formattedDate = format(new Date(createdAt), "dd-MM-yyyy HH:mm");
  console.log(image + " " + file + " " + createdAt);
  const handleDownload = () => {
    if (file.endsWith(".pdf")) {
      // If the file is a PDF, initiate the download
      window.open(`${process.env.REACT_APP_API_URL}/${file}`, "_blank");
    }
  };

  return (
    <div className="post">
      <div className="image">
        <img src={`${process.env.REACT_APP_API_URL}/${image}`} alt="img" />
      </div>
      <div className="texts">
        <Link to={`/pdfData/${_id}`}>
          <h2>{name}</h2>
        </Link>
        <p className="info">
          <a className="author">{name}</a>
          <time>{formattedDate}</time>
        </p>
        <p>
          This browser does not support PDFs. Please download the PDF to view
          it:
        </p>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default Files;
