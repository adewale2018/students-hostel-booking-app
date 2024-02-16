import * as apiClient from "../api-clients";

import EyeClose from "../assets/eyeOpen.svg";
import EyeOpen from "../assets/eyeClose.svg";
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import { useState } from "react";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const mutation  = useMutation(apiClient.register, {
    onSuccess: (res) => {console.log("YOU have successfully registered...", res)},
    onError: (error: Error) => {
      // console.log(error.message)
    },
  });

  const handleFormSubmission = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={handleFormSubmission} className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Create an Account</h1>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 font-bold text-sm flex-1">
          First name:
          <input
            type="text"
            className="border rounded w-full p-2  font-normal"
            placeholder="First Name"
            {...register("firstName", {
              required: "First name is required",
              validate: (fieldValue) => {
                return (
                  fieldValue.trim().length > 0 ||
                  "Please enter valid first name"
                );
              },
            })}
          />
          {errors.firstName && (
            <span className="text-sm font-normal text-red-500">
              {errors.firstName?.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 font-bold text-sm flex-1">
          Last name:
          <input
            type="text"
            className="border rounded w-full p-2 font-normal"
            placeholder="Last Name"
            {...register("lastName", {
              required: "Last name is required",
              validate: (fieldValue) => {
                return (
                  fieldValue.trim().length > 0 || "Please enter valid last name"
                );
              },
            })}
          />
          {errors.lastName && (
            <span className="text-sm font-normal text-red-500">
              {errors.lastName?.message}
            </span>
          )}
        </label>
      </div>

      <label className="text-gray-700 font-bold text-sm flex-1">
        Email:
        <input
          type="email"
          className="border rounded w-full p-2 font-normal"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm font-normal">
            {errors.email?.message}
          </span>
        )}
      </label>

      <div className="relative">
        <div className="absolute flex right-4 mt-3 items-center ml-2 h-full cursor-pointer">
          <div
            className="px-1 block focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <img className="w-5" src={EyeClose} />
            ) : (
              <img className="w-5" src={EyeOpen} />
            )}
          </div>
        </div>
        <label className="text-gray-700 font-bold text-sm flex-1">
          Password:
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="border rounded w-full p-2 font-normal"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-normal">
              {errors.password?.message}
            </span>
          )}
        </label>
      </div>

      <div className="relative">
        <div className="absolute flex right-4 mt-3 items-center ml-2 h-full cursor-pointer">
          <div
            className="px-1 block focus:outline-none"
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? (
              <img className="w-5" src={EyeClose} />
            ) : (
              <img className="w-5" src={EyeOpen} />
            )}
          </div>
        </div>

        <label className="text-gray-700 font-bold text-sm flex-1">
          Confirm Password:
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            className="border rounded w-full p-2 font-normal"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Password does not match!";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm font-normal">
              {errors.confirmPassword?.message}
            </span>
          )}
        </label>
      </div>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-10 font-bold hover:bg-blue-500 text-xl rounded"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
