"use client";
import { Button } from "@/components/ui/button";
import { setCurrency } from "@/store/filterSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function Currency() {
  const currency = useSelector((state: RootState) => state.filter.currency);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Button size="sm" variant={currency !== "USD" ? "outline" : "default"} onClick={() => dispatch(setCurrency({currency: "USD"}))}>USD</Button>
      <Button size="sm" variant={currency !== "EGP" ? "outline" : "default"} onClick={() => dispatch(setCurrency({currency: "EGP"}))}>EGP</Button>
    </div>
  )
}
