"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function StaffProfilePage() {

  const params = useParams();
  const router = useRouter();

  const id = params.id as string;


  const [staff, setStaff] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    if (id) {
      loadStaff();
    }

  }, [id]);





  async function loadStaff() {

    const { data, error } = await supabase
      .from("staff")
      .select("*")
      .eq("id", id)
      .single();



    if (error) {

      console.error(error);
      alert(error.message);
      return;

    }


    setStaff(data);
    setLoading(false);

  }






  async function deleteStaff() {


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



    alert("Staff member deleted");


    router.push("/staff");

  }





  if (loading) {

    return (

      <main className="min-h-screen bg-blue-50 p-6">

        <p className="text-black">
          Loading staff profile...
        </p>

      </main>

    );

  }





  if (!staff) {

    return (

      <main className="min-h-screen bg-blue-50 p-6">

        <p className="text-black">
          Staff member not found.
        </p>

      </main>

    );

  }






  return (

    <main className="min-h-screen bg-blue-50 p-6">



      <div className="mb-8 flex justify-between">


        <h1 className="text-4xl font-bold text-black">
          Staff Profile
        </h1>



        <Link href="/staff">

          <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white">
            Back
          </button>

        </Link>


      </div>






      <div className="max-w-xl rounded-xl bg-white p-6 shadow">



        <h2 className="mb-6 text-3xl font-bold text-black">
          👤 {staff.full_name}
        </h2>




        <div className="space-y-3 text-black">


          <p>
            <b>Date of Birth:</b>{" "}
            {staff.date_of_birth || "Not added"}
          </p>



          <p>
            <b>Phone:</b>{" "}
            {staff.phone || "Not added"}
          </p>



          <p>
            <b>Email:</b>{" "}
            {staff.email || "Not added"}
          </p>



          <p>
            <b>Role:</b>{" "}
            {staff.role || "Not added"}
          </p>



          <p>
            <b>Employment Type:</b>{" "}
            {staff.employment_type || "Not added"}
          </p>


        </div>






        <div className="mt-8 flex gap-3">


          <Link href={`/staff/edit/${staff.id}`}>

            <button className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white">
              ✏️ Edit Staff
            </button>

          </Link>





          <button
            onClick={deleteStaff}
            className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white"
          >
            🗑 Delete Staff
          </button>



        </div>



      </div>



    </main>

  );

}