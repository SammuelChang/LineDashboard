import { bgVariants } from "../../utils/setting";

export default function Record({ data }: any) {
  const { type, title, unit, color, id, date, value } = data;

  return (
    <div
      className={`${
        bgVariants[type]
      } bg-opacity-70 chart h-50 w-full text-[#6F6F6F] dark:text-white dark:text-opacity-80 p-4 flex justify-start  items-center rounded-lg relative ${
        value ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col w-5/12 min-w-fit mr-14 text-lg">
        <div>{title}</div>
        <div>{date}</div>
      </div>
      <div className="w-5/12 flex gap-2 justify-start font-bold text-2xl">
        <div>{value}</div>
        <div>{unit}</div>
      </div>
    </div>
  );
}
