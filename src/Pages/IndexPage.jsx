import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Files from "../components/Files";

function IndexPage() {
  const [pdfs, setPdfs] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setLoading(true);
      await fetch(`${apiUrl}/pdfData`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((posts) => {
          setLoading(false);
          setPdfs(posts);
        });
    };
    fetchedData();
  }, []);
  if (loading) {
    return (
      <div className="post-loading-wrapper">
        <div className="post-loading">
          <div className="image">
            <Skeleton
              width="100%"
              height={200}
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div className="texts">
            <Skeleton
              width="80%"
              height={24}
              style={{ marginBottom: "15px" }}
            ></Skeleton>
            <div className="info">
              <Skeleton
                width="40%"
                height={16}
                style={{ marginRight: "10px" }}
              />
              <Skeleton width="30%" height={16} />
            </div>
            <Skeleton
              count={3}
              width="100%"
              height={16}
              style={{ marginBottom: "20px" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    {pdfs && pdfs.map((pdf)=>{
        return (
            <>
            <Files key={pdf._id} {...pdf}  />
            </>
        )
    })}
      
    </>
  );
}

export default IndexPage;
