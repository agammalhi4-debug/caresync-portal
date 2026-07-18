"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createAuditLog } from "@/lib/createAuditLog";


function DailyReportForm() {


const searchParams = useSearchParams();

const router = useRouter();


const shiftId = searchParams.get("shift");



const [shift,setShift]=useState<any>(null);

const [loading,setLoading]=useState(false);



const [personalCare,setPersonalCare]=useState("");

const [medication,setMedication]=useState("");

const [meals,setMeals]=useState("");

const [community,setCommunity]=useState("");

const [activities,setActivities]=useState("");

const [goals,setGoals]=useState("");

const [behaviour,setBehaviour]=useState("");

const [health,setHealth]=useState("");

const [incidents,setIncidents]=useState("");

const [notes,setNotes]=useState("");





useEffect(()=>{


async function loadShift(){


if(!shiftId) return;



const {data,error}=await supabase

.from("shifts")

.select(`

id,

shift_id,

shift_date,

start_time,

finish_time,

status,


participants(

id,

first_name,

last_name,

participant_id

),


staff(

id,

staff_id,

first_name,

last_name

)

`)

.eq("id",shiftId)

.single();





if(error){

console.log(error);

return;

}



setShift(data);



}



loadShift();



},[shiftId]);







async function submitReport(e:React.FormEvent){


e.preventDefault();



setLoading(true);





const reportId =

"RPT-" + Date.now();







const {data,error}=await supabase

.from("daily_reports")

.insert({



report_id:reportId,


shift_id:shift.id,


participant_id:
shift.participants.id,


staff_id:
shift.staff.id,



shift_date:
shift.shift_date,


shift_start:
shift.start_time,


shift_finish:
shift.finish_time,




personal_care:
personalCare,


medication_given:
medication,


meals_and_fluids:
meals,


community_access:
community,


activities_completed:
activities,


goals_worked_on:
goals,


behaviour_and_mood:
behaviour,


health_observations:
health,


incidents:
incidents,


additional_notes:
notes,



report_started_at:
new Date().toISOString(),



report_submitted_at:
new Date().toISOString(),



last_edited_at:
new Date().toISOString(),



electronic_signature:
shift.staff.id,



status:
"Submitted"



})

.select()

.single();







if(error){


console.log(error);


alert(error.message);



}

else{





await createAuditLog({


staffId:
shift.staff.id,


action:
"Submitted Daily Report",


recordType:
"Daily Report",


recordId:
data.id,


description:
"Staff completed daily client report"


});







await supabase

.from("shifts")

.update({

status:"Report Submitted"

})

.eq("id",shift.id);







alert("Daily Report Submitted");



router.push("/daily-reports");



}



setLoading(false);



}








if(!shift){


return(

<main className="p-6">

Loading report...

</main>

)

}








return(


<main className="min-h-screen bg-blue-50 p-6">



<div className="mb-8 flex justify-between">


<h1 className="text-4xl font-bold text-black">

📝 Daily Report

</h1>




<Link href={`/shifts/${shift.id}`}>

<button className="rounded-xl bg-gray-600 px-5 py-3 font-bold text-white">

← Back

</button>

</Link>



</div>








<form

onSubmit={submitReport}

className="rounded-xl bg-white p-6 shadow"

>





<div className="mb-6 rounded-xl bg-blue-50 p-5 text-black">


<p>

<b>Shift ID:</b>

{" "}

{shift.shift_id}

</p>


<p>

<b>Participant:</b>

{" "}

{shift.participants.first_name}

{" "}

{shift.participants.last_name}

</p>


<p>

<b>Staff:</b>

{" "}

{shift.staff.first_name}

{" "}

{shift.staff.last_name}

</p>


<p>

<b>Date:</b>

{" "}

{shift.shift_date}

</p>


<p>

<b>Time:</b>

{" "}

{shift.start_time}

{" - "}

{shift.finish_time}

</p>



</div>








{[

["Personal Care",personalCare,setPersonalCare],

["Medication Given",medication,setMedication],

["Meals & Fluids",meals,setMeals],

["Community Access",community,setCommunity],

["Activities Completed",activities,setActivities],

["Goals Worked On",goals,setGoals],

["Behaviour & Mood",behaviour,setBehaviour],

["Health Observations",health,setHealth],

["Incidents",incidents,setIncidents],

["Additional Notes",notes,setNotes]



].map(([title,value,setter]:any)=>(



<div

key={title}

className="mb-5"

>


<label className="font-bold text-black">

{title}

</label>



<textarea

value={value}

onChange={(e)=>setter(e.target.value)}

className="mt-2 min-h-24 w-full rounded-xl border p-3 text-black"

/>



</div>



))}






<button

disabled={loading}

className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white"

>


{loading?

"Submitting..."

:

"Submit Daily Report"

}



</button>






</form>






</main>


)


}

export default function NewDailyReportPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          Loading...
        </main>
      }
    >
      <DailyReportForm />
    </Suspense>
  );
}