"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <h1 className="mb-2 text-4xl font-bold text-black">
        Dashboard
      </h1>

      <p className="mb-8 text-black">
        Welcome to your NDIS Care Portal
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <Link href="/participants">
          <div className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-lg">
            <div className="mb-3 text-4xl">👥</div>

            <h2 className="text-2xl font-bold text-black">
              Participants
            </h2>

            <p className="mt-2 text-black">
              Manage participant profiles
            </p>
          </div>
        </Link>

        <Link href="/staff">
          <div className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-lg">
            <div className="mb-3 text-4xl">👨‍⚕️</div>

            <h2 className="text-2xl font-bold text-black">
              Staff
            </h2>

            <p className="mt-2 text-black">
              Manage staff profiles
            </p>
          </div>
        </Link>

        <Link href="/roster">
          <div className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-lg">
            <div className="mb-3 text-4xl">📅</div>

            <h2 className="text-2xl font-bold text-black">
              Staff Roster
            </h2>

            <p className="mt-2 text-black">
              Manage weekly staff shifts
            </p>
          </div>
        </Link>

        <Link href="/daily-reports">
          <div className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-lg">
            <div className="mb-3 text-4xl">📝</div>

            <h2 className="text-2xl font-bold text-black">
              Daily Reports
            </h2>

            <p className="mt-2 text-black">
              View and complete client daily reports
            </p>
          </div>
        </Link>

        <Link href="/medication">
          <div className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-lg">
            <div className="mb-3 text-4xl">💊</div>

            <h2 className="text-2xl font-bold text-black">
              Medication
            </h2>

            <p className="mt-2 text-black">
              Manage medication information
            </p>
          </div>
        </Link>

        <Link href="/incidents">
          <div className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-lg">
            <div className="mb-3 text-4xl">⚠️</div>

            <h2 className="text-2xl font-bold text-black">
              Incident Reports
            </h2>

            <p className="mt-2 text-black">
              Record and review incidents
            </p>
          </div>
        </Link>

      </div>

    </main>
  );
}