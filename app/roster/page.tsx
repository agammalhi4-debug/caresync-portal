"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RosterPage() {

  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];


  const shiftTypes = [
    {
      name: "Morning",
      icon: "🌅",
    },
    {
      name: "Afternoon",
      icon: "🌇",
    },
    {
      name: "Night",
      icon: "🌙",
    },
  ];



  useEffect(() => {
    loadRoster();
  }, []);




  async function loadRoster() {


    const { data, error } = await supabase
      .from("roster")
      .select(`
        *,
        staff (
          full_name,
          role
        )
      `)
      .order("day");



    if (error) {

      console.error(error);
      alert(error.message);
      return;

    }


    setShifts(data || []);
    setLoading(false);

  }






  async function deleteShift(id:string) {


    const confirmDelete = confirm(
      "Are you sure you want to delete this shift?"
    );


    if (!confirmDelete) return;



    const { error } = await supabase
      .from("roster")
      .delete()
      .eq("id", id);



    if (error) {

      console.error(error);
      alert(error.message);
      return;

    }


    loadRoster();

  }






  return (

    <main className="min-h-screen bg-blue-50 p-6">



      <div className="mb-8 flex justify-between items-center">


        <div>

          <h1 className="text-4xl font-bold text-black">
            Staff Roster
          </h1>


          <p className="mt-2 text-black">
            Weekly staff shifts
          </p>

        </div>





        <div className="flex gap-3">


          <Link href="/dashboard">

            <button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white">
              ← Dashboard
            </button>

          </Link>




          <Link href="/roster/add">

            <button className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">
              + Add Shift
            </button>

          </Link>


        </div>


      </div>







      {loading ? (

        <p className="text-black">
          Loading roster...
        </p>


      ) : (



        <div className="space-y-8">


          {days.map((day) => (


            <div
              key={day}
              className="rounded-xl bg-white p-6 shadow"
            >


              <h2 className="mb-6 text-3xl font-bold text-black">
                {day}
              </h2>





              {shiftTypes.map((type) => {


                const dayShifts = shifts.filter(
                  (shift) =>
                    shift.day === day &&
                    shift.shift_type === type.name
                );



                return (

                  <div
                    key={type.name}
                    className="mb-6"
                  >


                    <h3 className="mb-3 text-xl font-bold text-black">

                      {type.icon} {type.name}

                    </h3>





                    {dayShifts.length === 0 ? (

                      <p className="text-gray-600">
                        No shifts
                      </p>


                    ) : (


                      <div className="space-y-3">


                        {dayShifts.map((shift) => (


                          <div
                            key={shift.id}
                            className="rounded-lg border p-4"
                          >



                            <h4 className="text-xl font-bold text-black">

                              👤 {shift.staff?.full_name || "Unknown"}

                            </h4>




                            <p className="text-black">

                              Role: {shift.staff?.role || "Not added"}

                            </p>





                            <p className="text-black">

                              🕒 {shift.start_time} - {shift.end_time}

                            </p>





                            <p className="text-black">

                              Status:{" "}

                              {shift.status === "Active" ? (

                                <span className="font-bold text-green-600">
                                  🟢 Active
                                </span>

                              ) : (

                                <span className="font-bold text-red-600">
                                  🔴 Inactive
                                </span>

                              )}

                            </p>






                            <div className="mt-4 flex gap-3">


                              <Link href={`/roster/edit/${shift.id}`}>

                                <button className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white">
                                  Edit
                                </button>

                              </Link>





                              <button
                                onClick={() => deleteShift(shift.id)}
                                className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white"
                              >
                                Delete
                              </button>



                            </div>


                          </div>


                        ))}


                      </div>


                    )}


                  </div>


                );


              })}



            </div>


          ))}



        </div>


      )}



    </main>

  );

}