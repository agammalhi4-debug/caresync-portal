"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function StaffPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaff();
  }, []);

async function loadStaff() {
  const { data, error } = await supabase
    .from("staff")
    .select(`
      id,
      staff_id,
      first_name,
      last_name,
      email,
      phone,
      role,
      status
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    alert(error.message);
    setLoading(false);
    return;
  }
console.log(data);
  setStaff(data || []);
  setLoading(false);
}

  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-black">
            👨‍⚕️ Staff
          </h1>

          <p className="mt-2 text-black">
            Manage your staff members.
          </p>
        </div>

        <div className="flex gap-3">

          <Link href="/dashboard">
            <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white hover:bg-gray-700">
              ← Dashboard
            </button>
          </Link>

          <Link href="/staff/add">
            <button className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">
              + Add Staff
            </button>
          </Link>

        </div>

      </div>

      {loading ? (

        <p className="text-black">
          Loading staff...
        </p>

      ) : staff.length === 0 ? (

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-xl font-bold text-black">
            No staff members
          </h2>

          <p className="mt-2 text-black">
            Click Add Staff to create your first staff member.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2">

          {staff.map((person) => (

            <Link
              key={person.id}
              href={`/staff/${person.id}`}
            >

              <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">

<h2 className="text-2xl font-bold text-black">
  {person.first_name ?? ""} {person.last_name ?? ""}
</h2>

<div className="mt-4 space-y-2 text-black">

  <p>
    <b>Staff ID:</b> {person.staff_id}
  </p>

  <p>
    <b>Role:</b> {person.role}
  </p>

  <p>
    <b>Status:</b> {person.status}
  </p>

  <p>
    <b>Phone:</b> {person.phone || "-"}
  </p>

  <p>
    <b>Email:</b> {person.email || "-"}
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