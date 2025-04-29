"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { togglePostActive } from "./actions";

type ActivateBlogProps = {
  postSlug: string;
  isActive: boolean;
};

export default function ActivateBlog({ postSlug, isActive }: ActivateBlogProps) {
  const [checked, setChecked] = useState(isActive);

  const handleToggle = async (newChecked: boolean) => {
    setChecked(newChecked); 
    try {
      await togglePostActive(postSlug, newChecked);
    } catch (error) {
      console.error("Failed to update active status", error);
      // If error, revert UI
      setChecked(prev => !prev);
    }
  };

  return (
    <Switch
      className="cursor-pointer"
      checked={checked}
      onCheckedChange={handleToggle}
    />
  );
}