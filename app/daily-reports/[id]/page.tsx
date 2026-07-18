"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DailyReportDetailsPage() {

  const params = useParams();

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadReport() {

      const { data, error } = await supabase
        .from("daily_reports")
        .select(`
          *,
          participants (
            first_name,
            last_name,
            participant_id
          ),
          staff (
            first_name,
            last_name,
            staff_id
          ),
          shifts (
            shift_id,
            shift_date,
            start_time,
            finish_time,
            status
          )
        `)
        .eq("id", params.id)
        .single();

      if (error) {
        console.log(error);
      } else {
        setReport(data);
      }

      setLoading(false);
    }

    loadReport();

  }, [params.id]);



  if (loading) {
    return (
      <main className="p-6">
        Loading report...
      </main>
    );
  }

  if (!report) {
    return (
      <main className="p-6">
        Report not found
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-blue-50 p-6">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold text-black">
          📝 Daily Report Details
        </h1>

        <div className="flex gap-3">

          <Link href={`/daily-reports/edit/${report.id}`}>
            <button className="rounded-xl bg-yellow-500 px-5 py-3 font-bold text-white hover:bg-yellow-600">
              ✏️ Edit Report
            </button>
          </Link>

          <Link href="/daily-reports">
            <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white hover:bg-gray-700">
              ← Back
            </button>
          </Link>

        </div>

      </div>



      <div className="space-y-6">

        <section className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-2xl font-bold text-black">
            Report Information
          </h2>

          <p className="text-black">
            <b>Report ID:</b> {report.report_id}
          </p>

          <p className="text-black">
            <b>Shift ID:</b> {report.shifts?.shift_id}
          </p>

          <p className="text-black">
            <b>Status:</b> {report.status}
          </p>

        </section>



        <section className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-2xl font-bold text-black">
            People
          </h2>

          <p className="text-black">
            <b>Participant:</b> {report.participants?.first_name} {report.participants?.last_name}
          </p>

          <p className="text-black">
            <b>Participant ID:</b> {report.participants?.participant_id}
          </p>

          <p className="text-black">
            <b>Staff Member:</b> {report.staff?.first_name} {report.staff?.last_name}
          </p>

          <p className="text-black">
            <b>Staff ID:</b> {report.staff?.staff_id}
          </p>

        </section>



        <section className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-2xl font-bold text-black">
            Shift Details
          </h2>

          <p className="text-black">
            <b>Date:</b> {report.shifts?.shift_date}
          </p>

          <p className="text-black">
            <b>Time:</b> {report.shifts?.start_time} - {report.shifts?.finish_time}
          </p>

          <p className="text-black">
            <b>Shift Status:</b> {report.shifts?.status}
          </p>

        </section>



        <section className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-2xl font-bold text-black">
            Care Notes
          </h2>

          <div className="space-y-4">

            <div>
              <h3 className="font-bold text-black">Personal Care</h3>
              <p>{report.personal_care || "No information recorded"}</p>
            </div>

            <div>
              <h3 className="font-bold text-black">Medication Given</h3>
              <p>{report.medication_given || "No information recorded"}</p>
            </div>

            <div>
              <h3 className="font-bold text-black">Meals & Fluids</h3>
              <p>{report.meals_and_fluids || "No information recorded"}</p>
            </div>

            <div>
              <h3 className="font-bold text-black">Community Access</h3>
              <p>{report.community_access || "No information recorded"}</p>
            </div>

            <div>
              <h3 className="font-bold text-black">Activities Completed</h3>
              <p>{report.activities_completed || "No information recorded"}</p>
            </div>

            <div>
              <h3 className="font-bold text-black">Goals Worked On</h3>
              <p>{report.goals_worked_on || "No information recorded"}</p>
            </div>

            <div>
              <h3 className="font-bold text-black">Behaviour & Mood</h3>
              <p>{report.behaviour_and_mood || "No information recorded"}</p>
            </div>

            <div>
              <h3 className="font-bold text-black">Health Observations</h3>
              <p>{report.health_observations || "No information recorded"}</p>
            </div>

            <div>
              <h3 className="font-bold text-black">Incidents</h3>
              <p>{report.incidents || "No information recorded"}</p>
            </div>

            <div>
              <h3 className="font-bold text-black">Additional Notes</h3>
              <p>{report.additional_notes || "No information recorded"}</p>
            </div>

          </div>

        </section>



        <section className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-2xl font-bold text-black">
            Record History
          </h2>

          <p className="text-black">
            <b>Started:</b> {report.report_started_at}
          </p>

          <p className="text-black">
            <b>Submitted:</b> {report.report_submitted_at}
          </p>

          <p className="text-black">
            <b>Last Edited:</b> {report.last_edited_at}
          </p>

          <p className="text-black">
            <b>Electronic Signature:</b> {report.electronic_signature}
          </p>

        </section>

      </div>

    </main>

  );

}