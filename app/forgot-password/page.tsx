"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendReset() {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "A password reset email has been sent.\n\nPlease check your inbox."
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-5">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-8 text-center text-4xl font-bold text-black">
          Forgot Password
        </h1>

        <label className="mb-2 block font-semibold text-black">
          Email Address
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="mb-6 w-full rounded-lg border p-3 text-black"
        />

        <button
          onClick={sendReset}
          disabled={loading}
          className="mb-4 w-full rounded-lg bg-blue-600 p-3 font-bold text-white hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>

        <Link href="/login">
          <button className="w-full rounded-lg bg-gray-700 p-3 font-bold text-white hover:bg-gray-800">
            Back to Login
          </button>
        </Link>

      </div>

    </main>
  );
}