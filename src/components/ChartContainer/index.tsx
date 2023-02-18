import { ReactNode } from "react";
import { ResponsiveContainer } from "recharts";

export default function ChartContainer({
  title,
  children,
  loading,
}: {
  title: string;
  children: ReactNode;
  loading: boolean;
}) {
  return (
    <div className="chart h-96 md:h-80 w-full bg-light-500 dark:bg-dark-500 px-8 pb-14 pt-6 my-4 relative z-50">
      <h1 className="text-center text-dark-300 dark:text-light-500 text-2xl font-bold pb-2">
        {title}
      </h1>
      {children}
      {loading && (
        <div className="bg-light-500 dark:bg-dark-500 w-full h-full absolute top-0 left-0 flex justify-center items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#91B5A9] via-[#E9BAAA] to-[#DB8381] animate-spin">
            <div className="h-9 w-9 rounded-full bg-gray-200"></div>
          </div>
        </div>
      )}
    </div>
  );
}
