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
      .order("full_name");

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setParticipants(data || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold text-black">
          👥 Participants
        </h1>

        <Link
          href="/participants/add"
          className="rounded-lg bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
        >
          + Add Participant
        </Link>

      </div>


      {loading ? (
        <p className="text-black">
          Loading participants...
        </p>
      ) : participants.length === 0 ? (

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-black">
            No participants found.
          </p>
        </div>

      ) : (

        <div className="grid gap-5">

          {participants.map((participant) => (

            <Link
              key={participant.id}
              href={`/participants/${participant.id}`}
            >

              <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg">

                <h2 className="text-2xl font-bold text-black">
                  {participant.full_name}
                </h2>


                <p className="mt-2 text-black">
                  NDIS Number: {participant.ndis_number}
                </p>


                <p className="text-black">
                  Phone: {participant.phone}
                </p>


                <p className="mt-3 text-blue-600 font-semibold">
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