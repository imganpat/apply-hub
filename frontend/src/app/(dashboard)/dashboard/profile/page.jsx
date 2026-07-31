"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getAnalyticsSummary, getUserProfile } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import { useUserProfile } from "@/hooks/useUserProfile";


export default function Page() {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    const { data: user, isLoading } = useUserProfile();

    useEffect(() => {

        const fetchStats = async () => {
            try {
                const response = await getAnalyticsSummary();
                setStats(response);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!user) {
        return <div className="p-6">Failed to load profile</div>;
    }

    return (
        <>
            {/* Header */}
            <div className='flex justify-between items-center'>
                <PageHeader title="Profile" subtitle="View and manage your profile" />
            </div>

            <div className="space-y-6 mt-2">
                <Card>
                    <CardContent className="flex items-center gap-4 p-4">

                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-bold">
                            {user.full_name?.[0]}
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-2xl font-semibold">
                                {user.full_name}
                            </h1>

                            <p className="text-muted-foreground">
                                {user.email}
                            </p>

                            <Badge
                                variant={
                                    user.is_verified
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {user.is_verified
                                    ? "Verified"
                                    : "Not Verified"}
                            </Badge>
                        </div>

                    </CardContent>
                </Card>


                {/* Account Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Account Information
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        <InfoRow
                            label="Full Name"
                            value={user.full_name}
                        />

                        <InfoRow
                            label="Email"
                            value={user.email}
                        />

                        <InfoRow
                            label="Member Since"
                            value={new Date(user.created_at).toLocaleDateString(
                                "en-US",
                                {
                                    day: "numeric",
                                    year: "numeric",
                                    month: "long",
                                }
                            )}
                        />

                    </CardContent>
                </Card>


                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">

                    <StatCard
                        title="Applications"
                        value={stats.total_applications}
                    />

                    <StatCard
                        title="Interviews"
                        value={stats.interviews}
                    />

                    <StatCard
                        title="Offers"
                        value={stats.offers}
                    />

                    <StatCard
                        title="Interview Rate"
                        value={`${Number(stats.interview_rate).toFixed(1) || "0.0"}%`}
                    />
                </div>


                {/* Actions */}
                {/* <Card>
                <CardHeader>
                <CardTitle>
                Actions
                </CardTitle>
                </CardHeader>
                
                <CardContent className="flex gap-3">

                <Button>
                        Edit Profile
                        </Button>
                        
                        <Button variant="outline">
                        Change Password
                        </Button>
                        
                    <Button variant="outline">
                    Verify Email
                    </Button>
                    
                    </CardContent>
                    </Card> */}

            </div>
        </>
    );
}


function InfoRow({ label, value }) {
    return (
        <div className="flex items-center border-b pb-3">

            <span className="w-40 text-muted-foreground shrink-0">
                {label}
            </span>

            <span className="font-medium">
                {value}
            </span>

        </div>
    );
}


function StatCard({ title, value }) {
    return (
        <Card>
            <CardContent className="">

                <p className="text-sm text-muted-foreground">
                    {title}
                </p>

                <p className="mt-2 text-2xl font-bold">
                    {value}
                </p>

            </CardContent>
        </Card>
    );
}