import React from "react";
import { Link } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
function Unauthorized() {
  return (
    <div
      className="unauth"
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        fontSize: "4rem",
      }}
    >
      <FaUserSecret
        style={{ marginTop: "5rem", fontSize: "10rem" }}
      ></FaUserSecret>
      <h3 style={{ margin: "1rem" }}>Unauthorized Access</h3>
      <p style={{ margin: "1rem" }}>
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "1rem",
          textDecoration: "none",
          borderRadius: "10px",
        }}
      >
        Go Back
      </Link>
    </div>
  );
}

export default Unauthorized;
