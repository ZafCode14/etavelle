import Image from "next/image";

export default function GraphicalElements() {
  return (
    <div className="
      absolute w-full h-full rotate-[-45deg]
      flex justify-between items-center px-[20%]
    ">
      <Image
        src={'/icons/graphicalElements/elementPurple.svg'}
        alt="service icon"
        width={0}
        height={0}
        className="w-auto h-[100px] object-contain translate-x-[0px] mb-44"
      />
      <Image
        src={'/icons/graphicalElements/elementBlue.svg'}
        alt="service icon"
        width={0}
        height={0}
        className="w-auto h-[100px] object-contain translate-x-[0px] mt-44"
      />
    </div>
  )
}