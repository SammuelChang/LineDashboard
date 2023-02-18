import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SimpleBar({ data }: { data: any }) {
  return (
    <BarChart
      data={data.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis
        dataKey={data.xaxis?.dataKey}
        dy={6}
        tickSize={8}
        interval="preserveStartEnd"
        minTickGap={10}
      />
      <Tooltip />
      {data.style?.filter((item: any) => item.yaxisId === "left").length && (
        <YAxis yAxisId="left" orientation="left" />
      )}
      {data.style?.filter((item: any) => item.yaxisId === "right").length && (
        <YAxis yAxisId="right" orientation="right" />
      )}
      {data.legend && (
        <Legend
          verticalAlign="top"
          iconType="rect"
          wrapperStyle={{
            paddingBottom: "20px",
          }}
        />
      )}
      {data.style?.map((item: any) => (
        <Bar
          key={item.dataKey}
          name={item.name}
          yAxisId={item.yaxisId}
          type="monotone"
          dataKey={item.dataKey}
          stroke={item.stroke}
          strokeWidth={item.strokeWidth}
          strokeDasharray={item?.strokeDasharray}
          hide={item.hide}
        />
      ))}
    </BarChart>
  );
}
