"use client";
import { Button } from "@/components/ui/button";
import { setCurrency, setRates } from "@/store/filterSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Currency() {
  const currency = useSelector((state: RootState) => state.filter.currency);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/971347f0890595a99610bc18/latest/${currency}`);
        const data = await res.json();
        if (data) {
          dispatch(setRates(data.conversion_rates));
        } else {
          console.error("Rates not found in response:", data);
        }
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      }
    };

    fetchRates();
  }, [currency, dispatch]);

  return (
    <div className="flex flex-wrap gap-2 w-30">
      <Button size="sm" variant={currency !== "USD" ? "outline" : "default"} onClick={() => dispatch(setCurrency({currency: "USD"}))}>USD</Button>
      <Button size="sm" variant={currency !== "EUR" ? "outline" : "default"} onClick={() => dispatch(setCurrency({currency: "EUR"}))}>EUR</Button>
      <Button size="sm" variant={currency !== "EGP" ? "outline" : "default"} onClick={() => dispatch(setCurrency({currency: "EGP"}))}>EGP</Button>
      <Button size="sm" variant={currency !== "RUB" ? "outline" : "default"} onClick={() => dispatch(setCurrency({currency: "RUB"}))}>RUB</Button>
    </div>
  )
}