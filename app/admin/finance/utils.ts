import { Payment, Project } from "./types";

export const getRateAmount = (currency: string, payment: Payment , rates: {[key: string]: number}) => {
  return (payment.amount / rates[payment.currency]).toFixed(2);
}

export const getFinanceOfMonth = (
  payments: Payment[], 
  month: { year: string; month: string }, 
  currency: string,
  rates: { [key: string]: number }
) => {
  let total = 0;
  let expenses = 0;
  let gains = 0;

  payments.forEach((payment) => {
    const [year, monthStr] = payment.created_at.split("-");
    if (year === month.year && monthStr === month.month) {
      const amount = Number(getRateAmount(currency, payment, rates));
      total += amount;
      if (amount > 0) gains += amount;
      else if (amount < 0) expenses += amount;
    }
  });

  return {
    total: total.toFixed(2),
    expences: expenses.toFixed(2),
    gains: gains.toFixed(2),
  };
};

export const getFinanceOfLast12Months = (
  payments: Payment[], 
  currency: string,
  rates: { [key: string]: number }
) => {
  const now = new Date();
  const last12Months: {month: string, year: string}[] = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    last12Months.push({ month, year });
  }

  let total = 0;
  let expenses = 0;
  let gains = 0;

  payments.forEach((payment) => {
    const [year, month] = payment.created_at.split("-");
    const match = last12Months.find(
      (m) => m.month === month && m.year === year
    );
    if (match) {
      const amount = Number(getRateAmount(currency, payment, rates));
      total += amount;
      if (amount > 0) gains += amount;
      else if (amount < 0) expenses += amount;
    }
  });

  return {
    total: total.toFixed(2),
    expences: expenses.toFixed(2),
    gains: gains.toFixed(2),
  };
};


export const generateMonthsArray = async (payments: Payment[]) => {
  const now = new Date();
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth());
  const thisMonth = lastMonthDate.getMonth() + 1;
  const thisYear = lastMonthDate.getFullYear();

  const firstDate = new Date(payments[payments.length - 1].created_at);
  const firstMonth = firstDate.getMonth() + 1;
  const firstYear = firstDate.getFullYear();

  // Generate full list of months between first and this
  const result: { year: string; month: string }[] = [];

  let currentYear = firstYear;
  let currentMonth = firstMonth;

  while (
    currentYear < thisYear ||
    (currentYear === thisYear && currentMonth <= thisMonth)
  ) {
    result.push({
      year: String(currentYear),
      month: String(currentMonth).padStart(2, "0"),
    });

    // Move to next month
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }

  return result
}

export function formatDate(input: string) {
  const [year, month, day] = input.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleDateString("en-GB");
}

export function getMonthsSinceLastSubscription(project: Project, startDate: string): number {
  const latestUntil = project.payments.reduce((latest, payment) => {
    if (payment.until) {
      return (!latest || new Date(payment.until) > new Date(latest)) ? payment.until : latest;
    }
    return latest;
  }, null as string | null);

  console.log(project.payments);

  if (!latestUntil) return 0;

  const start = new Date(startDate);
  const end = new Date(latestUntil);

  const years = start.getFullYear() - end.getFullYear();
  const months = start.getMonth() - end.getMonth() + 1;

  return years * 12 + months;
}