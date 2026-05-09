import {
    FileText,
    Search,
    Clock,
    BadgeCheck,
    CheckCircle2,
    XCircle,
} from "lucide-react";

export const STATUS_UI = {
    applied: {
        label: "Applied",
        icon: FileText,

        chartColor: "#60A5FA",
        chartTextColor: "#1D4ED8",

        badgeClass:
            "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",

        statCardClass:
            "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-400",
    },

    screening: {
        label: "Screening",
        icon: Search,

        chartColor: "#22D3EE",
        chartTextColor: "#0E7490",

        badgeClass:
            "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",

        statCardClass:
            "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/40 dark:text-cyan-400",
    },

    interview: {
        label: "Interview",
        icon: Clock,

        chartColor: "#C084FC",
        chartTextColor: "#7E22CE",

        badgeClass:
            "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",

        statCardClass:
            "text-purple-600 bg-purple-50 dark:bg-purple-900/40 dark:text-purple-400",
    },

    offer: {
        label: "Offer",
        icon: BadgeCheck,

        chartColor: "#34D399",
        chartTextColor: "#047857",

        badgeClass:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",

        statCardClass:
            "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 dark:text-emerald-400",
    },

    accepted: {
        label: "Accepted",
        icon: CheckCircle2,

        chartColor: "#4ADE80",
        chartTextColor: "#15803D",

        badgeClass:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

        statCardClass:
            "text-green-600 bg-green-50 dark:bg-green-900/40 dark:text-green-400",
    },

    rejected: {
        label: "Rejected",
        icon: XCircle,

        chartColor: "#F87171",
        chartTextColor: "#B91C1C",

        badgeClass:
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

        statCardClass:
            "text-red-600 bg-red-50 dark:bg-red-900/40 dark:text-red-400",
    },
};