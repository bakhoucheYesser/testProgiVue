import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    actions: {
        async authenticate(apiRoute, formData) {
            try {
                const res = await fetch(apiRoute, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();

                if (data.token) {
                    this.token = data.token;
                    localStorage.setItem('token', data.token);
                    console.log("Authentication successful, token stored.");
                }
            } catch (error) {
                console.error("Authentication failed:", error);
                throw error;
            }
        },
        logout() {
            this.token = null;
            localStorage.removeItem('token');
            console.log("Logged out, token removed.");
        },
    },
});