"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
    Moon,
    Sun,
    Monitor,
    Trash2,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";


export default function Page() {
    return (
        <div className="space-y-6">
            <div className='flex justify-between items-center'>
                <PageHeader title="Settings" subtitle="Manage your account preferences and security." />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Appearance
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Customize how ApplyHub looks on your device
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-sm font-medium">
                        Theme
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                        <ThemeCard
                            icon={<Sun size={20} />}
                            label="Light"
                        />
                        <ThemeCard
                            icon={<Moon size={20} />}
                            label="Dark"
                        />
                        <ThemeCard
                            selected
                            icon={<Monitor size={20} />}
                            label="System"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-destructive/30">
                <CardHeader>
                    <CardTitle className="text-destructive">
                        Danger Zone
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Irreversible actions for your account
                    </p>
                </CardHeader>
                <CardContent>
                    <ActionRow
                        icon={
                            <Trash2
                                size={18}
                                className="text-destructive"
                            />
                        }
                        title="Delete Account"
                        subtitle="Permanently delete your account"
                        action={
                            <Button variant="destructive">
                                Delete
                            </Button>
                        }
                    />
                </CardContent>
            </Card>
        </div>
    );
}



function ThemeCard({
    icon,
    label,
    selected = false,
}) {
    return (
        <button
            className={`
                flex h-28 flex-col items-center justify-center gap-3
                rounded-xl border transition-all

                ${selected
                    ? "border-primary"
                    : "border-border"}
            `}>

            {icon}

            <span className="font-medium">
                {label}
            </span>

        </button>
    );
}

function ActionRow({
    icon,
    title,
    subtitle,
    action,
}) {
    return (
        <div className="flex items-center justify-between border-b pb-4 last:border-none">
            <div className="flex gap-4">
                <div className="mt-1 text-muted-foreground">
                    {icon}
                </div>

                <div>
                    <p className="font-medium">
                        {title}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {subtitle}
                    </p>
                </div>
            </div>

            {action}

        </div>
    );
}