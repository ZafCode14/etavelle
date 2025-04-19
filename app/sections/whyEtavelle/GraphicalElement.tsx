import AnimateIn from "@/components/AnimateIn";
import Image from "next/image";

type Props = {
  className: string;
  height: string;
  x: number;
  color: string;
}
export default function GraphicalElement({ className, height, x, color }: Props) {
  return (
    <div className={`
    absolute 
    flex justify-between items-center
    ${className}
    `}>
      <div className="-rotate-45">
        <AnimateIn x={x}>
        <Image
          src={`/icons/graphicalElements/element${color}.svg`}
          alt="service icon"
          width={0}
          height={0}
          className={`w-auto ${height} object-contain translate-x-[0px]`}
        />
        </AnimateIn>
      </div>
    </div>
  )
}