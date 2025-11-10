import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div>
      404
      {/* <button>Go to Home</button> */}
      {/* <a href="/">Go to home</a> */}
      <Link to="/">Go to home</Link>
    </div>
  );
};

export default Error;
