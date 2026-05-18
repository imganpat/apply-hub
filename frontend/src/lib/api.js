const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is missing");
}

const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
};

const isBrowser = typeof window !== "undefined";

const request = async (endpoint, options = {}, isRetry = false) => {
    const headers = {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
        ...options.headers,
    }

    const res = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers,
    });

    if (res.status === 401 && !isRetry) {
        const refresh = isBrowser
            ? localStorage.getItem("refresh_token")
            : null;
        if (refresh) {
            try {
                const data = await refreshToken(refresh);
                if (isBrowser) {
                    localStorage.setItem("access_token", data.access);
                }

                return request(endpoint, options);
            } catch (err) {
                if (isBrowser) {
                    localStorage.clear();
                    window.location.href = "/login/";
                }
            }
        } else {
            if (isBrowser) {
                window.location.href = "/login/";
            }
        }
    }

    if (res.status === 204) {
        return null; // No content
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.detail || JSON.stringify(data) || "Something went wrong");
    }

    return data;
}


// Auth

export const registerUser = (userData) => {
    return request("api/accounts/register/", {
        method: "POST",
        body: JSON.stringify(userData),
    });
}

export const loginUser = (credentials) => {
    return request("api/accounts/login/", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}

export const refreshToken = (refreshToken) => {
    return request("api/accounts/token/refresh/", {
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
    });
}

// Jobs

export const getApplications = () => request("api/applications/");

export const getApplication = (jobData) => {
    return request("api/applications/", {
        method: "POST",
        body: JSON.stringify(jobData),
    });
}

export const updateApplication = (id, jobData) => {
    return request(`api/applications/${id}/`, {
        method: "PUT",
        body: JSON.stringify(jobData),
    })
}

export const deleteApplication = (jobId) => {
    return request(`api/applications/${jobId}/`, {
        method: "DELETE",
    })
}

// Analytics

export const getAnalyticsSummary = () => request("api/analytics/summary");

export const getApplicationsOverTime = () => request("api/analytics/applications-over-time/");

export const getStatusDistribution = () => request("api/analytics/status-distribution/");

// Profile

export const getUserProfile = () => request("api/accounts/me/");