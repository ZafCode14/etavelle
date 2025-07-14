"use client";
import { Lead } from "./types";
import EditLeadForm from "./EditLead";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddNewAction from "./AddNewAction";
import Actions from "./Actions";
import { toast } from "sonner";
import EmailSend from "./EmailSend";

type Props = {
  leads: Lead[];
};

export default function Leads({ leads }: Props) {
  const [status, setStatus] = useState("No Actions");

  useEffect(() => {
  }, [leads])

  const noActionLeadsLength = leads.filter((lead) => lead.actions.length === 0).length;
  const noReplyLeadsLength = leads.filter(
    (lead) => lead.actions.length > 0 && lead.actions.some((action) => action.status !== "Replied")
  ).length;
  const repliedLeadsLength = leads.filter(
    (lead) => lead.actions.length > 0 && lead.actions.some((action) => action.status === "Replied")
  ).length;

  const iconMap = [
    { key: "website", type: "link", icon: "/icons/logos/internet.svg" },
    { key: "phone", type: "copy", icon: "/icons/logos/phone.svg" },
    { key: "linkedin", type: "link", icon: "/icons/logos/linkedin.svg" },
    { key: "instagram", type: "link", icon: "/icons/logos/instagram.svg" },
    { key: "facebook", type: "link", icon: "/icons/logos/facebook.svg" },
  ];

  return (
    <div>
      <div className="flex justify-around w-full">
        <h3 onClick={() => setStatus("No Actions")} className={`${status === "No Actions" && "underline"} cursor-pointer`}>
          No Actions ({noActionLeadsLength})
        </h3>
        <h3 onClick={() => setStatus("No Reply")} className={`${status === "No Reply" && "underline"} cursor-pointer`}>
          No Reply ({noReplyLeadsLength})
        </h3>
        <h3 onClick={() => setStatus("Replied")} className={`${status === "Replied" && "underline"} cursor-pointer`}>
          Replied ({repliedLeadsLength})
        </h3>
      </div>

      <div className="flex flex-wrap w-full justify-center gap-2 mt-10">
        {leads.map((lead) => {
          const hasReplied = lead.actions.some((action) => action.status === "Replied");

          return (
            <div
              key={lead.id}
              className={`
                bg-[#f0f7ff] border border-blue-200 rounded-md p-3 pt-5 relative w-50
                ${(status === "No Actions" && lead.actions.length !== 0) && "hidden"}
                ${(status === "No Reply" && (hasReplied || lead.actions.length === 0)) && "hidden"}
                ${(status === "Replied" && !hasReplied) && "hidden"}
              `}
            >
              {/** Lead Name */}
              <p className="font-bold !text-[14px] !leading-[16px] w-full h-10">{lead.name}</p>

              {/** Social Icons */}
              <div className="flex gap-4 mt-1">
                <EmailSend email={lead.email} name={lead.name}/>
                {iconMap.map(({ key, type, icon }) => {
                  const value = lead[key as keyof Lead];
                  if (!value) return null;

                  if (type === "copy") {
                    return (
                      <Image
                        key={key}
                        onClick={() => {
                          navigator.clipboard.writeText(value as string);
                          toast(`${value} copied to clipboard!`);
                        }}
                        src={icon}
                        alt={`${key} icon`}
                        width={0}
                        height={0}
                        className="w-4 h-4 cursor-pointer"
                      />
                    );
                  }

                  if (type === "link") {
                    return (
                      <Link key={key} href={value as string} target="_blank">
                        <Image
                          src={icon}
                          alt={`${key} icon`}
                          width={0}
                          height={0}
                          className="w-4 h-4"
                        />
                      </Link>
                    );
                  }

                  return null;
                })}
              </div>

              {/** Buttons */}
              <div className="absolute -top-1.5 right-0 flex">
                <AddNewAction lead_id={lead.id} />
                {status !== "No Actions" && <Actions actions={lead.actions} />}
                <EditLeadForm lead={lead} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}