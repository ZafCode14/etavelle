"use client";
import { Payment as PaymentType } from "./types";
import { removePaymentById, updatePaymentsById } from "./actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate, getRateAmount } from "./utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Props = {
  payment: PaymentType;
  projectName?: string;
};

export default function Payment({ payment, projectName }: Props) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: payment.type,
    amount: payment.amount,
    currency: payment.currency,
    until: payment.until,
    created_at: payment.created_at
      ? new Date(payment.created_at).toISOString().split("T")[0]
      : "",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        type: payment.type,
        amount: payment.amount,
        currency: payment.currency,
        until: payment.until,
        created_at: payment.created_at
          ? new Date(payment.created_at).toISOString().split("T")[0]
          : "",
      });
    }
  }, [open, payment]);

  const currency = useSelector((state: RootState) => state.filter.currency);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const result = await updatePaymentsById(payment.id, formData);
    if (result.success) {
      toast("Payment Updated");
      setOpen(false);
    } else {
      console.error(result.error);
    }
  };

  const onDelete = async () => {
    const result = await removePaymentById(payment.id);
    if (result.success) {
      toast("Payment Deleted Successfully!");
    } else {
      console.error("Failed to Delete Payment:", result.error);
    }
  };

  return (
    <div
      className={`flex flex-col px-2 py-1 rounded-md relative ${
        payment.amount < 0 ? "bg-[#ffe2e2]" : "bg-[#e2ffe4]"
      }`}
    >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="flex justify-between items-center cursor-pointer">
              <div>
                <div className="flex items-center">
                  <p className="font-bold w-24">{payment.type}</p>
                  {projectName &&
                  <p className="!text-[10px] ml-3">({projectName})</p>
                  }
                </div>
                {payment.type === "Subscription" && (
                  <p className="!text-sm">{formatDate(payment.until || "")}</p>
                )}
              </div>
              <div className="text-right">
                {payment.currency === currency ?
                  <p>{getRateAmount(currency, payment)} {currency}</p> :
                  <p><span className="text-sm">{payment.amount} {payment.currency}</span> {getRateAmount(currency, payment)} {currency}</p>
                }
                <p className="!text-sm">
                  {formatDate(payment.created_at)}
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Payment</DialogTitle>
              <DialogDescription>
                Update details below and click Save
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                placeholder="Type"
              />
              {formData.type === "Subscription" && (
                <Input
                  type="date"
                  name="until"
                  value={formData.until || ""}
                  onChange={handleInputChange}
                />
              )}
              <div className="flex gap-2">
                <Input
                  name="amount"
                  type="number"
                  value={formData.amount}
                  required
                  onChange={handleInputChange}
                  placeholder="Amount"
                />
                <Input
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  required
                  placeholder="Currency"
                />
              </div>
              <Input
                name="created_at"
                type="date"
                value={formData.created_at}
                onChange={handleInputChange}
              />
              <div className="flex justify-between mt-2">
                <Button variant="destructive" onClick={onDelete}>
                  Delete
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      {/* Display View */}
    </div>
  );
}