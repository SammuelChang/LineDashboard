import { PieChart, Pie, Tooltip, Cell } from "recharts";

export default function SimplePie({ data }: { data: any }) {
  // customeLabel參考：
  // https://stackoverflow.com/questions/55247126/recharts-pie-chart-w-value-labels-inside
  let renderLabel = function (entry: any) {
    return entry.name;
  };
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {/* {`${(percent * 100).toFixed(0)}%`} */}
        {name}
      </text>
    );
  };

  return (
    <PieChart width={250} height={250}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        fill="#91B5A9"
        labelLine={false}
        label={renderCustomizedLabel}
        startAngle={360}
        endAngle={0}
        paddingAngle={5}
        innerRadius={50}
        outerRadius={80}
      ></Pie>
    </PieChart>
  );
}
