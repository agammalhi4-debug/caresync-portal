"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ViewShiftPage() {
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [shift, setShift] = useState<any>(null);

  useEffect(() => {
    loadShift();
  }, []);

  async function loadShift() {
    const { data, error } = await supabase
      .from("shifts")
      .select(`
        *,
        participants!shifts_participant_id_fkey(
          first_name,
          last_name
        ),
        staff!shifts_staff_id_fkey(
          first_name,
          last_name
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setShift(data);
    setLoading(false);
  }

  function statusColour(status: string) {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";

      case "In Progress":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-gray-200 text-gray-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  function periodBadge(period: string) {
    switch (period) {
      case "Morning":
        return "🟦 Morning";

      case "Afternoon":
        return "🟧 Afternoon";

      case "Night":
        return "🟪 Night";

      default:
        return period;
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold">
          Loading Shift...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-4xl font-bold text-black">
            📅 Shift Details
          </h1>

          <Link href="/shifts">
            <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white hover:bg-gray-700">
              ← Back
            </button>
          </Link>

        </div>

        <div className="rounded-xl bg-white p-8 shadow">
                  <div className="grid gap-6 md:grid-cols-2">

            <div>
              <h2 className="mb-2 text-lg font-bold text-gray-700">
                Participant
              </h2>

              <p className="text-2xl font-bold text-black">
                {shift.participants?.first_name}{" "}
                {shift.participants?.last_name}
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-gray-700">
                Staff Member
              </h2>

              <p className="text-2xl font-bold text-black">
                {shift.staff?.first_name}{" "}
                {shift.staff?.last_name}
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-gray-700">
                Shift Date
              </h2>

              <p className="text-xl text-black">
                {shift.shift_date}
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-gray-700">
                Shift Time
              </h2>

              <p className="text-xl text-black">
                {shift.start_time} - {shift.finish_time}
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-gray-700">
                Shift Period
              </h2>

              <p className="text-xl font-bold">
                {periodBadge(shift.shift_period)}
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-gray-700">
                Status
              </h2>

              <span
                className={`rounded-full px-4 py-2 font-bold ${statusColour(
                  shift.status
                )}`}
              >
                {shift.status}
              </span>
            </div>

            <div className="md:col-span-2">
              <h2 className="mb-2 text-lg font-bold text-gray-700">
                Support Type
              </h2>

              <p className="rounded-lg bg-gray-50 p-4 text-black">
                {shift.support_type || "Not specified"}
              </p>
            </div>

            <div className="md:col-span-2">
              <h2 className="mb-2 text-lg font-bold text-gray-700">
                Shift Notes
              </h2>

              <div className="min-h-[120px] rounded-lg bg-gray-50 p-4 text-black whitespace-pre-wrap">
                {shift.shift_notes || "No notes"}
              </div>
            </div>

          </div>

          <div className="mt-8 flex flex-wrap gap-4">
                      <Link href={`/shifts/edit/${shift.id}`}>
              <button className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-white hover:bg-yellow-600">
                ✏️ Edit Shift
              </button>
            </Link>

            <Link href={`/daily-reports/new?shift=${shift.id}`}>
              <button className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700">
                📝 Daily Report
              </button>
            </Link>

            <Link href="/shifts">
              <button className="rounded-xl bg-gray-600 px-6 py-3 font-bold text-white hover:bg-gray-700">
                📅 All Shifts
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
        