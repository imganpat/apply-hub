import { getUserProfile } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: getUserProfile,
        staleTime: 1000 * 60 * 5,
    });
};
