import React from "react";

const ProfleImageComponent = ({ data, onDelete }) => {
  console.log(data);
  const removeImage = () => {
    onDelete(null);
  };

  return (
    <div className=" flex items-center flex-col justify-center gap-5">
      <img
        className="w-[150px] h-[150px] mx-auto object-cover rounded-full"
        src={data}
        alt="Profile Image"
      />
      <button
        className="px-4 ml-2 py-2 bg-red-600 text-white rounded-md mt-5"
        onClick={removeImage}
      >
        Remove Image
      </button>
    </div>
  );
};

export default ProfleImageComponent;
