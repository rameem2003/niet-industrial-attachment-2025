import React, { memo, useState } from "react";

const Child = ({ displayCount }) => {
  console.log("Child Component Render....");
  //   const [count, setCount] = useState(0);
  return (
    <div>
      <button
        onClick={displayCount}
        className=" p-3 bg-red-500 text-white font-semibold"
      >
        Display
      </button>
    </div>
  );
};

export default memo(Child);
