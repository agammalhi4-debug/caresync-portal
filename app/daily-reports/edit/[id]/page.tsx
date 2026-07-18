"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { createAuditLog } from "@/lib/createAuditLog";


export default function EditDailyReportPage(){


const params = useParams();

const router = useRouter();


const [report,setReport]=useState<any>(null);


const [notes,setNotes]=useState("");

const [health,setHealth]=useState("");

const [behaviour,setBehaviour]=useState("");

const [incidents,setIncidents]=useState("");


const [loading,setLoading]=useState(false);






useEffect(()=>{


async function loadReport(){


const {data,error}=await supabase

.from("daily_reports")

.select("*")

.eq("id",params.id)

.single();



if(error){

console.log(error);

}

else{


setReport(data);


setNotes(data.additional_notes || "");

setHealth(data.health_observations || "");

setBehaviour(data.behaviour_and_mood || "");

setIncidents(data.incidents || "");


}



}



loadReport();


},[params.id]);








async function saveReport(e:React.FormEvent){


e.preventDefault();


setLoading(true);





const {error}=await supabase

.from("daily_reports")

.update({

additional_notes:notes,

health_observations:health,

behaviour_and_mood:behaviour,

incidents:incidents,


last_edited_at:

new Date().toISOString()


})

.eq("id",params.id);







if(error){


alert(error.message);


}

else{





await createAuditLog({


staffId:report.staff_id,


action:"Edited Daily Report",


recordType:"Daily Report",


recordId:report.id,


description:
"Staff edited daily client report"


});





alert("Report updated");


router.push(`/daily-reports/${report.id}`);



}



setLoading(false);


}







if(!report){


return(

<main className="p-6">

Loading...

</main>

)


}







return(


<main className="min-h-screen bg-blue-50 p-6">



<div className="mb-8 flex justify-between">


<h1 className="text-4xl font-bold text-black">

✏️ Edit Daily Report

</h1>



<Link href={`/daily-reports/${report.id}`}>

<button className="rounded-xl bg-gray-600 px-5 py-3 text-white">

← Back

</button>


</Link>



</div>







<form

onSubmit={saveReport}

className="rounded-xl bg-white p-6 shadow"

>




<label className="font-bold text-black">

Health Observations

</label>


<textarea

value={health}

onChange={(e)=>setHealth(e.target.value)}

className="mb-5 mt-2 min-h-24 w-full rounded-xl border p-3"

/>





<label className="font-bold text-black">

Behaviour & Mood

</label>


<textarea

value={behaviour}

onChange={(e)=>setBehaviour(e.target.value)}

className="mb-5 mt-2 min-h-24 w-full rounded-xl border p-3"

/>






<label className="font-bold text-black">

Incidents

</label>


<textarea

value={incidents}

onChange={(e)=>setIncidents(e.target.value)}

className="mb-5 mt-2 min-h-24 w-full rounded-xl border p-3"

/>







<label className="font-bold text-black">

Additional Notes

</label>


<textarea

value={notes}

onChange={(e)=>setNotes(e.target.value)}

className="mb-5 mt-2 min-h-24 w-full rounded-xl border p-3"

/>







<button

disabled={loading}

className="w-full rounded-xl bg-blue-600 p-4 font-bold text-white"

>


{loading ?

"Saving..."

:

"Save Changes"

}



</button>





</form>




</main>


)


}