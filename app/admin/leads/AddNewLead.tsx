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

import { AddLead } from "./actions";
import { toast } from "sonner";

export default function AddNewLead() {
  const [formData, setFormData] = useState({
    country: "",
    name: "",
    phone: "",
    email: "",
    website: "",
    linkedin: "",
    instagram: "",
    facebook: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
    setSuccessMessage("");

    // Convert empty strings to null
    const preparedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim() === "" ? null : value])
    );

    const result = await AddLead(preparedData);
    setLoading(false);

    if (result?.success) {
      toast("Lead Added successfully!");
      setFormData({
        country: "",
        name: "",
        phone: "",
        email: "",
        website: "",
        linkedin: "",
        instagram: "",
        facebook: "",
      });
    } else {
      console.error("Failed to add lead:", result?.error);
    }
  };

  const inputFields = [
    { name: "website", label: "Website", placeholder: "Website URL (if any)" },
    { name: "name", label: "Name", placeholder: "Lead's full name", required: true },
    { name: "country", label: "Country", placeholder: "Enter from where is this lead", required: true },
    { name: "phone", label: "Phone", placeholder: "Enter phone number" },
    { name: "email", label: "Email", placeholder: "Enter company email" },
    { name: "linkedin", label: "LinkedIn", placeholder: "LinkedIn profile link" },
    { name: "instagram", label: "Instagram", placeholder: "Instagram profile link" },
    { name: "facebook", label: "Facebook", placeholder: "Facebook profile/page link" },
  ];

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">Add Lead</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl !pointer-events-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
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
            {loading ? "Adding..." : "Add Lead"}
          </Button>

          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}