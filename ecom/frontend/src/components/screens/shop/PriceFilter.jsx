import React from "react";

const PriceFilter = ({ setValue, value }) => {
  const sliderChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input
        onChange={sliderChange}
        type="range"
        className="custom-range w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        min={0}
        max={20000}
        defaultValue={value}
        name=""
        id=""
      />

      <div className=" mt-2 flex items-center justify-between">
        <div>
          <span>Low</span>
          <span>0</span>
        </div>
        <div>
          <span>High</span>
          <span>{value}</span>
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
