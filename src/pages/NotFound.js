import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import "../style/NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <AiOutlineWarning className="icon" />
      <div className="nf-text">
        <h1 className="title">404</h1>
        <p className="message">Oops! Page not found.</p>
      </div>
    </div>
  );
};

export default NotFound;
