"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { createAuditLog } from "@/lib/createAuditLog";

export default function EditShiftPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [participants, setParticipants] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);

  const [participantId, setParticipantId] = useState("");
  const [staffId, setStaffId] = useState("");

  const [date, setDate] = useState("");

  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");

  const [shiftPeriod, setShiftPeriod] = useState("");

  const [supportType, setSupportType] = useState("");

  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState("Scheduled");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const participantsResult = await supabase
      .from("participants")
      .select("id, first_name, last_name")
      .order("first_name");

    const staffResult = await supabase
  .from("staff")
  .select("id, first_name, last_name")
  .order("first_name", {
    ascending: true
  });

    setParticipants(participantsResult.data || []);
    setStaff(staffResult.data || []);

    const { data, error } = await supabase
      .from("shifts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      router.push("/shifts");
      return;
    }

    setParticipantId(data.participant_id ?? "");
    setStaffId(data.staff_id ?? "");

    setDate(data.shift_date ?? "");

    setStartTime(data.start_time ?? "");
    setFinishTime(data.finish_time ?? "");

    setShiftPeriod(data.shift_period ?? "");

    setSupportType(data.support_type ?? "");

    setNotes(data.shift_notes ?? "");

    setStatus(data.status ?? "Scheduled");

    setLoading(false);
  }
    function getDayName(value: string) {
    if (!value) return "";

    return new Date(value).toLocaleDateString(
      "en-AU",
      {
        weekday: "long",
      }
    );
  }


  async function saveShift(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("shifts")
      .update({

        participant_id: participantId,

        staff_id: staffId,

        shift_date: date,

        start_time: startTime,

        finish_time: finishTime,

        shift_period: shiftPeriod,

        support_type: supportType,

        shift_notes: notes,

        status: status,

        updated_at:
          new Date().toISOString(),

      })
      .eq("id", id);


    if (error) {

      alert(error.message);

      setSaving(false);

      return;

    }


    await createAuditLog({

      staffId: staffId,

      action:
        "Updated Shift",

      recordType:
        "Shift",

      recordId:
        id,

      description:
        "Shift details were updated"

    });


    alert(
      "✅ Shift updated successfully"
    );


    router.push(
      "/shifts"
    );

  }



  async function deleteShift() {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this shift?"
      );


    if (!confirmDelete) return;



    const { error } =
      await supabase
        .from("shifts")
        .delete()
        .eq("id", id);



    if (error) {

      alert(error.message);

      return;

    }



    await createAuditLog({

      staffId: staffId,

      action:
        "Deleted Shift",

      recordType:
        "Shift",

      recordId:
        id,

      description:
        "Shift was deleted"

    });



    alert(
      "🗑 Shift deleted"
    );


    router.push(
      "/shifts"
    );

  }



  if (loading) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-gray-100">

        <h1 className="text-2xl font-bold text-black">
          Loading shift...
        </h1>

      </main>

    );

  }
    return (

    <main className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-3xl">


        <div className="mb-8 flex items-center justify-between">


          <div>

            <h1 className="text-4xl font-bold text-black">
              ✏️ Edit Shift
            </h1>


            <p className="mt-2 text-gray-600">
              {getDayName(date)}
            </p>


          </div>



          <Link href="/shifts">

            <button
              type="button"
              className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white hover:bg-gray-700"
            >

              ← Back

            </button>

          </Link>


        </div>




        <form

          onSubmit={saveShift}

          className="rounded-xl bg-white p-8 shadow-lg"

        >



          <label className="font-bold text-black">

            Participant

          </label>



          <select

            required

            value={participantId}

            onChange={(e)=>
              setParticipantId(
                e.target.value
              )
            }

            className="mb-5 mt-2 w-full rounded-xl border p-3 text-black bg-white"

          >


            <option value="">
              Select participant
            </option>



            {participants.map((p)=>(

              <option

                key={p.id}

                value={p.id}

              >

                {p.first_name} {p.last_name}

              </option>

            ))}



          </select>






          <label className="font-bold text-black">

            Staff Member

          </label>



          <select

            required

            value={staffId}

            onChange={(e)=>
              setStaffId(
                e.target.value
              )
            }

            className="mb-5 mt-2 w-full rounded-xl border p-3 text-black bg-white"

          >


            <option value="">
              Select staff member
            </option>



            {staff.map((s)=>(

              <option

                key={s.id}

                value={s.id}

              >

                {s.first_name} {s.last_name}

              </option>

            ))}



          </select>






          <label className="font-bold text-black">

            Shift Date

          </label>



          <input

            type="date"

            required

            value={date}

            onChange={(e)=>
              setDate(
                e.target.value
              )
            }

            className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

          />




          <label className="font-bold text-black">

            Start Time

          </label>



          <input

            type="time"

            required

            value={startTime}

            onChange={(e)=>
              setStartTime(
                e.target.value
              )
            }

            className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

          />




          <label className="font-bold text-black">

            Finish Time

          </label>



          <input

            type="time"

            required

            value={finishTime}

            onChange={(e)=>
              setFinishTime(
                e.target.value
              )
            }

            className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

          />
                    <label className="font-bold text-black">

            Shift Period

          </label>


          <select

            required

            value={shiftPeriod}

            onChange={(e)=>
              setShiftPeriod(
                e.target.value
              )
            }

            className="mb-5 mt-2 w-full rounded-xl border p-3 text-black bg-white"

          >

            <option value="">
              Select period
            </option>


            <option value="Morning">
              🟦 Morning
            </option>


            <option value="Afternoon">
              🟧 Afternoon
            </option>


            <option value="Night">
              🟪 Night
            </option>


          </select>






          <label className="font-bold text-black">

            Support Type

          </label>


          <input

            value={supportType}

            onChange={(e)=>
              setSupportType(
                e.target.value
              )
            }

            placeholder="Example: Personal Care, Transport, Community Access"

            className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

          />







          <label className="font-bold text-black">

            Shift Notes

          </label>


          <textarea

            value={notes}

            onChange={(e)=>
              setNotes(
                e.target.value
              )
            }

            rows={5}

            placeholder="Add shift notes..."

            className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

          />







          <label className="font-bold text-black">

            Status

          </label>



          <select

            value={status}

            onChange={(e)=>
              setStatus(
                e.target.value
              )
            }

            className="mb-6 mt-2 w-full rounded-xl border p-3 text-black bg-white"

          >


            <option value="Scheduled">
              🟢 Scheduled
            </option>


            <option value="In Progress">
              🔵 In Progress
            </option>


            <option value="Completed">
              ✅ Completed
            </option>


            <option value="Cancelled">
              🔴 Cancelled
            </option>


          </select>
                    <div className="mt-6 flex flex-wrap gap-4">


            <button

              type="submit"

              disabled={saving}

              className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50"

            >

              {saving
                ? "Saving..."
                : "💾 Save Changes"}

            </button>





            <button

              type="button"

              onClick={deleteShift}

              className="flex-1 rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"

            >

              🗑 Delete Shift

            </button>





            <Link

              href="/shifts"

              className="flex-1"

            >

              <button

                type="button"

                className="w-full rounded-xl bg-gray-500 px-6 py-3 font-bold text-white hover:bg-gray-600"

              >

                ❌ Cancel

              </button>


            </Link>



          </div>



        </form>



      </div>


    </main>


  );


}