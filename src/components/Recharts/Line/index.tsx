import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SimpleLine({ data }: { data: any }) {
  return (
    <>
      {!data.hasData && (
        <div className="w-full text-center text-lg">資料不足</div>
      )}
      {data.hasData && (
        <ResponsiveContainer
          width="100%"
          height="100%"
          // className="[&:not(:last-child)]:mb-10"
        >
          <LineChart
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
            <Tooltip contentStyle={{ background: true ? "white" : "black" }} />
            {data.style?.filter((item: any) => item.yaxisId === "left")
              .length && (
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#A3A3A3"
                allowDecimals={false}
              />
            )}
            {data.style?.filter((item: any) => item.yaxisId === "right")
              .length && (
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#A3A3A3"
                allowDecimals={false}
              />
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
              <Line
                key={item.dataKey}
                name={item.name}
                yAxisId={item.yaxisId}
                type="monotone"
                dataKey={item.dataKey}
                stroke={item.stroke}
                strokeWidth={data.data.length < 100 ? item.strokeWidth : 2}
                strokeDasharray={item?.strokeDasharray}
                dot={false}
                activeDot={{ r: 8 }}
                hide={item.hide}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
