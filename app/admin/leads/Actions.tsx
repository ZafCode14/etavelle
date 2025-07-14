import { Button } from "@/components/ui/button";
import { Action as ActionType } from "./types";
import { useState } from "react";
import Action from "./Action";

export default function Actions({ actions }: {actions: ActionType[]}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div>
      <Button variant={'link'} className="text-blue-500" onClick={() => setShowActions(true)}>Actions</Button>

      <div className={`
        fixed top-0 right-0 z-10
        w-full h-full flex 
        justify-center items-center 
        backdrop-blur-sm
        ${showActions ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        transition duration-300
      `} onClick={() => setShowActions(false)}>
        <div className="bg-[#e0e9ff] p-5 rounded-md" onClick={(e) => e.stopPropagation()}>
          {actions.map((action, index) => {
            return (
              <Action key={index} action={action} setShowActions={setShowActions}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}