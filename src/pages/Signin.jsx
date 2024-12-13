import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

const signupSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

const Signin = () => {
  const navigate = useNavigate();

  // send data
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Registration failed", error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // form submission
  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("password", data.password);
    formData.append("email", data.email);

    mutate(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {error && (
          <p className={"text-red-600 text-center"}>
            {error?.response?.data?.message}
          </p>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <Link
          className="text-blue-700 cursor-pointer mb-3 block "
          to={"/signup"}
        >
          Create new account
        </Link>
        {/* Submit Button */}
        <button
          disabled={isPending}
          type="submit"
          className="disabled:bg-slate-500 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signin;
