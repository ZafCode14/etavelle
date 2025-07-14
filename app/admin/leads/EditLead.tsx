"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { EditLead } from "./actions"; // changed
import { toast } from "sonner";
import { Lead } from "./types";

type Props = {
  lead: Lead;
};

export default function EditLeadForm({ lead }: Props) {
  const [formData, setFormData] = useState({
    id: lead.id || "",
    country: lead.country || "",
    name: lead.name || "",
    phone: lead.phone || "",
    email: lead.email || "",
    website: lead.website || "",
    linkedin: lead.linkedin || "",
    instagram: lead.instagram || "",
    facebook: lead.facebook || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Convert empty strings to null before submission
    const preparedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim() === "" ? null : value])
    );

    const result = await EditLead({ ...preparedData, id: lead.id }); // ensure `lead.id` exists
    setLoading(false);

    if (result?.success) {
      toast("Lead updated successfully!");
    } else {
      console.error("Failed to update lead:", result?.error);
    }
  };

  const inputFields = [
    { name: "country", label: "Country", placeholder: "Enter from where is this lead", required: true },
    { name: "name", label: "Name", placeholder: "Lead's full name", required: true },
    { name: "phone", label: "Phone", placeholder: "Enter phone number" },
    { name: "email", label: "Email", placeholder: "Enter company email" },
    { name: "website", label: "Website", placeholder: "Website URL (if any)" },
    { name: "linkedin", label: "LinkedIn", placeholder: "LinkedIn profile link" },
    { name: "instagram", label: "Instagram", placeholder: "Instagram profile link" },
    { name: "facebook", label: "Facebook", placeholder: "Facebook profile/page link" },
  ];

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="text-blue-500">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl !pointer-events-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-2 w-full">
          {inputFields.map(({ name, label, placeholder, required }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                name={name}
                placeholder={placeholder}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required={required}
              />
            </div>
          ))}

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Lead"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}