import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getUserApi, updateUserApi } from "../api/authApi";

const Profile = () => {
  // Fetch user data
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
  });

  const { register, handleSubmit, setValue } = useForm();
  // Set form data when API data is fetched
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
    }
  }, [userData, setValue]);

  // Mutation for updating user data
  const { mutate } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    mutate(data);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Profile Display Section */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={"https://randomuser.me/api/portraits/men/75.jpg"}
          alt="UserImage"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{userData?.name}</h2>
          <p className="text-lg text-gray-600">{userData?.email}</p>
        </div>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

        {/* Name Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password_confirmation"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            {...register("password_confirmation")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
