"use client";

import { getStatusDistribution } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
    Label,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";

import { STATUS_UI } from "@/constants/status-ui";

export default function StatusDistributionChart() {
    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["status-distribution"],
        queryFn: getStatusDistribution,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading chart</div>;
    }

    const chartData = [
        {
            status: "applied",
            value: data.applied || 0,
            fill: STATUS_UI.applied.chartColor,
            color: STATUS_UI.applied.chartTextColor,
        },
        {
            status: "screening",
            value: data.screening || 0,
            fill: STATUS_UI.screening.chartColor,
            color: STATUS_UI.screening.chartTextColor,
        },
        {
            status: "interview",
            value: data.interviews || 0,
            fill: STATUS_UI.interview.chartColor,
            color: STATUS_UI.interview.chartTextColor,
        },
        {
            status: "offer",
            value: data.offers || 0,
            fill: STATUS_UI.offer.chartColor,
            color: STATUS_UI.offer.chartTextColor,
        },
        {
            status: "accepted",
            value: data.accepted || 0,
            fill: STATUS_UI.accepted.chartColor,
            color: STATUS_UI.accepted.chartTextColor,
        },
        {
            status: "rejected",
            value: data.rejections || 0,
            fill: STATUS_UI.rejected.chartColor,
            color: STATUS_UI.rejected.chartTextColor,
        },
    ].filter((item) => item.value > 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold">
                    Status Distribution
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Track how your applications are
                    distributed across each hiring stage
                </p>
            </CardHeader>

            <CardContent>
                <div className="h-[350px] w-full">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                innerRadius={60}
                            >

                                {chartData.map((item) => (
                                    <Cell
                                        key={item.status}
                                        fill={item.fill}
                                    />
                                ))}

                                <Label
                                    position="center"
                                    content={() => (
                                        <text
                                            x="50%"
                                            y="50%"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x="50%"
                                                dy="-1em"
                                                className="text-2xl font-bold"
                                            >
                                                {data.total_applications}
                                            </tspan>

                                            <tspan
                                                x="50%"
                                                dy="1.5em"
                                                className="text-sm"
                                            >
                                                Applications
                                            </tspan>
                                        </text>
                                    )}
                                />

                            </Pie>

                            {/* <Tooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                }}
                                formatter={(value, _, item) => [
                                    value,
                                    STATUS_UI[item.payload.status].label,
                                ]}
                                itemStyle={{
                                    color: undefined,
                                }}
                            /> */}

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                }}
                                formatter={(value, _, item) => {
                                    const percentage = (
                                        (value / data.total_applications) *
                                        100
                                    ).toFixed(1);

                                    return [
                                        `${value} (${percentage}%)`,
                                        STATUS_UI[item.payload.status].label,
                                    ];
                                }}
                                labelFormatter={() =>
                                    `Total: ${data.total_applications}`
                                }
                                itemStyle={{
                                    color: undefined,
                                }}
                            />

                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="circle"
                                formatter={(status) => {
                                    const item = chartData.find(
                                        (entry) => entry.status === status
                                    );

                                    const percentage = (
                                        (item.value / data.total_applications) *
                                        100
                                    ).toFixed(0);

                                    return `${STATUS_UI[status].label} • ${item.value} (${percentage}%)`;
                                }}
                                wrapperStyle={{
                                    paddingTop: "20px",
                                    fontSize: "14px",
                                }}
                            />

                        </PieChart>

                    </ResponsiveContainer>

                </div>
            </CardContent>
        </Card>
    );
}