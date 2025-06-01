"use client";
import { Star} from "lucide-react";
import { Payment as PaymentType, Project as ProjectType } from "./types";
import { toggleProjectStartById, updateProjectById } from "./actions";
import { useState } from "react";
import { toast } from "sonner";
import EditProjectModal from "./EditProject";
import { useDispatch, useSelector } from "react-redux";
import { setProjectName } from "@/store/filterSlice";
import { RootState } from "@/store/store";
import { formatDate, getMonthsSinceLastSubscription, getRateAmount } from "./utils";

type Props = {
  project: ProjectType;
  payments: PaymentType[] | null;
};

export default function Project({ project, payments }: Props) {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    project_name: project.project_name || "",
    client_name: project.client_name || "",
    start_date: project.start_date || null,
    end_date: project.end_date || null,
  });

  const dispatch = useDispatch();
  const projectName = useSelector((state: RootState) => state.filter.projectName);
  const currency = useSelector((state: RootState) => state.filter.currency);
  const rates = useSelector((state: RootState) => state.filter.rates);

  const amountSum =
    payments
      ?.filter((payment) => payment.project_id === project.id)
      .map((payment) => Number(getRateAmount(currency, payment, rates)))
      .reduce((sum, amount) => sum + amount, 0) ?? 0;


  const handleToggleStart = async () => {
    const result = await toggleProjectStartById(project.id, !project.premium);
    if (!result.success) {
      console.error("Error Updating Start", result.error);
    }
  };

  const toggleProject = () => {
    if (projectName === project.project_name) {
      dispatch(setProjectName({projectName: ""}))
    } else {
      dispatch(setProjectName({projectName: project.project_name}))
    }
  }


const months = getMonthsSinceLastSubscription(project, new Date().toISOString());

  return (
    <div onClick={toggleProject} onDoubleClick={() => setEdit(true)} className={`
      flex flex-col p-4 relative hover:bg-gray-200 rounded-2xl 
      ${project.project_name === projectName ? "bg-gray-300" : "bg-gray-100"}
      cursor-pointer
    `}>
      <EditProjectModal
        open={edit}
        onClose={() => setEdit(false)}
        initialData={formData}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSave={async (data:any) => {
          const result = await updateProjectById(project.id, data);
          if (result.success) {
            setFormData(data);
            toast("Project Updated");
          } else {
            console.error(result.error);
          }
        }}
      />
      <div className={`flex`}>
        <Star
          onClick={handleToggleStart}
          className="text-[gold] cursor-pointer"
          fill={project.premium ? "gold" : "none"}
        />
        <div className="mx-2">
          {/** Project Name */}
          <h3>{project.project_name}</h3>
          {/** Client Name */}
          <p className="!text-sm">{project.client_name}</p>
        </div>
          {/** Months of Subscirption owed */}
          {months > 0 &&
          <p className="!text-[blue] font-bold">{months}</p>
          }
      </div>

      <div className="absolute right-3 top-3 flex flex-col">
        {/** Project Total */}
        <p className="font-bold !text-[green] self-end">+{amountSum.toFixed(2)} {currency}</p>
          <p className="!text-sm self-end">
            {formatDate(project.start_date || "")} - {formatDate(project.end_date || "")}
          </p>
      </div>
    </div>
  );
}