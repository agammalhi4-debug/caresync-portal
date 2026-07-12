"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddParticipantPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    dob: "",
    ndis: "",
    phone: "",
    coordinator: "",
    gp: "",
    allergies: "",
    medical: "",
    behaviour: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  function updateField(field: string, value: string) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  async function saveParticipant() {
    try {
      const { data, error } = await supabase
        .from("participants")
        .insert([
          {
            full_name: form.name,
            dob: form.dob,
            ndis_number: form.ndis,
            phone: form.phone,
            support_coordinator: form.coordinator,
            gp_details: form.gp,
            allergies: form.allergies,
            medical_conditions: form.medical,
            behaviour_support: form.behaviour,
            emergency_contact_name: form.emergencyName,
            emergency_contact_phone: form.emergencyPhone,
          },
        ])
        .select();

      console.log("Participant Data:", data);
      console.log("Supabase Error:", error);

      if (error) {
        alert("Supabase Error: " + error.message);
        return;
      }

      alert("✅ Participant saved successfully!");

      router.push("/participants");

    } catch (err) {
      console.error("Fetch Error:", err);
      alert("❌ Fetch Error. Open F12 → Console and send me the red error.");
    }
  }

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-3xl font-bold text-black">
          ➕ Add Participant
        </h1>

        <label className="mb-2 block font-medium text-black">
          Full Name
        </label>
        <input
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          Date of Birth
        </label>
        <input
          type="date"
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.dob}
          onChange={(e) => updateField("dob", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          NDIS Number
        </label>
        <input
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.ndis}
          onChange={(e) => updateField("ndis", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          Phone Number
        </label>
        <input
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          Support Coordinator
        </label>
        <input
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.coordinator}
          onChange={(e) => updateField("coordinator", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          GP Details
        </label>
        <textarea
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.gp}
          onChange={(e) => updateField("gp", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          Allergies
        </label>
        <textarea
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.allergies}
          onChange={(e) => updateField("allergies", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          Medical Conditions
        </label>
        <textarea
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.medical}
          onChange={(e) => updateField("medical", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          Behaviour Support Plan
        </label>
        <textarea
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.behaviour}
          onChange={(e) => updateField("behaviour", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          Emergency Contact Name
        </label>
        <input
          className="mb-4 w-full rounded-lg border p-3 text-black"
          value={form.emergencyName}
          onChange={(e) => updateField("emergencyName", e.target.value)}
        />

        <label className="mb-2 block font-medium text-black">
          Emergency Contact Phone
        </label>
        <input
          className="mb-6 w-full rounded-lg border p-3 text-black"
          value={form.emergencyPhone}
          onChange={(e) => updateField("emergencyPhone", e.target.value)}
        />

        <button
          onClick={saveParticipant}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
        >
          Save Participant
        </button>

      </div>
    </main>
  );
}