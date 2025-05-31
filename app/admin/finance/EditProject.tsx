"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Project } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (formData: Partial<Project>) => void;
  initialData: {
    project_name: string;
    client_name: string;
    start_date: string | null;
    end_date: string | null;
  };
};

export default function EditProjectModal({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData); // reset data when opened
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            name="project_name"
            placeholder="Project Name"
            value={formData.project_name}
            onChange={handleChange}
          />
          <Input
            name="client_name"
            placeholder="Client Name"
            value={formData.client_name}
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <Input
              type="date"
              name="start_date"
              value={formData.start_date || ""}
              onChange={handleChange}
            />
            <Input
              type="date"
              name="end_date"
              value={formData.end_date || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}