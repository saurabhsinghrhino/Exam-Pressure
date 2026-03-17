import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // You can pass success/error via navigate state
  const isSuccess = location.state?.success || false;
  const message =
    location.state?.message ||
    (isSuccess ? "Login Successful!" : "Login Failed!");

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Auto redirect after countdown
    if (countdown === 0) {
      navigate(isSuccess ? "/main" : "/login");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate, isSuccess]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {isSuccess ? (
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 animate-bounce">
              <span className="text-3xl text-green-600">✔</span>
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 animate-shake">
              <span className="text-3xl text-red-600">✖</span>
            </div>
          )}
        </div>

        {/* Heading */}
        <h2
          className={`text-2xl font-bold text-center mb-2 ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Welcome Back!" : "Oops!"}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">{message}</p>

        {/* Redirect Info */}
        <p className="text-sm text-gray-400 text-center mb-6">
          Redirecting in{" "}
          <span className="font-semibold text-black">{countdown}</span>{" "}
          seconds...
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {isSuccess ? (
            <>
              <button
                onClick={() => navigate("/main")}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Home
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Home
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style>
        {`
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginConfirmation;
