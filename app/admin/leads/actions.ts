"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Action, Lead } from "./types";

export const AddLead = async (formData: Partial<Lead>) => {
  const supabase = await createClient();

  const { error } = await supabase.from("leads").insert(formData);

  if (error) {
    console.error("Supabase Insert Error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/leads");

  return { success: true };
};

export const EditLead = async (formData: Partial<Lead>) => {
  const supabase = await createClient();

  const { error } = await supabase.from("leads")
  .update(formData)
  .eq('id', formData.id)

  if (error) {
    console.error("Supabase Update Error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/leads");

  return { success: true };
};

export const UpdateLeadStatus = async ({id, status}: {id: string; status: string}) => {
  const supabase = await createClient();

  const { error } = await supabase.from("leads")
  .update({status: status})
  .eq('id', id)

  if (error) {
    console.error("Supabase Update Error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/leads");

  return { success: true };
};

export const AddAction = async (formData: Partial<Action>) => {
  const supabase = await createClient();

  const { error } = await supabase.from("actions").insert(formData);

  if (error) {
    console.error("Supabase Insert Error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/leads");

  return { success: true };
};

export const CheckActionReplied = async ({id, status}: {id: string, status: string}) => {
  const supabase = await createClient();

  const { error } = await supabase.from("actions")
  .update({status: status})
  .eq('id', id)

  if (error) {
    console.error("Supabase Update Error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/leads");

  return { success: true };
};

export const ApplyAlarm = async ({id, alarm}: {id: string, alarm: number | string | null}) => {
  const supabase = await createClient();

  const { error } = await supabase.from("actions")
  .update({alarm: alarm})
  .eq('id', id)

  if (error) {
    console.error("Supabase Update Error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/leads");

  return { success: true };
};

export const DeleteAction = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from("actions")
  .delete()
  .eq('id', id)

  if (error) {
    console.error("Supabase Delete Error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/leads");

  return { success: true };
};