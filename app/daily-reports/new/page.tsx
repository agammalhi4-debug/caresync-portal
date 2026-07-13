"use client";

import Link from "next/link";

export default function NewDailyReportPage() {

  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold text-black">
          📝 New Daily Report
        </h1>

        <Link href="/daily-reports">
          <button className="rounded-xl bg-gray-600 px-6 py-3 font-bold text-white hover:bg-gray-700">
            ← Daily Reports
          </button>
        </Link>

      </div>


      <div className="rounded-xl bg-white p-6 shadow">

        <div className="grid gap-5 md:grid-cols-2">


          <div>
            <label className="mb-2 block font-bold text-black">
              Participant
            </label>

            <input
              type="text"
              placeholder="Participant name"
              className="w-full rounded-xl border p-3 text-black"
            />
          </div>


          <div>
            <label className="mb-2 block font-bold text-black">
              Staff Member
            </label>

            <input
              type="text"
              placeholder="Staff name"
              className="w-full rounded-xl border p-3 text-black"
            />
          </div>


          <div>
            <label className="mb-2 block font-bold text-black">
              Date
            </label>

            <input
              type="date"
              className="w-full rounded-xl border p-3 text-black"
            />
          </div>


          <div>
            <label className="mb-2 block font-bold text-black">
              Shift Type
            </label>

            <select className="w-full rounded-xl border p-3 text-black">

              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Overnight</option>

            </select>

          </div>


        </div>


        <div className="mt-5">

          <label className="mb-2 block font-bold text-black">
            Daily Notes
          </label>

          <textarea
            placeholder="Write daily report..."
            className="h-40 w-full rounded-xl border p-3 text-black"
          />

        </div>


        <button className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700">
          Save Report
        </button>


      </div>


    </main>
  );
}