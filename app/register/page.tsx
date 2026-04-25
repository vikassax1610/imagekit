"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }
    try {
      const response = await axios.post(
        "/api/auth/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.data.success) {
        throw new Error("failed to register");
      }
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-black to-black">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl flex flex-col gap-4 max-w-2xl w-full rounded-2xl px-8 py-6"
        >
          <h2 className="text-center text-white text-2xl font-bold">
            Register Now
          </h2>

          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-full px-4 py-2 backdrop-blur-md border border-white/20"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-full px-4 py-2 backdrop-blur-md border border-white/20"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-full px-4 py-2 backdrop-blur-md border border-white/20"
          />

          <button
            type="submit"
            className="bg-[#D1143E] hover:bg-red-600 transition-all text-white font-semibold py-2 rounded-lg shadow-lg"
          >
            Register
          </button>
          <p className="text-white text-center mt-4">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </>
  );
}
