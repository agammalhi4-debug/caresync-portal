"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AddStaffPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState({
    full_name: "",
    date_of_birth: "",
    phone: "",
    email: "",
    role: "",
    employment_type: "",
  });



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }




  async function saveStaff() {


    if (!form.full_name) {

      alert("Please enter staff name");
      return;

    }


    setLoading(true);



    const { error } = await supabase
      .from("staff")
      .insert({
        full_name: form.full_name,
        date_of_birth: form.date_of_birth || null,
        phone: form.phone || null,
        email: form.email || null,
        role: form.role || null,
        employment_type: form.employment_type || null,
      });



    if (error) {

      console.error(error);
      alert(error.message);

      setLoading(false);
      return;

    }



    alert("Staff member added successfully");

    router.push("/staff");

  }




  return (

    <main className="min-h-screen bg-blue-50 p-6">


      <div className="mb-8 flex items-center justify-between">


        <h1 className="text-4xl font-bold text-black">
          Add Staff
        </h1>


        <Link href="/staff">

          <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white hover:bg-gray-700">
            Back
          </button>

        </Link>


      </div>





      <div className="max-w-xl rounded-xl bg-white p-6 shadow">



        <label className="font-bold text-black">
          Full Name
        </label>

        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          className="mb-4 mt-2 w-full rounded-lg border p-3 text-black"
          placeholder="Enter full name"
        />





        <label className="font-bold text-black">
          Date of Birth
        </label>

        <input
          type="date"
          name="date_of_birth"
          value={form.date_of_birth}
          onChange={handleChange}
          className="mb-4 mt-2 w-full rounded-lg border p-3 text-black"
        />





        <label className="font-bold text-black">
          Phone Number
        </label>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="mb-4 mt-2 w-full rounded-lg border p-3 text-black"
          placeholder="Phone number"
        />





        <label className="font-bold text-black">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 mt-2 w-full rounded-lg border p-3 text-black"
          placeholder="Email address"
        />





        <label className="font-bold text-black">
          Role
        </label>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="mb-4 mt-2 w-full rounded-lg border p-3 text-black"
        >

          <option value="">
            Select Role
          </option>

          <option value="Support Worker">
            Support Worker
          </option>

          <option value="Team Leader">
            Team Leader
          </option>

          <option value="Nurse">
            Nurse
          </option>

          <option value="Other">
            Other
          </option>

        </select>





        <label className="font-bold text-black">
          Employment Type
        </label>

        <select
          name="employment_type"
          value={form.employment_type}
          onChange={handleChange}
          className="mb-6 mt-2 w-full rounded-lg border p-3 text-black"
        >

          <option value="">
            Select Employment Type
          </option>

          <option value="Full Time">
            Full Time
          </option>

          <option value="Part Time">
            Part Time
          </option>

          <option value="Casual">
            Casual
          </option>

        </select>





        <button
          onClick={saveStaff}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 p-4 font-bold text-white hover:bg-blue-700"
        >

          {loading ? "Saving..." : "Save Staff"}

        </button>



      </div>


    </main>

  );

}