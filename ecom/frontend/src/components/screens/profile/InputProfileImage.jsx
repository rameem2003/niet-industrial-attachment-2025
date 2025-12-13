import React, { useState } from "react";

// react icons
import { CgProfile } from "react-icons/cg";
import useAuth from "../../../hooks/useAuth";

const InputProfileImage = () => {
  const { user, userProfileImageUpdate } = useAuth();
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);

  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    console.log(event);

    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const uploadImage = async () => {
    console.log("UPload");
    await userProfileImageUpdate(file);
  };

  return (
    <div className="p-3 mb-2 flex items-center flex-col gap-5 justify-center">
      <div className="text-center flex flex-col items-center justify-center">
        <input
          type="file"
          name="image"
          id="image_input"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <div className="w-[150px] h-[150px] rounded-full dark:border-slate-700 border border-[#e5eaf2] flex items-center justify-center">
          {image === "" ? (
            <CgProfile className="text-[10rem] text-[#e5eaf2] dark:text-slate-500" />
          ) : (
            <img
              src={image}
              alt="image"
              className="w-full h-full mx-auto object-cover rounded-full"
            />
          )}
        </div>

        <div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md mt-5"
            onClick={handleUploadImage}
          >
            Open File Drive
          </button>
          <button
            className="px-4 ml-2 py-2 bg-red-600 text-white rounded-md mt-5"
            onClick={uploadImage}
          >
            Upload profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputProfileImage;
