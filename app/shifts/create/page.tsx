"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { createAuditLog } from "@/lib/createAuditLog";


export default function CreateShiftPage() {

  const router = useRouter();


  const [participants,setParticipants] = useState<any[]>([]);
  const [staff,setStaff] = useState<any[]>([]);

  const [participantId,setParticipantId] = useState("");
  const [staffId,setStaffId] = useState("");

  const [date,setDate] = useState("");
  const [startTime,setStartTime] = useState("");
  const [finishTime,setFinishTime] = useState("");

  const [shiftPeriod,setShiftPeriod] = useState("");
  const [supportType,setSupportType] = useState("");

  const [notes,setNotes] = useState("");

  const [loading,setLoading] = useState(false);



  useEffect(()=>{

    loadData();

  },[]);



  async function loadData(){

    const participantsResult =
      await supabase
      .from("participants")
      .select(`
        id,
        first_name,
        last_name
      `);


    const staffResult =
      await supabase
      .from("staff")
      .select(`
        id,
        first_name,
        last_name
      `);



    setParticipants(
      participantsResult.data || []
    );


    setStaff(
      staffResult.data || []
    );

  }






  async function createShift(
    e:React.FormEvent
  ){

    e.preventDefault();

    setLoading(true);



    const shiftId =
      "SHF-" +
      Date.now();




const {data,error}=await supabase

.from("shifts")

.insert({

  shift_id: shiftId,

  participant_id: participantId,

  staff_id: staffId,

  shift_date: date,

  start_time: startTime,

  finish_time: finishTime,

  shift_period: shiftPeriod,

  support_type: supportType,

  status:"Scheduled",

  shift_notes: notes,

})

.select()

.single();




    if(error){

      console.log(error);

      alert(error.message);

      setLoading(false);

      return;

    }






    await createAuditLog({

      staffId:staffId,

      action:"Created Shift",

      recordType:"Shift",

      recordId:data.id,

      description:
      "Staff created a new shift"

    });






    alert("Shift created successfully");


    router.push("/shifts");


  }





return (

<main className="min-h-screen bg-gray-100 p-8">


<div className="mx-auto max-w-3xl">


<div className="mb-8 flex justify-between">


<h1 className="text-4xl font-bold text-black">

📅 Create Shift

</h1>


<Link href="/shifts">

<button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white">

← Back

</button>

</Link>


</div>





<form
onSubmit={createShift}
className="rounded-xl bg-white p-8 shadow"
>



<label className="font-bold text-black">
Participant
</label> className="font-bold text-black"

<select

required

value={participantId}

onChange={(e)=>setParticipantId(e.target.value)}

className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

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
</label> className="font-bold text-black"


<select

required

value={staffId}

onChange={(e)=>setStaffId(e.target.value)}

className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

>

<option value="">
Select staff
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

required

type="date"

value={date}

onChange={(e)=>setDate(e.target.value)}

className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

/>







<label className="font-bold text-black">
Start Time
</label>


<input

required

type="time"

value={startTime}

onChange={(e)=>setStartTime(e.target.value)}

className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

/>







<label className="font-bold text-black">
Finish Time
</label>


<input

required

type="time"

value={finishTime}

onChange={(e)=>setFinishTime(e.target.value)}

className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

/>
<label className="font-bold text-black">
Shift Period
</label>

<select

required

value={shiftPeriod}

onChange={(e)=>setShiftPeriod(e.target.value)}

className="mb-5 mt-2 w-full rounded-xl border p-3 text-black bg-white"

>

<option value="">
Select period
</option>

<option value="Morning">
Morning
</option>

<option value="Afternoon">
Afternoon
</option>

<option value="Night">
Night
</option>

</select>






<label className="font-bold text-black">
Support Type
</label>

<input

value={supportType}

onChange={(e)=>setSupportType(e.target.value)}

placeholder="Example: Personal Care, Transport, Community Access"

className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

/>
<label className="font-bold text-black">
Notes
</label>


<textarea

value={notes}

onChange={(e)=>setNotes(e.target.value)}

className="mb-5 mt-2 w-full rounded-xl border p-3 text-black"

/>







<button

disabled={loading}

className="mb-6 mt-2 min-h-32 w-full rounded-xl border p-3 text-black"

>

{loading ? "Creating..." : "Create Shift"}

</button>



</form>



</div>


</main>

);


}