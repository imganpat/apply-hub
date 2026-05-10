"use client";

import { useEffect, useState } from "react";
import { getStatusDistribution } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { STATUS_UI } from "@/constants/status-ui";

export default function ApplicationFunnelChart() {
    const [animate, setAnimate] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ["status-distribution"],
        queryFn: getStatusDistribution,
    });

    useEffect(() => {
        if (data) {
            const timer = setTimeout(() => {
                setAnimate(true);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error || !data) return <div>Error loading data</div>;

    const steps = [
        {
            name: "applied",
            value: data.total_applications,
        },
        {
            name: "interview",
            value: data.interviews,
        },
        {
            name: "offer",
            value: data.offers,
        },
    ];

    const max = steps[0].value || 1;

    const funnelData = steps.map((step, index) => {
        const previous = steps[index - 1]?.value;

        return {
            ...step,
            width: (step.value / max) * 100,
            conversion:
                index === 0
                    ? 100
                    : previous
                        ? Math.round(
                            (step.value / previous) * 100
                        )
                        : 0,
            drop:
                index === 0
                    ? 0
                    : previous - step.value,
        };
    });

    const overallConversion = Math.round(
        (steps[2].value / max) * 100
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold">
                    Application Funnel
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Overall conversion: {overallConversion}%
                </p>
            </CardHeader>

            <CardContent className="space-y-6">
                {funnelData.map((item, index) => (
                    <div
                        key={item.name}
                        className="space-y-2"
                    >
                        <div className="flex items-center justify-between">
                            <div className="font-medium">
                                {STATUS_UI[item.name].label}
                            </div>

                            <div className="text-sm text-muted-foreground">
                                {item.value} • {item.conversion}%
                            </div>
                        </div>

                        <div className="h-8 rounded-lg bg-muted overflow-hidden">
                            <div
                                className="h-full rounded-lg transition-all duration-700 ease-out"
                                style={{
                                    width: animate
                                        ? `${item.width}%`
                                        : "0%",
                                    background:
                                        STATUS_UI[item.name]
                                            .chartColor,
                                    transitionDelay: `${index * 150}ms`,
                                }}
                            />
                        </div>

                        {item.drop > 0 && (
                            <p className="text-xs text-muted-foreground">
                                Drop-off: {item.drop}
                            </p>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}