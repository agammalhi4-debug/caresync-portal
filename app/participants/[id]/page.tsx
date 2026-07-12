"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ParticipantProfile() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [participant, setParticipant] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadParticipant();
    }
  }, [id]);


  async function loadParticipant() {
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setParticipant(data);
  }



  async function deleteParticipant() {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this participant?"
    );

    if (!confirmDelete) {
      return;
    }


    const { data, error } = await supabase
      .from("participants")
      .delete()
      .eq("id", id)
      .select();


    console.log("Delete result:", data);
    console.log("Delete error:", error);


    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }


    if (!data || data.length === 0) {
      alert("Nothing was deleted. Check Supabase delete permissions.");
      return;
    }


    alert("Participant deleted successfully");

    router.push("/participants");
  }



  if (!participant) {
    return (
      <main className="min-h-screen bg-blue-50 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-black">
          Loading participant...
        </h1>
      </main>
    );
  }



  return (

    <main className="min-h-screen bg-blue-50 p-6">


      <div className="mb-8 flex justify-between items-center">

        <h1 className="text-4xl font-bold text-black">
          👤 {participant.full_name}
        </h1>


        <button
          onClick={deleteParticipant}
          className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
        >
          🗑️ Delete Participant
        </button>

      </div>



      <div className="grid gap-6 md:grid-cols-2">


        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-2xl font-bold text-black mb-4">
            Personal Details
          </h2>

          <p className="text-black">
            <b>Date of Birth:</b> {participant.dob}
          </p>

          <p className="text-black">
            <b>NDIS Number:</b> {participant.ndis_number}
          </p>

          <p className="text-black">
            <b>Phone:</b> {participant.phone}
          </p>

        </div>



        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-2xl font-bold text-black mb-4">
            Medical Information
          </h2>

          <p className="text-black">
            <b>GP:</b> {participant.gp_details}
          </p>

          <p className="text-black">
            <b>Allergies:</b> {participant.allergies}
          </p>

          <p className="text-black">
            <b>Medical Conditions:</b> {participant.medical_conditions}
          </p>

          <p className="text-black">
            <b>Behaviour Support:</b> {participant.behaviour_support}
          </p>

        </div>



        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-2xl font-bold text-black mb-4">
            Support Information
          </h2>

          <p className="text-black">
            <b>Support Coordinator:</b> {participant.support_coordinator}
          </p>

        </div>



        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-2xl font-bold text-black mb-4">
            Emergency Contact
          </h2>

          <p className="text-black">
            <b>Name:</b> {participant.emergency_contact_name}
          </p>

          <p className="text-black">
            <b>Phone:</b> {participant.emergency_contact_phone}
          </p>

        </div>


      </div>



      <div className="mt-8 grid gap-4 md:grid-cols-4">


        <button className="rounded-xl bg-blue-600 p-4 font-bold text-white">
          📝 Daily Reports
        </button>


        <button className="rounded-xl bg-green-600 p-4 font-bold text-white">
          💊 Medication
        </button>


        <button className="rounded-xl bg-orange-500 p-4 font-bold text-white">
          📂 Documents
        </button>


        <button className="rounded-xl bg-red-600 p-4 font-bold text-white">
          ⚠️ Incidents
        </button>


      </div>


    </main>

  );
}