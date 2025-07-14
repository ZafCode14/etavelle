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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { AddAction } from "./actions";
import { toast } from "sonner";

export default function AddNewAction({ lead_id }: { lead_id: string }) {
  const [formData, setFormData] = useState({
    name: "LinkedIn",
    description: "",
    lead_id: lead_id,
  });
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const result = await AddAction(formData);
    setLoading(false);

    if (result?.success) {
      toast("Action Added successfully!");
      setFormData({
        name: "LinkedIn",
        description: "",
        lead_id: lead_id,
      });
    } else {
      console.error("Failed to add action:", result?.error);
    }
  };

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="text-blue-500">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl !pointer-events-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Action</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 w-full">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Select value={formData.name} onValueChange={handleNameChange}>
              <SelectTrigger id="name">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Phone">Phone</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              autoComplete="true"
              placeholder="Action description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Action"}
          </Button>

          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}