import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`rounded-2xl ${className ?? ""}`}
      style={{
        boxShadow: "0px 5px 15px 0px #00000022"
      }}
    >
      {children}
    </div>
  );
}