"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function StaffShiftsPage() {
  const [loading, setLoading] = useState(true);
  const [shifts, setShifts] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    loadShifts();
  }, []);

  async function loadShifts() {
    setLoading(true);

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
      .order("shift_date", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setShifts(data || []);
    setLoading(false);
  }

  function getDay(date: string) {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-AU", {
      weekday: "long",
    });
  }

  function periodBadge(period: string) {
    switch (period) {
      case "Morning":
        return "bg-blue-100 text-blue-700";

      case "Afternoon":
        return "bg-orange-100 text-orange-700";

      case "Night":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function statusBadge(status: string) {
    switch (status) {
      case "Scheduled":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-gray-200 text-gray-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  const filteredShifts = useMemo(() => {
    let data = [...shifts];

    if (search) {
      const value = search.toLowerCase();

      data = data.filter((shift) => {
        const participant =
          `${shift.participants?.first_name || ""} ${shift.participants?.last_name || ""}`.toLowerCase();

        const staff =
          `${shift.staff?.first_name || ""} ${shift.staff?.last_name || ""}`.toLowerCase();

        return (
          participant.includes(value) ||
          staff.includes(value) ||
          (shift.support_type || "")
            .toLowerCase()
            .includes(value)
        );
      });
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (shift) => shift.status === statusFilter
      );
    }

    if (periodFilter !== "All") {
      data = data.filter(
        (shift) =>
          shift.shift_period === periodFilter
      );
    }

    switch (sortBy) {
      case "Oldest":
        data.sort(
          (a, b) =>
            new Date(a.shift_date).getTime() -
            new Date(b.shift_date).getTime()
        );
        break;

      case "Newest":
      default:
        data.sort(
          (a, b) =>
            new Date(b.shift_date).getTime() -
            new Date(a.shift_date).getTime()
        );
        break;
    }

    return data;
  }, [
    shifts,
    search,
    statusFilter,
    periodFilter,
    sortBy,
  ]);

  const total = filteredShifts.length;

  const morning = filteredShifts.filter(
    (x) => x.shift_period === "Morning"
  ).length;

  const afternoon = filteredShifts.filter(
    (x) => x.shift_period === "Afternoon"
  ).length;

  const night = filteredShifts.filter(
    (x) => x.shift_period === "Night"
  ).length;
    if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold">Loading shifts...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <div>
            <h1 className="text-4xl font-bold text-black">
              📅 Staff Roster
            </h1>

            <p className="mt-1 text-gray-600">
              Manage all participant shifts
            </p>
          </div>

          <div className="flex gap-3">

            <Link href="/dashboard">
              <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white hover:bg-gray-700">
                ← Dashboard
              </button>
            </Link>

            <Link href="/shifts/create">
              <button className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">
                + Create Shift
              </button>
            </Link>

          </div>

        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total</p>
            <h2 className="text-3xl font-bold">{total}</h2>
          </div>

          <div className="rounded-xl bg-blue-50 p-5 shadow">
            <p className="text-sm text-blue-600">🟦 Morning</p>
            <h2 className="text-3xl font-bold">{morning}</h2>
          </div>

          <div className="rounded-xl bg-orange-50 p-5 shadow">
            <p className="text-sm text-orange-600">🟧 Afternoon</p>
            <h2 className="text-3xl font-bold">{afternoon}</h2>
          </div>

          <div className="rounded-xl bg-purple-50 p-5 shadow">
            <p className="text-sm text-purple-600">🟪 Night</p>
            <h2 className="text-3xl font-bold">{night}</h2>
          </div>

          <div className="rounded-xl bg-green-50 p-5 shadow">
            <p className="text-sm text-green-600">🟢 Scheduled</p>
            <h2 className="text-3xl font-bold">
              {filteredShifts.filter(s => s.status === "Scheduled").length}
            </h2>
          </div>

          <div className="rounded-xl bg-blue-50 p-5 shadow">
            <p className="text-sm text-blue-600">🔵 In Progress</p>
            <h2 className="text-3xl font-bold">
              {filteredShifts.filter(s => s.status === "In Progress").length}
            </h2>
          </div>

          <div className="rounded-xl bg-gray-100 p-5 shadow">
            <p className="text-sm text-gray-600">✅ Completed</p>
            <h2 className="text-3xl font-bold">
              {filteredShifts.filter(s => s.status === "Completed").length}
            </h2>
          </div>

          <div className="rounded-xl bg-red-50 p-5 shadow">
            <p className="text-sm text-red-600">🔴 Cancelled</p>
            <h2 className="text-3xl font-bold">
              {filteredShifts.filter(s => s.status === "Cancelled").length}
            </h2>
          </div>

        </div>

        <div className="mb-6 rounded-xl bg-white p-5 shadow">

          <div className="grid gap-4 md:grid-cols-4">

            <input
              placeholder="🔍 Search participant, staff or support..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border p-3 text-black"
            />

            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="rounded-xl border p-3 text-black"
            >
              <option value="All">All Periods</option>
              <option value="Morning">🟦 Morning</option>
              <option value="Afternoon">🟧 Afternoon</option>
              <option value="Night">🟪 Night</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border p-3 text-black"
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border p-3 text-black"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>

          </div>

        </div>
                <div className="overflow-hidden rounded-xl bg-white shadow">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-100">

                <tr className="text-left text-sm uppercase text-gray-600">

                  <th className="px-4 py-4">Day</th>

                  <th className="px-4 py-4">Date</th>

                  <th className="px-4 py-4">Participant</th>

                  <th className="px-4 py-4">Staff</th>

                  <th className="px-4 py-4">Period</th>

                  <th className="px-4 py-4">Time</th>

                  <th className="px-4 py-4">Support</th>

                  <th className="px-4 py-4">Status</th>

                  <th className="px-4 py-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredShifts.length === 0 ? (

                  <tr>

                    <td
                      colSpan={9}
                      className="py-12 text-center text-gray-500"
                    >

                      No shifts found.

                    </td>

                  </tr>

                ) : (

                  filteredShifts.map((shift) => (

                    <tr
                      key={shift.id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="px-4 py-4 font-semibold text-black">

                        {getDay(shift.shift_date)}

                      </td>

                      <td className="px-4 py-4 text-black">

                        {new Date(
                          shift.shift_date
                        ).toLocaleDateString("en-AU")}

                      </td>

                      <td className="px-4 py-4 font-medium text-black">

                        {shift.participants?.first_name}{" "}
                        {shift.participants?.last_name}

                      </td>

                      <td className="px-4 py-4 text-black">

                        {shift.staff?.first_name}{" "}
                        {shift.staff?.last_name}

                      </td>

                      <td className="px-4 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-bold ${periodBadge(
                            shift.shift_period
                          )}`}
                        >

                          {shift.shift_period === "Morning" &&
                            "🟦 Morning"}

                          {shift.shift_period === "Afternoon" &&
                            "🟧 Afternoon"}

                          {shift.shift_period === "Night" &&
                            "🟪 Night"}

                        </span>

                      </td>

                      <td className="px-4 py-4 text-black">

                        {shift.start_time}
                        {" - "}
                        {shift.finish_time}

                      </td>

                      <td className="px-4 py-4 text-black">

                        {shift.support_type || "-"}

                      </td>

                      <td className="px-4 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-bold ${statusBadge(
                            shift.status
                          )}`}
                        >

                          {shift.status}

                        </span>

                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">

                          <Link href={`/shifts/${shift.id}`}>
                            <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white hover:bg-blue-700">
                              👁 View
                            </button>
                          </Link>

                          <Link href={`/shifts/edit/${shift.id}`}>
                            <button className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-bold text-white hover:bg-yellow-600">
                              ✏ Edit
                            </button>
                          </Link>

                          <Link href={`/daily-reports/new?shift=${shift.id}`}>
                            <button className="rounded-lg bg-green-600 px-3 py-2 text-sm font-bold text-white hover:bg-green-700">
                              📝 Report
                            </button>
                          </Link>

                        </div>
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>

  );

}
