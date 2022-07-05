import React, { useEffect, useState, useContext } from "react";
import "./book-page.styles.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../../componets/shared/loader/Loader.component";
import { AuthContext } from "../../contexts/Auth.context";

const BookPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const authContextValue = useContext(AuthContext);

  const addBookToCart = async () => {
    const data = { bookID: params.bookID };
    try {
      const response = await fetch("http://localhost:3000/cart/add-to-cart/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authContextValue.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status !== 200) {
        throw new Error();
      }
      const responseData = await response.json();
      alert(`${book.title} Add to your Cart !`);
    } catch (err) {
      alert("User must login to add books to cart");
    }
  };

  useEffect(() => {
    const bookID = params.bookID;
    const getBook = async () => {
      try {
        const respone = await fetch(`http://localhost:3000/books/${bookID} `);

        if (respone.status !== 200) {
          throw new Error();
        }

        const responeData = await respone.json();
        const book = responeData.data.book;

        setBook(book);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (err) {
        console.log(err);
        navigate("*");
      }
    };

    getBook();
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="book-page-container">
      <img src={book.bookCover} alt="" />
      <h2>{book.title}</h2>
      <h3>{book.authour}</h3>

      <div className="book-info">
        <span>Pages : {book.pages} </span>
        <span>Price : {book.price}$</span>
        <button onClick={addBookToCart}>Add To Cart</button>
        <p>{book.info}</p>
      </div>
    </div>
  );
};

export default BookPage;
