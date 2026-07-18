import { supabase } from "@/lib/supabase";


export async function createAuditLog({

  staffId,

  action,

  recordType,

  recordId,

  description

}: {

  staffId: string;

  action: string;

  recordType: string;

  recordId: string;

  description: string;

}) {


  const auditNumber =
    "AUD-" + Date.now();



  const { error } = await supabase

    .from("audit_logs")

    .insert({

      audit_id: auditNumber,

      staff_id: staffId,

      action,

      record_type: recordType,

      record_id: recordId,

      description

    });



  if (error) {

    console.log(
      "Audit log error:",
      error
    );

  }


}