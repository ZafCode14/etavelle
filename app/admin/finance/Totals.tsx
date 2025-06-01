'use client';
import { generateMonthsArray, getFinanceOfLast12Months, getFinanceOfMonth } from "./utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Payment } from './types';
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateFilter } from "@/store/filterSlice";
import { RootState } from "@/store/store";

type Props = {
  payments: Payment[];
}
export default function Totals({ payments }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currency = useSelector((state: RootState) => state.filter.currency);
  const rates = useSelector((state: RootState) => state.filter.rates);

  const [api, setApi] = useState<CarouselApi | null>(null);
  const dispatch = useDispatch();

  const [monthsArray, setMonthsArray] = useState<{ month: string; year: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const last12MonthsFinance = getFinanceOfLast12Months(payments, currency, rates);

  useEffect(() => {
    const loadMonths = async () => {
      setLoading(true);
      const array = await generateMonthsArray(payments);
      setMonthsArray(array);
      setLoading(false);
    };

    loadMonths();
  }, [payments]);

  useEffect(() => {
    if (!api || loading || monthsArray.length === 0) return;

    const updateIndex = () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
      const selectedMonth = monthsArray[index];
      dispatch(setDateFilter({ month: selectedMonth?.month || "", year: selectedMonth?.year || "" }));
    };

    api.on("select", updateIndex);
    updateIndex();

    return () => {
      api.off("select", updateIndex);
    };
  }, [api, dispatch, monthsArray, loading]);

  const handleApi = useCallback((api: CarouselApi) => {
    setApi(api);
  }, []);

  if (loading || monthsArray.length === 0) return null;

  return (
    <Carousel
      className="w-full mt-5"
      opts={{
        startIndex: monthsArray.length,
        slidesToScroll: 1,
        align: "end",
      }}
      setApi={handleApi}
    >
      <CarouselContent className="pl-50 md:pl-170 lg:pl-240 pr-0">
        {monthsArray.map((month, index) => {
          const { total, expences, gains } = getFinanceOfMonth(payments, month, currency, rates);

          return (
            <CarouselItem key={index} className={`basis-40 md:basis-70 ${currentIndex === index ? "" : "opacity-50 scale-60"} transition duration-300`}>
              <h3>{new Date(Number(month.year), Number(month.month) - 1).toLocaleString('default', { month: 'long' })} {month.year}</h3>
              <div className="flex gap-3">
                <h3 className="text-[green]">{gains}</h3>
                <h3 className="text-[red]">{expences}</h3>
              </div>
              <h2 className="mb-0">{total} {currency}</h2>
            </CarouselItem>
          );
        })}
        <CarouselItem className="min-w-40 md:min-w-70">
          <h3>Last 12 Months</h3>
          <div className="flex gap-3">
            <h3 className="text-[green]">{last12MonthsFinance.gains}</h3>
            <h3 className="text-[red]">{last12MonthsFinance.expences}</h3>
          </div>
          <h2 className="!mb-0">{last12MonthsFinance.total} {currency}</h2>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1" variant={'ghost'} />
      <CarouselNext className="absolute right-0 top-1" variant={'ghost'} />
    </Carousel>
  );
}