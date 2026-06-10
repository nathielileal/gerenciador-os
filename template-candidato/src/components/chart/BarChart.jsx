import ReactECharts from "echarts-for-react";

export default function BarChart({ title, subtitle, data }) {
  const option = {
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: data.map((item) => item.name),
    },
    series: [
      {
        name: subtitle,
        type: "bar",
        data: data.map((item) => item.value),
        itemStyle: {
          color: "#3b82f6",
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 350 }} />;
}