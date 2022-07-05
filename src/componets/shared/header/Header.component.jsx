import React, { useState } from "react";
import "./header.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import PopMenu from "../pop-menu/PopMenu.component";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="main-header">
      <h1 onClick={() => navigate("/")}>Yarden's Book Store</h1>
      <button className="menu-btn" onClick={() => setOpenMenu(true)}>
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </button>
      {openMenu && <PopMenu closeMenu={setOpenMenu} />}
    </header>
  );
};

export default Header;
