"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateAccountPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function createAccount() {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please complete every field.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: "http://localhost:3000/login",
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Your account has been created.\n\nA verification email has been sent.\n\nPlease verify your email before logging in."
    );

    router.push("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-50 p-6">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-8 text-center text-4xl font-bold text-black">
          Create Account
        </h1>

        <label className="mb-2 block font-semibold text-black">
          First Name
        </label>

        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-black"
        />

        <label className="mb-2 block font-semibold text-black">
          Last Name
        </label>

        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-black"
        />

        <label className="mb-2 block font-semibold text-black">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-black"
        />

        <label className="mb-2 block font-semibold text-black">
          Mobile Number
        </label>

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-black"
        />

        <label className="mb-2 block font-semibold text-black">
          Password
        </label>

        <div className="mb-5 flex overflow-hidden rounded-lg border border-gray-300">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="flex-1 p-3 text-black outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-gray-100 px-4 font-semibold"
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>

        <label className="mb-2 block font-semibold text-black">
          Confirm Password
        </label>

        <div className="mb-8 flex overflow-hidden rounded-lg border border-gray-300">

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="flex-1 p-3 text-black outline-none"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="bg-gray-100 px-4 font-semibold"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>

        </div>

        <button
          onClick={createAccount}
          disabled={loading}
          className="mb-4 w-full rounded-xl bg-blue-600 p-4 text-lg font-bold text-white hover:bg-blue-700"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <Link href="/login">

          <button className="w-full rounded-xl bg-gray-700 p-4 text-lg font-bold text-white hover:bg-gray-800">
            Back to Login
          </button>

        </Link>

      </div>

    </main>
  );
}