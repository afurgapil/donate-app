import React from "react";
import "../style/Footer.scss";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer>
      <div>
        created by
        <a href="https://github.com/afurgapil" target="_blank" rel="noreferrer">
          Gapil
        </a>
      </div>
      <div>
        <Link className="dashboard" to="/admin">
          <p>Dashboard</p>
          <BsArrowUpRight></BsArrowUpRight>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
