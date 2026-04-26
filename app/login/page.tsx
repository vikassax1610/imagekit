"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (response?.error) {
      alert("Email and Password is invalid");
    } else {
      router.push("/");
    }
  };
  return (
    <>
      {" "}
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-black to-black">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl flex flex-col gap-4 max-w-2xl w-full rounded-2xl px-8 py-6"
        >
          <h2 className="text-center text-white text-2xl font-bold">
            Login Now
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

          <button
            type="submit"
            disabled={loading}
            className="bg-[#D1143E] hover:bg-red-600 transition-all text-white font-semibold py-2 rounded-lg shadow-lg"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          <p className="text-white text-center mt-4">
            Don`t have account{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              create one
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
