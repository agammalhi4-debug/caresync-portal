"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddParticipantPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    participantId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    medicalCondition: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function saveParticipant() {
    const { error } = await supabase
      .from("participants")
      .insert([
        {
          participant_id: form.participantId,
          first_name: form.firstName,
          last_name: form.lastName,
          date_of_birth: form.dateOfBirth || null,
          email: form.email,
          mobile: form.mobile,
          medical_condition: form.medicalCondition,
        },
      ]);

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    alert("✅ Participant saved!");

    router.push("/participants");
  }

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-3xl font-bold text-black">
          ➕ Add Participant
        </h1>

        <label className="mb-2 block font-medium text-black">
          Participant ID
        </label>

        <input
          value={form.participantId}
          onChange={(e) =>
            updateField("participantId", e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3 text-black"
        />

        <label className="mb-2 block font-medium text-black">
          First Name
        </label>

        <input
          value={form.firstName}
          onChange={(e) =>
            updateField("firstName", e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3 text-black"
        />

        <label className="mb-2 block font-medium text-black">
          Last Name
        </label>

        <input
          value={form.lastName}
          onChange={(e) =>
            updateField("lastName", e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3 text-black"
        />

        <label className="mb-2 block font-medium text-black">
          Date of Birth
        </label>

        <input
          type="date"
          value={form.dateOfBirth}
          onChange={(e) =>
            updateField("dateOfBirth", e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3 text-black"
        />

        <label className="mb-2 block font-medium text-black">
          Email
        </label>

        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            updateField("email", e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3 text-black"
        />

        <label className="mb-2 block font-medium text-black">
          Mobile
        </label>

        <input
          value={form.mobile}
          onChange={(e) =>
            updateField("mobile", e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3 text-black"
        />

        <label className="mb-2 block font-medium text-black">
          Medical Condition
        </label>

        <textarea
          rows={4}
          value={form.medicalCondition}
          onChange={(e) =>
            updateField("medicalCondition", e.target.value)
          }
          className="mb-6 w-full rounded-lg border p-3 text-black"
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