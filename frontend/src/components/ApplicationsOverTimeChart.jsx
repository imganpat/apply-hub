"use client";

import { getApplicationsOverTime } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function ApplicationsOverTimeChart() {
    const { data = [], isLoading, error } = useQuery({
        queryKey: ["applications-over-time"],
        queryFn: getApplicationsOverTime,
    });

    console.log("chart data:", data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading chart</div>;
    }

    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="applied_date" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="count"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}