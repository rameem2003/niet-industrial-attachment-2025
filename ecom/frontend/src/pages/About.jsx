import React from "react";
import { useLocation } from "react-router";

const About = () => {
  let data = useLocation();
  console.log(data);

  return <div>About</div>;
};

export default About;
