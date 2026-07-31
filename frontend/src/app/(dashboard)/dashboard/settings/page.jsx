"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import PageHeader from "@/components/PageHeader";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    Sun,
    Moon,
    Monitor,
    Trash2,
    Check
} from "lucide-react";

export default function Page() {
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Settings"
                subtitle="Manage your account preferences and security."
            />

            {/* Appearance */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Appearance
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Customize how ApplyHub looks on your device.
                    </p>
                </CardHeader>

                <CardContent>
                    <p className="mb-4 text-sm font-medium">
                        Theme
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                        <ThemeCard
                            mounted={mounted}
                            theme="light"
                            currentTheme={theme}
                            setTheme={setTheme}
                            icon={<Sun size={22} />}
                            label="Light"
                            description="Bright interface for daytime use."
                        />

                        <ThemeCard
                            mounted={mounted}
                            theme="dark"
                            currentTheme={theme}
                            setTheme={setTheme}
                            icon={<Moon size={22} />}
                            label="Dark"
                            description="Comfortable viewing in low light."
                        />

                        <ThemeCard
                            mounted={mounted}
                            theme="system"
                            currentTheme={theme}
                            setTheme={setTheme}
                            icon={<Monitor size={22} />}
                            label="System"
                            description="Match your device appearance."
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}

            <Card className="border-destructive/30">
                <CardHeader>
                    <CardTitle className="text-destructive">
                        Danger Zone
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Irreversible actions for your account.
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
                        subtitle="Permanently delete your account and all associated data."
                        action={
                            <Button variant="destructive">
                                Delete Account
                            </Button>
                        }
                    />
                </CardContent>
            </Card>
        </div>
    );
}



function ThemeCard({
    mounted,
    theme,
    currentTheme,
    setTheme,
    icon,
    label,
    description,
}) {
    const selected = mounted && currentTheme === theme;

    return (
        <button
            type="button"
            disabled={!mounted}
            onClick={() => setTheme(theme)}
            className={`
                relative flex h-36 flex-col items-start justify-between
                rounded-2xl border p-5 text-left
                transition-all duration-300

                ${selected
                    ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                    : "border-border bg-card hover:border-primary/40 hover:bg-accent/40 hover:shadow-sm"
                }

                ${!mounted
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer"
                }
            `}
        >
            {selected && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check size={14} />
                </div>
            )}

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {icon}
            </div>
            <div className="space-y-1">
                <h3 className="font-semibold">
                    {label}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
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
        <div className="flex flex-col gap-6 rounded-xl border border-border p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                    {icon}
                </div>
                <div>
                    <h3 className="font-semibold">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {subtitle}
                    </p>
                </div>
            </div>
            {action}
        </div>
    );
}