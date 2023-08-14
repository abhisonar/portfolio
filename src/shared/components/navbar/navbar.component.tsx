import React, { useState } from "react";
import Logo from "assets/logo.png";
import "./navbar.style.scss";
import { IMenu } from "shared/interfaces/menu.interface";
import { MENU_ITEMS } from "shared/constants/MenuItem.constant";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
    <section id="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="" />
      </div>
      <div className={`navbar-list ${isMenuActive && "active"}`}>
        {MENU_ITEMS?.map((menu: IMenu) => (
          <a
            href={`#${menu.href}`}
            className="navbar-item custom-cursor-hover"
            key={menu.id}
          >
            {menu.icon}
            <span>{menu.title}</span>
          </a>
        ))}
      </div>
      <div
        className={`navbar-menu-icon ${isMenuActive && "active"} `}
        onClick={() => setIsMenuActive(!isMenuActive)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default Navbar;
