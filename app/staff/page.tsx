"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function StaffPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadStaff();
  }, []);


  async function loadStaff() {
    const { data, error } = await supabase
      .from("staff")
      .select("*")
      .order("full_name");


    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }


    setStaff(data || []);
    setLoading(false);
  }



  async function deleteStaff(id: string) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this staff member?"
    );


    if (!confirmDelete) return;


    const { error } = await supabase
      .from("staff")
      .delete()
      .eq("id", id);



    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }


    loadStaff();
  }




  return (
    <main className="min-h-screen bg-blue-50 p-6">


     <div className="mb-8 flex items-center justify-between">

  <div>
    <h1 className="text-4xl font-bold text-black">
      Staff
    </h1>

    <p className="mt-2 text-black">
      Manage your staff members.
    </p>
  </div>



  <div className="flex gap-3">


    <Link href="/dashboard">

      <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white hover:bg-gray-700">
        ← Dashboard
      </button>

    </Link>




    <Link href="/staff/add">

      <button className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">
        + Add Staff
      </button>

    </Link>


  </div>


</div>




      {loading ? (

        <p className="text-black">
          Loading staff...
        </p>


      ) : staff.length === 0 ? (

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-xl font-bold text-black">
            No staff members
          </h2>

          <p className="mt-2 text-black">
            Click Add Staff to create your first staff profile.
          </p>

        </div>


      ) : (


        <div className="grid gap-6 md:grid-cols-2">


          {staff.map((person) => (

            <div
              key={person.id}
              className="rounded-xl bg-white p-6 shadow"
            >


              <h2 className="text-2xl font-bold text-black">
                👤 {person.full_name}
              </h2>



              <div className="mt-4 space-y-2 text-black">

                <p>
                  <b>Date of Birth:</b>{" "}
                  {person.date_of_birth || "Not added"}
                </p>


                <p>
                  <b>Phone:</b>{" "}
                  {person.phone || "Not added"}
                </p>


                <p>
                  <b>Email:</b>{" "}
                  {person.email || "Not added"}
                </p>


                <p>
                  <b>Role:</b>{" "}
                  {person.role || "Not added"}
                </p>


                <p>
                  <b>Employment:</b>{" "}
                  {person.employment_type || "Not added"}
                </p>

              </div>




              <div className="mt-6 flex gap-3">


                <Link href={`/staff/${person.id}`}>

                  <button className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">
                    View Profile
                  </button>

                </Link>




                <button
                  onClick={() => deleteStaff(person.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                >
                  Delete
                </button>


              </div>


            </div>

          ))}


        </div>

      )}


    </main>
  );
}