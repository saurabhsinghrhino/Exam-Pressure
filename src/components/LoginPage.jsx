import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [mode, setMode] = useState("register");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function onAuthSuccess(user, token) {
    const normalizedUser = {
      email: user?.email || user?.id || "",
      username: user?.full_name || user?.username || "",
    };

    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);
  }

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    console.log("Submitting...");

    try {
      setLoading(true);

      const payload =
        mode === "register"
          ? { full_name: username, email, password }
          : { email, password };

      const res = await axios.post(
        `https://exam-pressure.onrender.com/auth/${mode}`,
        payload,
      );
      localStorage.setItem("payload", JSON.stringify(payload));

      console.log("Response:", res.data);

      if (mode === "login" && res.data?.access_token) {
        onAuthSuccess(res.data.user, res.data.access_token);

        navigate("/confirmation", {
          state: { success: true, message: "Login successful!" },
        });
      } else {
        navigate("/confirmation", {
          state: { success: true, message: "Account created!" },
        });
      }
    } catch (err) {
      console.error("Error:", err);

      let errorMessage = "Something went wrong";

      const detail = err.response?.data?.detail;

      if (detail) {
        if (typeof detail === "string") {
          errorMessage = detail;
        } else if (Array.isArray(detail)) {
          errorMessage = detail.map((e) => e.msg).join(", ");
        } else if (typeof detail === "object") {
          errorMessage = JSON.stringify(detail);
        }
      }

      navigate("/confirmation", {
        state: {
          success: false,
          message: errorMessage,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8">
          <span className="text-white">Exam</span>
          <span className="text-violet-400">-Pressure</span>
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 bg-white/5 rounded-full p-1">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                mode === tab ? "bg-violet-500/30 text-white" : "text-gray-400"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="space-y-5">
          {/* ✅ Username only for register */}
          {mode === "register" && (
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20"
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-violet-500/30 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}
