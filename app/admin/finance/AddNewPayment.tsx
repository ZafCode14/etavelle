"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addNewPayment } from "./actions";
import { toast } from "sonner";
import { Payment, Project } from "./types";

type Props = {
  projects: Project[] | null;
}
export default function AddNewPayment({ projects }: Props) {
  const [formData, setFormData] = useState<Partial<Payment>>({
    type: "",
    amount: 0,
    currency: "",
    until: null,
    project_id: null,
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

    const result = await addNewPayment(formData);
    setLoading(false);

    if (result?.success) {
      toast("Payment added successfully!");
      setFormData({
        type: "",
        amount: 0,
        currency: "",
        until: null,
        project_id: null,
      });
    } else {
      console.error("Failed to add payment:", result?.error);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Add Payment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Payment</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a payment to this project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type" className="mb-1">Payment Name</Label>
            <Input
              id="type"
              name="type"
              required
              placeholder="Deposit / Final"
              value={formData.type}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="amount" className="mb-1">Amount</Label>
            <Input
              id="amount"
              name="amount"
              required
              type="number"
              placeholder="e.g. 1500"
              value={formData.amount ?? ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="project_id" className="mb-1">Select Project</Label>
            <Select
              value={formData.project_id || "other"}
              onValueChange={(val) => {
                setFormData((prev) => ({
                  ...prev,
                  project_id: val === "other" ? null : val,
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.project_name}
                  </SelectItem>
                ))}
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="currency" className="mb-1">Currency</Label>
            <Input
              id="currency"
              name="currency"
              placeholder="USD / EGP"
              value={formData.currency}
              onChange={handleChange}
            />
          </div>

          {formData.type === "Subscription" &&
          <div>
            <Label htmlFor="until" className="mb-1">Until (for Subscriptions)</Label>
            <Input
              id="until"
              name="until"
              type="date"
              value={formData.until || ""}
              onChange={handleChange}
            />
          </div>
          }
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}