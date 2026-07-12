"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function updatePassword() {

    if (!password || !confirmPassword) {
      alert("Complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password updated successfully.");

    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-5">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-8 text-center text-4xl font-bold text-black">
          Reset Password
        </h1>

        <label className="mb-2 block font-semibold text-black">
          New Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="mb-5 w-full rounded-lg border p-3 text-black"
        />

        <label className="mb-2 block font-semibold text-black">
          Confirm Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border p-3 text-black"
        />

        <button
          onClick={updatePassword}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 font-bold text-white hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>

    </main>
  );
}