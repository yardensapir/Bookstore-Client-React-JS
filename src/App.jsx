import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componets/shared/header/Header.component";
import Footer from "./componets/shared/footer/Footer.component";
import HomePage from "./pages/home-page/HomePage.component";
import BooksPage from "./pages/booksPage/BooksPage.component";
import BookPage from "./pages/bookPage/BookPage.component";
import PageNotFound from "./pages/page-not-found/Page404.component";
import LoginPage from "./pages/login-page/LoginPage.component";
import SignupPage from "./pages/signup-page/SignupPage.component";
import CartPage from "./pages/cartPage/CartPage.component";
import AuthContextProvider from "./contexts/Auth.context";
import CartContextProvider from "./contexts/Cart.context";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider> 
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="books/:bookID" element={<BookPage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;

