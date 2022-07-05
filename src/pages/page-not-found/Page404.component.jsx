import React, { useEffect, useState } from "react";
import "./page404.styles.css";
import Loader from "../../componets/shared/loader/Loader.component";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="page-not-found">
      <h1>Error 404</h1>
      <h4>Page Not Found</h4>
      <button onClick={() => navigate("/")} className="return-home-btn">
        Return Home
      </button>
    </div>
  );
};

export default PageNotFound;
