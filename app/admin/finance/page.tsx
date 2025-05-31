import { createClient } from "@/utils/supabase/server"
import CreateProject from "./CreateProject";
import Project from "./Project";
import AddNewPayment from "./AddNewPayment";
import Totals from "./Totals";
import { Providers } from "@/app/providers";
import Payments from "./Payments";
import Currency from "./Currency";

export default async function Finance() {
  const supabase = await createClient();
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*, payments(until)')
    .order('start_date', { ascending: false })

  const { data: payments, error: paymentsError } = await supabase
    .from('payments')
    .select('*, projects(project_name)')
    .order('created_at', { ascending: false })

  if (!projects) {
    console.error(projectsError);
  }
  if (!payments) {
    console.error(paymentsError);
    return;
  }

  return (
    <main>
      <Providers>
        <div className="fixed top-0 right-0 pt-16 z-10 backdrop-blur-2xl w-full">
          <div className="w-[1200px] max-w-full mx-auto px-3">
            <div className="flex justify-between">
              <div className="flex items-center">
                <h1 className="font-bold mr-10">Finances</h1>
                <Currency/>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <AddNewPayment projects={projects}/>
                <CreateProject/>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <Totals payments={payments}/>
            </div>
          </div>
        </div>

        <div className="fixed w-full h-screen top-0 right-0">
          <div className="w-[1200px] max-w-full mx-auto flex gap-2 px-3 h-full">
            <div className="hidden md:flex flex-col gap-2 flex-1 pt-60">
            {projects?.map((project, index) => 
              <Project key={index} project={project} payments={payments}/>
            )}
            </div>
            <Payments payments={payments}/>
            </div>
        </div>
      </Providers>
    </main>
  )
}
