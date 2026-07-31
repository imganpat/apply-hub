"use client";

import React, { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { StatusBadge } from "./ui/badge";
import { Input } from "./ui/input";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

import {
    Edit2,
    ExternalLink,
    MapPin,
    Search,
    Trash2,
} from "lucide-react";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    deleteApplication,
    getApplications,
} from "@/lib/api";

import {
    APPLICATION_STATUSES,
    STATUS_LABELS,
} from "@/constants/ application-status";

export default function DataTable({ onEdit }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ["applications"],
        queryFn: getApplications,
    });

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteApplication,

        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(["applications"], (oldData) =>
                oldData.filter((app) => app.id !== deletedId)
            );

            queryClient.invalidateQueries({
                queryKey: ["applications"],
            });
        },
    });

    const handleDelete = async (id) => {
        await deleteMutation.mutateAsync(id);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const filteredApplications = applications.filter((app) => {
        const matchesSearch =
            app.company
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            app.role
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === "" ||
            app.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <div className="mb-6 flex flex-col gap-4 mt-2 md:flex-row">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />

                    <Input
                        value={searchQuery}
                        placeholder="Search by company or role..."
                        className="h-11 rounded-xl border-border bg-card pl-10 shadow-sm"
                        autoComplete="off"
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    />

                </div>

                <Select
                    onValueChange={(value) =>
                        setStatusFilter(
                            value === "all" ? "" : value
                        )
                    }
                >
                    <SelectTrigger className="h-11 w-full rounded-xl md:w-[210px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">
                            All Statuses
                        </SelectItem>

                        {APPLICATION_STATUSES.map((status) => (
                            <SelectItem
                                key={status}
                                value={status}
                            >
                                {STATUS_LABELS[status]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Card className="overflow-hidden rounded-2xl border shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead className="px-6 pb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Company
                                </TableHead>

                                <TableHead className="px-6 pb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Role & Location
                                </TableHead>

                                <TableHead className="px-6 pb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Salary
                                </TableHead>

                                <TableHead className="px-6 pb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Status
                                </TableHead>

                                <TableHead className="px-6 pb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Applied
                                </TableHead>

                                <TableHead className="px-6 pb-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {filteredApplications.length > 0 &&
                                filteredApplications.map((app) => (
                                    <TableRow
                                        key={app.id}
                                        className="group border-border/40 transition-colors hover:bg-accent/40"
                                    >
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                                                    {app.company[0]}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-base font-semibold text-foreground">
                                                        {app.company}
                                                    </p>

                                                    {app.application_link && (
                                                        <a
                                                            href={app.application_link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="mt-1 flex items-center gap-1 text-sm text-primary hover:underline"
                                                        >
                                                            Website

                                                            <ExternalLink
                                                                size={12}
                                                            />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-6 py-4">
                                            <p className="font-medium text-foreground">
                                                {app.role}
                                            </p>
                                            <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                                                <MapPin size={14} />
                                                <span>
                                                    {app.location ||
                                                        "Not specified"}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-6 py-4">
                                            <span className="font-medium text-foreground">
                                                {app.salary || "—"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <StatusBadge status={app.status} />
                                        </TableCell>

                                        <TableCell className="px-6 py-5 text-sm text-muted-foreground">
                                            {
                                                new Date(
                                                    app.created_at
                                                ).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                            }
                                        </TableCell>

                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                                    onClick={() => onEdit(app)}
                                                >
                                                    <Edit2 size={16} />
                                                </Button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>

                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Delete Application?
                                                            </AlertDialogTitle>
                                                            <p className="text-sm text-muted-foreground">
                                                                This action cannot
                                                                be undone. This will
                                                                permanently delete
                                                                this application.
                                                            </p>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        app.id
                                                                    )
                                                                }
                                                                className="bg-destructive hover:bg-destructive/90"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            {filteredApplications.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-20"
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                                                <Search
                                                    size={28}
                                                    className="text-muted-foreground"
                                                />
                                            </div>

                                            <h3 className="text-lg font-semibold">
                                                No applications found
                                            </h3>

                                            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">

                                                We couldn't find any applications
                                                matching your current search or
                                                filter.
                                            </p>

                                            {(searchQuery || statusFilter) && (
                                                <Button
                                                    variant="outline"
                                                    className="mt-6"
                                                    onClick={() => {
                                                        setSearchQuery("");
                                                        setStatusFilter("");
                                                    }}
                                                >
                                                    Clear Filters
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </>
    );
}
