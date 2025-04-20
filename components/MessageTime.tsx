import { useEffect, useState } from "react";

export default function MessageTime({ createdAt }: { createdAt: number }) {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const formatted = new Date(createdAt).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setLocalTime(formatted);
  }, [createdAt]);

  return <p className={`!text-[10px] !text-[#ffffff]`}>{localTime}</p>;
}
