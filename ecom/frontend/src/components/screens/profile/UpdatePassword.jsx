import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const UpdatePassword = () => {
  const { userPasswordUpdate } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const updatePassword = async (data) => {
    console.log(data);
    await userPasswordUpdate(data);
  };

  return (
    <section className="w-9/12 p-4   rounded-md min-h-screen">
      <h2 className=" text-3xl text-black font-bold">Profile</h2>

      <form action="" onSubmit={handleSubmit(updatePassword)}>
        <div className="w-full mt-8 ">
          <label
            htmlFor="oldPassword"
            className="text-[15px] text-black font-[400]"
          >
            Old Password <span className="text-red-500">*</span>
          </label>
          <input
            {...register("oldPassword")}
            type="text"
            name="oldPassword"
            id="oldPassword"
            placeholder="Your Old Password"
            className="dark:bg-transparent  border rounded-md outline-none px-4 w-full mt-1 py-3  transition-colors duration-300 text-black"
          />
        </div>

        <div className="w-full mt-8 ">
          <label
            htmlFor="newPassword"
            className="text-[15px] text-black font-[400]"
          >
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            {...register("newPassword")}
            type="text"
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            className="dark:bg-transparent  border rounded-md outline-none px-4 w-full mt-1 py-3  transition-colors duration-300 text-black"
          />
        </div>

        <div className="w-full mt-8 ">
          <label
            htmlFor="confirmNewPassword"
            className="text-[15px] text-black font-[400]"
          >
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <input
            {...register("confirmNewPassword")}
            type="text"
            name="confirmNewPassword"
            id="confirmNewPassword"
            placeholder="Confirm New Password"
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

export default UpdatePassword;
