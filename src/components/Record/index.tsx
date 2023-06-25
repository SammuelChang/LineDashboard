import { bgVariants2 } from "../../utils/setting";

export default function Record({ data }: any) {
  const { type, title, unit, date, value } = data;

  return (
    <div
      className={`${
        bgVariants2[type]
      } bg-opacity-70 chart h-50 w-full text-textSecond dark:text-opacity-80 p-4 flex justify-start  items-center rounded-lg relative ${
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
