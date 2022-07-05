import React, { useEffect, useState } from "react";
import "./home-page.styles.css";
import Loader from "../../componets/shared/loader/Loader.component";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <main className="main-home-page">
      <h1>welcome to yarden's book store !</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero a,
        molestias delectus rem reiciendis suscipit eius! Quam accusantium
        tenetur laboriosam ab ut voluptates saepe quod nisi eligendi! Ea,
        voluptas repellendus.
      </p>
      <button onClick={() => navigate("/books")} className="info-btn">
        More Info
      </button>
    </main>
  );
};

export default HomePage;
