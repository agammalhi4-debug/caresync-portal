"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditShiftPage() {

  const params = useParams();

  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold text-black">
          Edit Shift
        </h1>


        <div className="flex gap-3">

          <Link href="/roster">
            <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white">
              ← Roster
            </button>
          </Link>


          <Link href="/dashboard">
            <button className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">
              ← Dashboard
            </button>
          </Link>

        </div>

      </div>


      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="text-2xl font-bold text-black">
          Edit Shift ID
        </h2>


        <p className="mt-2 text-black">
          {params.id}
        </p>


      </div>


    </main>
  );
}