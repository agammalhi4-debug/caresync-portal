"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParticipants();
  }, []);

  async function loadParticipants() {
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .order("first_name");

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setParticipants(data || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-black">
            👥 Participants
          </h1>

          <p className="mt-2 text-black">
            Manage your participants.
          </p>
        </div>

        <div className="flex gap-3">

          <Link href="/dashboard">
            <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white hover:bg-gray-700">
              ← Dashboard
            </button>
          </Link>

          <Link href="/participants/add">
            <button className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">
              + Add Participant
            </button>
          </Link>

        </div>

      </div>

      {loading ? (

        <p className="text-black">
          Loading participants...
        </p>

      ) : participants.length === 0 ? (

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-xl font-bold text-black">
            No participants
          </h2>

          <p className="mt-2 text-black">
            Click Add Participant to create your first participant.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2">

          {participants.map((participant) => (

            <Link
              key={participant.id}
              href={`/participants/${participant.id}`}
            >

              <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">

                <h2 className="text-2xl font-bold text-black">
                  {participant.first_name} {participant.last_name}
                </h2>

                <div className="mt-4 space-y-2 text-black">

                  <p>
                    <b>Date of Birth:</b>{" "}
                    {participant.date_of_birth || "Not added"}
                  </p>

                  <p>
                    <b>Phone:</b>{" "}
                    {participant.phone || "Not added"}
                  </p>

                  <p>
                    <b>Email:</b>{" "}
                    {participant.email || "Not added"}
                  </p>

                  <p>
                    <b>Address:</b>{" "}
                    {participant.address || "Not added"}
                  </p>

                </div>

                <p className="mt-5 font-semibold text-blue-600">
                  View Profile →
                </p>

              </div>

            </Link>

          ))}

        </div>

      )}

    </main>
  );
}