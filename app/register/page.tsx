"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to register"
        );
      }

      router.push("/login");
    } catch (error: any) {
      console.error("Error during registration:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl flex flex-col gap-4 max-w-md w-full rounded-2xl px-8 py-6"
      >
        <h2 className="text-center text-white text-2xl font-bold">
          Register Now
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-full px-4 py-2 border border-white/20"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-full px-4 py-2 border border-white/20"
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          required
          className="bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-full px-4 py-2 border border-white/20"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#D1143E] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white font-semibold py-2 rounded-lg shadow-lg"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-white text-center mt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}