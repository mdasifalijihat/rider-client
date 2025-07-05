import React from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have successfully logged in with Google.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };
  return (
    <div>
      <div className="mt-6">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FcGoogle className="h-5 w-5" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
