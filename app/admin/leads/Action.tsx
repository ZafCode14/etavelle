import { toast } from "sonner";
import { formatDate } from "../finance/utils";
import { ApplyAlarm, CheckActionReplied, DeleteAction } from "./actions";
import DAction from "./DeleteAction";
import { Action as ActionType } from "./types"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

type Props = {
  action: ActionType;
  setShowActions: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Action({ action, setShowActions }: Props) {
  const [alarm, setAlarm] = useState(action.alarm || "");

  const handleCheckbox = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Replied" ? "No Reply" : "Replied";
    const result = await CheckActionReplied({ id, status: newStatus });

    if (result?.success) {
      toast("Action Checked successfully!");
    } else {
      console.error("Failed to add action:", result?.error);
    }
    setShowActions(false);
  };

  const handleDelete = async (id: string) => {
    const result = await DeleteAction(id);
    if (result?.success) {
      toast("Action Deleted successfully!");
    } else {
      console.error("Failed to delete action:", result?.error);
    }
  }

  const handleUpdateAlarm = async (id: string) => {
    let alrm;
    if (alarm === "") {
      alrm = null;
    } else {
      alrm = alarm;
    }
    const result = await ApplyAlarm({ id, alarm: alrm });

    if (result?.success) {
      toast("Alarm Updated successfully!");
    } else {
      console.error("Failed to add action:", result?.error);
    }
  }

  const updatedAt = new Date(action.updated_at).getTime();
  const now = Date.now();
  const daysAgo = Math.floor((now - updatedAt) / (1000 * 60 * 60 * 24));

  console.log(daysAgo, action.alarm);

  return (
    <div className="flex items-center">
      {/** Alarm */}
      {action.alarm &&
      <div className={`
        bg-[red] w-4 h-4 rounded-full
        ${daysAgo < action.alarm  && "hidden"}
      `}>
      </div>
      }

      <p className="mr-5">{formatDate(action.created_at)}</p>
      <p><b>{action.name}</b></p>
      <p> ({action.description})</p>
      <input
        type="checkbox"
        className="mx-5"
        checked={action.status === "Replied"}
        onChange={() => handleCheckbox(action.id, action.status)}
      />
      <Check className="text-[green] cursor-pointer" onClick={() => handleUpdateAlarm(action.id)}/>
      <Input
        value={alarm}
        onChange={(e) => setAlarm(e.target.value)}
        className="bg-white w-15 h-8 mr-5 !text-black text-center"
      />
      <DAction onDelete={() => handleDelete(action.id)}/>
    </div>
  )
}
