import React, { useCallback, useMemo, useState } from "react";
import Child from "./Child";

const Parent = () => {
  console.log("Parent Component Render....");
  const [count, setCount] = useState(0);
  let name = useMemo(
    () => ({
      name: "NIET",
    }),
    []
  );

  const handleIncrement = () => {
    setCount((c) => c + 1);
  };

  const displayCount = useCallback(() => {
    console.log(count);

    alert(`Child Component Call`);
  }, []);
  return (
    <div>
      <h1 className="text-4xl text-red-500">{count}</h1>
      <button
        onClick={handleIncrement}
        className=" p-3 bg-blue-500 text-white font-semibold"
      >
        Count
      </button>
      <Child displayCount={displayCount} />
    </div>
  );
};

export default Parent;
