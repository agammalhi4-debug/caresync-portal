"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState("Staff Member");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin() {

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Incorrect email or password.");
      return;
    }


    const {
      data: { user },
    } = await supabase.auth.getUser();


    if (!user) {
      alert("Login failed.");
      return;
    }


    if (!user.email_confirmed_at) {

      await supabase.auth.signOut();

      alert(
        "Please verify your email before logging in."
      );

      return;
    }


    if (role === "Staff Member") {
      router.push("/dashboard");
    }

    else if (role === "Participant") {
      router.push("/participant-dashboard");
    }

    else if (role === "Family Member") {
      router.push("/family-dashboard");
    }

    else if (role === "Support Coordinator") {
      router.push("/coordinator-dashboard");
    }

    else if (role === "Allied Health Professional") {
      router.push("/health-dashboard");
    }

    else if (role === "Administrator") {
      router.push("/admin-dashboard");
    }

  }


  return (

    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-5">


      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">


        <h1 className="mb-6 text-center text-3xl font-bold text-black">
          CareSync Login
        </h1>



        <label className="mb-2 block font-medium text-black">
          Account Type
        </label>


        <select

          value={role}

          onChange={(e)=>setRole(e.target.value)}

          className="mb-4 w-full rounded-lg border p-3 text-black"

        >

          <option>
            Participant
          </option>

          <option>
            Family Member
          </option>

          <option>
            Staff Member
          </option>

          <option>
            Support Coordinator
          </option>

          <option>
            Allied Health Professional
          </option>

          <option>
            Administrator
          </option>


        </select>




        <label className="mb-2 block font-medium text-black">
          Email Address
        </label>


        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          className="mb-4 w-full rounded-lg border p-3 text-black"

        />





        <label className="mb-2 block font-medium text-black">
          Password
        </label>


        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          className="mb-6 w-full rounded-lg border p-3 text-black"

        />





        <button

          onClick={handleLogin}

          disabled={loading}

          className="w-full rounded-lg bg-blue-600 p-3 font-bold text-white hover:bg-blue-700"

        >

          {loading ? "Logging In..." : "Login"}

        </button>





        <Link href="/forgot-password">

          <button

            className="mt-4 w-full font-semibold text-blue-600 hover:underline"

          >

            Forgot Password?

          </button>

        </Link>



      </div>


    </main>

  );

}