import React from "react";
import List from "./List";

const Navber = ({ data, data1 }) => {
  console.log(data);

  return (
    <ul>
      {data.map((user, i) => {
        return <List name={user.name} key={i} />;
      })}
    </ul>
  );
};

export default Navber;
