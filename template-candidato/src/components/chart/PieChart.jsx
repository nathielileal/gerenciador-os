import React from "react";
import ReactECharts from "echarts-for-react";

export default function PieChart({ title, subtitle, data }) {
    const option = {
        title: {
            text: title,
            left: "center",
        },
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: "horizontal",
            bottom: "0",
        },
        series: [
            {
                name: subtitle,
                type: "pie",
                radius: "50%",
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };

    return <ReactECharts option={option} style={{ height: 350 }} />;
}