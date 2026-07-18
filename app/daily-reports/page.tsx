"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function DailyReportsPage() {


  const [reports, setReports] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadReports() {


      const { data, error } = await supabase

        .from("daily_reports")

        .select(`

          id,

          report_id,

          shift_date,

          status,

          report_submitted_at,


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

            start_time,

            finish_time

          )

        `)

        .order("created_at", {
          ascending: false
        });



      if (error) {

        console.log(error);

      } else {

        setReports(data || []);

      }


      setLoading(false);


    }


    loadReports();


  }, []);





  if (loading) {

    return (

      <main className="p-6">
        Loading reports...
      </main>

    );

  }




  return (

    <main className="min-h-screen bg-blue-50 p-6">


      <div className="mb-8 flex justify-between items-center">


        <h1 className="text-4xl font-bold text-black">
          📝 Daily Reports
        </h1>


        <Link href="/dashboard">

          <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white">
            ← Dashboard
          </button>

        </Link>


      </div>





      <div className="rounded-xl bg-white p-6 shadow">


        {reports.length === 0 && (

          <p className="text-black">
            No daily reports yet.
          </p>

        )}






        <div className="space-y-5">


        {reports.map((report)=>(


          <div

            key={report.id}

            className="rounded-xl border p-5"

          >



            <h2 className="text-2xl font-bold text-black">

              {report.participants?.first_name}

              {" "}

              {report.participants?.last_name}

            </h2>





            <p className="mt-2 text-black">

              📝 Report ID:
              {" "}
              {report.report_id}

            </p>





            <p className="text-black">

              📅 Date:
              {" "}
              {report.shift_date}

            </p>





            <p className="text-black">

              👤 Staff:
              {" "}
              {report.staff?.first_name}

              {" "}

              {report.staff?.last_name}

            </p>





            <p className="text-black">

              🕘 Shift:
              {" "}
              {report.shifts?.start_time}

              {" - "}

              {report.shifts?.finish_time}

            </p>





            <p className="mt-3 font-bold text-green-600">

              Status:
              {" "}
              {report.status}

            </p>





            <Link href={`/daily-reports/${report.id}`}>

              <button

                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"

              >

                View Report

              </button>


            </Link>




          </div>


        ))}



        </div>


      </div>


    </main>

  );

}