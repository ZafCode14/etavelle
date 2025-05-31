"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Payment, Project } from "./types";


type ProjectFormData = {
  project_name: string;
  client_name: string;
  premium: boolean;
  start_date: Date | null;
  end_date: Date | null;
};
export const createNewProject = async (formData: ProjectFormData) => {
  const supabase = await createClient();

  const { error } = await supabase.from("projects").insert({
    project_name: formData.project_name,
    client_name: formData.client_name,
    premium: formData.premium,
    start_date: formData.start_date?.toISOString().split("T")[0] ?? null,
    end_date: formData.end_date?.toISOString().split("T")[0] ?? null,
  });

  if (error) {
    console.error("Supabase Insert Error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/finance");

  return { success: true };
};

export const updateProjectById = async (id: string, formData: Partial<Project>) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .update(formData)
    .eq('id', id)
    .select()

  if (error) {
    console.error("Supabase Update Error:", error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/finance');

  return { success: true, data: data }
}

export const toggleProjectStartById = async (id: string, bool: boolean) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .update({premium: bool})
    .eq('id', id)
    .select()

  if (error) {
    console.error("Supabase Update Error:", error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/finance');

  return { success: true, data: data }
}

/**
 *  ACTIONS FOR PAYMENTS
 */
export const addNewPayment = async (formData: Partial<Payment>) => {
  const supabase = await createClient();

  const { error } = await supabase.from("payments").insert(formData);

  if (error) {
    console.error("Supabase Insert Error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/finance");

  return { success: true };
};

export const removePaymentById = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from('payments')
    .delete()
    .eq('id', id)

  if (error) {
    console.error("Supabase Delete Error:", error);
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/finance');

  return { success: true }
}

export const updatePaymentsById = async (id: string, formData: Partial<Payment>) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('payments')
    .update(formData)
    .eq('id', id)
    .select()

  if (error) {
    console.error("Supabase Update Error:", error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/finance');

  return { success: true, data: data }

}