"use client";
import { useSelector } from "react-redux";
import Payment from "./Payment";
import { Payment as PaymentType } from "./types";
import { RootState } from "@/store/store";

type Props = {
  payments: PaymentType[];
};

export default function Payments({ payments }: Props) {
  const { month, year } = useSelector((state: RootState) => state.filter);
  const projectName = useSelector((state: RootState) => state.filter.projectName);

  let filteredPayments: PaymentType[] = [];

  if (projectName !== "") {
    filteredPayments = payments.filter((payment) => payment.projects?.project_name === projectName)
  } else if (month && year) {
    // Filter for specific month/year
    filteredPayments = payments.filter((payment) => {
      const [y, m] = payment.created_at.split("-");
      return y === year && m === month;
    });
  } else {
    // Filter for last 12 months
    const today = new Date();
    const twelveMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 11, 1);

    filteredPayments = payments.filter((payment) => {
      const [y, m] = payment.created_at.split("-");
      const paymentDate = new Date(Number(y), Number(m) - 1);
      return paymentDate >= twelveMonthsAgo;
    });
  }

  return (
    <div className="flex flex-col gap-2 flex-1 h-full overflow-y-auto pt-60 pb-10 scrollbar-hide">
      {filteredPayments.map((payment, index) => (
        <Payment
          key={index}
          payment={payment}
          projectName={payment.projects?.project_name}
        />
      ))}
    </div>
  );
}