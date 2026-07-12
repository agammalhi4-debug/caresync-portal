"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddRosterPage() {

  const router = useRouter();

  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState({

    staff_id: "",
    day: "",
    start_time: "",
    end_time: "",
    status: "Active",
    shift_type: "",

  });



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
    "Morning",
    "Afternoon",
    "Night",
  ];





  useEffect(() => {

    loadStaff();

  }, []);





  async function loadStaff() {

    const { data, error } = await supabase
      .from("staff")
      .select("id, full_name")
      .order("full_name");


    if (error) {

      console.error(error);
      alert(error.message);
      return;

    }


    setStaff(data || []);

  }







  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  }







  async function saveShift() {


    if (!form.staff_id) {

      alert("Select a staff member");
      return;

    }


    if (!form.day) {

      alert("Select a day");
      return;

    }


    if (!form.shift_type) {

      alert("Select shift type");
      return;

    }


    if (!form.start_time || !form.end_time) {

      alert("Enter start and end time");
      return;

    }



    setLoading(true);





    const { error } = await supabase
      .from("roster")
      .insert({

        staff_id: form.staff_id,
        day: form.day,
        start_time: form.start_time,
        end_time: form.end_time,
        status: form.status,
        shift_type: form.shift_type,

      });





    if (error) {

      console.error(error);

      alert(error.message);

      setLoading(false);

      return;

    }





    alert("Shift added successfully");


    router.push("/roster");


  }









  return (

    <main className="min-h-screen bg-blue-50 p-6">


      <div className="mb-8 flex justify-between items-center">


        <h1 className="text-4xl font-bold text-black">
          Add Shift
        </h1>



        <div className="flex gap-3">


          <Link href="/dashboard">

            <button className="rounded-xl bg-gray-600 px-5 py-3 text-white font-bold">
              ← Dashboard
            </button>

          </Link>



          <Link href="/roster">

            <button className="rounded-xl bg-gray-500 px-5 py-3 text-white font-bold">
              ← Roster
            </button>

          </Link>


        </div>


      </div>








      <div className="max-w-xl bg-white rounded-xl shadow p-6">





        <label className="font-bold text-black">
          Staff Member
        </label>


        <select
          name="staff_id"
          value={form.staff_id}
          onChange={handleChange}
          className="w-full border p-3 rounded mt-2 mb-5 text-black"
        >

          <option value="">
            Select Staff
          </option>


          {staff.map((person) => (

            <option
              key={person.id}
              value={person.id}
            >

              {person.full_name}

            </option>

          ))}


        </select>







        <label className="font-bold text-black">
          Day
        </label>


        <select
          name="day"
          value={form.day}
          onChange={handleChange}
          className="w-full border p-3 rounded mt-2 mb-5 text-black"
        >

          <option value="">
            Select Day
          </option>


          {days.map((day) => (

            <option key={day} value={day}>
              {day}
            </option>

          ))}


        </select>







        <label className="font-bold text-black">
          Shift Type
        </label>


        <select
          name="shift_type"
          value={form.shift_type}
          onChange={handleChange}
          className="w-full border p-3 rounded mt-2 mb-5 text-black"
        >

          <option value="">
            Select Shift
          </option>


          {shiftTypes.map((type) => (

            <option key={type} value={type}>
              {type}
            </option>

          ))}


        </select>








        <label className="font-bold text-black">
          Start Time
        </label>


        <input

          type="time"

          name="start_time"

          value={form.start_time}

          onChange={handleChange}

          className="w-full border p-3 rounded mt-2 mb-5 text-black"

        />








        <label className="font-bold text-black">
          End Time
        </label>


        <input

          type="time"

          name="end_time"

          value={form.end_time}

          onChange={handleChange}

          className="w-full border p-3 rounded mt-2 mb-5 text-black"

        />








        <label className="font-bold text-black">
          Status
        </label>


        <select

          name="status"

          value={form.status}

          onChange={handleChange}

          className="w-full border p-3 rounded mt-2 mb-6 text-black"

        >

          <option value="Active">
            Active
          </option>


          <option value="Inactive">
            Inactive
          </option>


        </select>








        <button

          onClick={saveShift}

          disabled={loading}

          className="w-full bg-blue-600 text-white rounded-xl p-4 font-bold"

        >

          {loading ? "Saving..." : "Save Shift"}

        </button>



      </div>


    </main>

  );

}