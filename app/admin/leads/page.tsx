import AddNewLead from "./AddNewLead"
import { createClient } from "@/utils/supabase/server";
import Leads from "./Leads";

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads, error: leadsError } = await supabase
    .from('leads')
    .select('*, actions(*)')
    .order('created_at', { ascending: false })

  if (!leads) {
    console.error(leadsError);
    return;
  }

  return (
    <main className="pt-20 px-3 w-[1200px] max-w-full mx-auto">
      <AddNewLead/>
      <Leads leads={leads}/>
    </main>
  )
}