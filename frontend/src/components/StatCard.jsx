import React from "react";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

import { STATUS_UI } from "@/constants/status-ui";

export const StatCard = ({
    label,
    value,
    trend,
    status,
}) => {
    const config = STATUS_UI[status];

    const Icon = config.icon;

    return (
        <Card className="@container/card h-fit">
            <CardHeader>
                <CardDescription>{label}</CardDescription>

                <CardTitle className="text-2xl font-semibold @[250px]/card:text-2xl">
                    {value}
                </CardTitle>

                <CardAction className="h-full flex items-center">
                    <div
                        className={`p-2 rounded-lg ${config.statCardClass}`}
                    >
                        <Icon size={20} />
                    </div>
                </CardAction>

                <div className="line-clamp-1 flex gap-2 text-sm">
                    {trend}
                </div>
            </CardHeader>
        </Card>
    );
};