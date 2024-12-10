import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

// zod schema
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(1, "Confirm password is required")
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

const Signup = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: registerApi,
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

  // send data
  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.confirmPassword);

    mutate(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        {error && (
          <p className={"text-red-600 text-center"}>
            {error?.response?.data?.message}
          </p>
        )}

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200`}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

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

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200`}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isPending}
          type="submit"
          className="disabled:bg-slate-500 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
