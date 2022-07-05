import React from "react";
import "./book.styles.css";


import { useNavigate } from "react-router-dom";
const Book = (props) => {
  const navigate = useNavigate()

  return (
    <div className="book-container">
      <img src={props.bookCover} alt="" onClick={()=>navigate(`/books/${props.id}`)} />
      <h3 className="bookCard-title">{props.title}</h3>
      <p className="bookAuthour">{props.authour}</p>
    </div>
  );
};

export default Book;

{/* <img src={props.bookCover} alt="" onClick={()=>navigate(`/book/${props.id}`)} /> */}