"use client";

import Link from "next/link";

export default function DailyReportsPage() {
  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-black">
            📝 Daily Reports
          </h1>

          <p className="mt-2 text-black">
            View, create and manage participant daily reports.
          </p>
        </div>

        <div className="flex gap-3">

          <Link href="/dashboard">
            <button className="rounded-xl bg-gray-600 px-6 py-3 font-bold text-white hover:bg-gray-700">
              ← Dashboard
            </button>
          </Link>

          <Link href="/daily-reports/new">
            <button className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">
              + New Report
            </button>
          </Link>

        </div>

      </div>

      <div className="mb-6 flex gap-4">

        <input
          type="text"
          placeholder="Search reports..."
          className="flex-1 rounded-xl border border-gray-300 p-3 text-black"
        />

        <input
          type="date"
          className="rounded-xl border border-gray-300 p-3 text-black"
        />

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left text-black">
                Date
              </th>

              <th className="p-4 text-left text-black">
                Participant
              </th>

              <th className="p-4 text-left text-black">
                Staff Member
              </th>

              <th className="p-4 text-left text-black">
                Shift
              </th>

              <th className="p-4 text-left text-black">
                Status
              </th>

              <th className="p-4 text-left text-black">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td
                colSpan={6}
                className="p-10 text-center text-gray-500"
              >
                No daily reports found.
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}