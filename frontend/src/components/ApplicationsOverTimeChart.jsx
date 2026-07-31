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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function ApplicationsOverTimeChart() {
    const { data = [], isLoading, error } = useQuery({
        queryKey: ["applications-over-time"],
        queryFn: getApplicationsOverTime,
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading chart</div>;
    }

    const chartData = data.map((item) => ({
        date: item.applied_date,
        applications: item.count
    }));

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <CardTitle className={"font-semibold"}>
                        Applications Over Time
                    </CardTitle>
                    <Select defaultValue="daily">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="date" />

                            <YAxis allowDecimals={false} />

                            <Tooltip
                                contentStyle={{
                                    background: "var(--card)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "12px",
                                    color: "var(--foreground)",
                                }}
                                labelStyle={{
                                    color: "var(--muted-foreground)",
                                    fontWeight: 600,
                                }}
                                itemStyle={{
                                    color: "var(--foreground)",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="applications"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}