import React, { useContext } from "react";
import "./pop-menu.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/Auth.context";
import { useNavigate } from "react-router-dom";

const PopMenu = ({ closeMenu }) => {
  const navigate = useNavigate();
  const handelLogOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authContextValue.userToken}`,
        },
      });
      if (response.status !== 200) {
        throw new Error();
      }
      await response.json();
      localStorage.removeItem("userToken");
      authContextValue.setUserToken(null);
      closeMenu(false);
      alert("Logout Success !")
      navigate("/");
    } catch (err) {
      alert("Something went wrong");
    }
  };
  const authContextValue = useContext(AuthContext);

  return (
    <div className="backdrop">
      <button onClick={() => closeMenu(false)} type="button">
        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
      </button>

      <ul className="menu-items">
        <Link to="" onClick={() => closeMenu(false)}>
          <li className="menu-items">Home</li>
        </Link>

        {!authContextValue.userToken && (
          <Link to="login" onClick={() => closeMenu(false)}>
            <li className="menu-items">Login</li>
          </Link>
        )}

        {authContextValue.userToken && (
          <Link to="cart" onClick={() => closeMenu(false)}>
            <li className="menu-items">Cart</li>
          </Link>
        )}

        <Link to="books" onClick={() => closeMenu(false)}>
          <li className="menu-items">Books</li>
        </Link>

        {authContextValue.userToken && (
          <li>
            <button onClick={handelLogOut} type="button" id="logout-btn">
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PopMenu;
