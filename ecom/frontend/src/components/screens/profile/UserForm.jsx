import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import InputProfileImage from "./InputProfileImage";
import ProfleImageComponent from "./ProfleImageComponent";

const UserForm = () => {
  const { user, userProfileUpdate, resendEmailVerification } = useAuth();
  let logginUser = useSelector((state) => state.auth.user);
  console.log(user);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.data?.name,
      email: user?.data?.email,
      phone: user?.data?.phone,
      address: user?.data?.address,
    },
  });

  const updateUser = async (data) => {
    await userProfileUpdate(data);
  };

  useEffect(() => {
    setImage(user?.data?.image);
  }, []);

  return (
    <section className="w-9/12 p-4   rounded-md min-h-screen">
      <h2 className=" text-3xl text-black font-bold">Profile</h2>

      {!user?.data?.isVerify && (
        <button
          onClick={resendEmailVerification}
          className=" mt-5 px-4 py-3 bg-green-500 text-white rounded-md cursor-pointer"
        >
          Verify Your Account
        </button>
      )}
      {image ? (
        <ProfleImageComponent onDelete={setImage} data={image} />
      ) : (
        <>
          <InputProfileImage /> <hr />
        </>
      )}

      <form action="" onSubmit={handleSubmit(updateUser)}>
        <div className="w-full mt-8 ">
          <label htmlFor="name" className="text-[15px] text-black font-[400]">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            className="dark:bg-transparent  border rounded-md outline-none px-4 w-full mt-1 py-3  transition-colors duration-300 text-black"
          />
        </div>

        <div className="w-full mt-8 ">
          <label htmlFor="email" className="text-[15px] text-black font-[400]">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            className="dark:bg-transparent  border rounded-md outline-none px-4 w-full mt-1 py-3  transition-colors duration-300 text-black"
          />
        </div>

        <div className="w-full mt-8 ">
          <label htmlFor="phone" className="text-[15px] text-black font-[400]">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            type="text"
            name="phone"
            id="phone"
            placeholder="Your name"
            className="dark:bg-transparent  border rounded-md outline-none px-4 w-full mt-1 py-3  transition-colors duration-300 text-black"
          />
        </div>

        <div className="w-full mt-8 ">
          <label
            htmlFor="address"
            className="text-[15px] text-black font-[400]"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register("address")}
            type="text"
            name="address"
            id="address"
            placeholder="Your address"
            className="dark:bg-transparent  border rounded-md outline-none px-4 w-full mt-1 py-3  transition-colors duration-300 text-black"
          />
        </div>

        <button className="px-6 mt-8 py-2 w-1/2 bg-green-500 transition duration-300 rounded ">
          Update
        </button>
      </form>
    </section>
  );
};

export default UserForm;
