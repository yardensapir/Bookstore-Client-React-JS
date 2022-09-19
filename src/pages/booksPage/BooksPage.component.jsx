import React, { useEffect, useState } from "react";
import "./books-page.styles.css";
import Book from "../../componets/shared/book/Book.component";
import Loader from "../../componets/shared/loader/Loader.component";
import environments from "../../environments/environments.js";

const BooksPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const respone = await fetch(`${environments.API_URL}/books`);

        if (respone.status !== 200) {
          throw new Error();
        }

        const responseData = await respone.json();
        const books = responseData.data.books;
        setBooks(books);

        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (err) {
        alert("Something went wrong");
      }
    };
    getBooks()
  }, []);

  return (
    <main className="main-book-page">
      {books.map((book) => {
        return isLoading ? (
          <Loader />
        ) : (
          <Book
            key={book._id}
            title={book.title}
            bookCover={book.bookCover}
            authour={book.authour}
            id={book._id}
          />
        );
      })}
    </main>
  );
};

export default BooksPage;
