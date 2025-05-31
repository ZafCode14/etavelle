"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { format } from "date-fns";
import { createNewProject } from "./actions";
import { toast } from "sonner";

export default function CreateProject() {
  const [formData, setFormData] = useState({
    project_name: "",
    client_name: "",
    start_date: null as Date | null,
    end_date: null as Date | null,
    premium: false,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const result = await createNewProject(formData);
    setLoading(false);

    if (result?.success) {
      toast("Project created successfully!");
      setFormData({
        project_name: "",
        client_name: "",
        start_date: null,
        end_date: null,
        premium: false,
      });
    } else {
      console.error("Failed to create project:", result?.error);
    }
  };

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">New Project</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl !pointer-events-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6 w-full">
          <div>
            <Label htmlFor="project_name">Project Name</Label>
            <Input
              id="project_name"
              name="project_name"
              placeholder="Website Redesign"
              value={formData.project_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="client_name">Client Name</Label>
            <Input
              id="client_name"
              name="client_name"
              placeholder="Acme Corp"
              value={formData.client_name}
              onChange={handleChange}
            />
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date ? format(formData.start_date, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                setFormData((prev) => ({ ...prev, start_date: date }));
              }}
            />
          </div>

          {/* End Date */}
          <div>
            <Label htmlFor="end_date">End Date</Label>
            <Input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date ? format(formData.end_date, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                setFormData((prev) => ({ ...prev, end_date: date }));
              }}
            />
          </div>

          {/* Premium Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="premium"
              checked={formData.premium}
              onCheckedChange={(checked: boolean) =>
                setFormData((prev) => ({ ...prev, premium: checked }))
              }
            />
            <Label htmlFor="premium">Premium Project</Label>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </Button>

          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}