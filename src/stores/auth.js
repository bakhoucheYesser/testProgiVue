import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        roles: [] // Store roles here
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

                    // Decode token to get user roles
                    const decodedToken = jwtDecode(data.token);
                    this.roles = decodedToken.roles || [];
                    console.log("Roles extracted from token:", this.roles);

                    console.log("Authentication successful, token stored.");
                }
            } catch (error) {
                console.error("Authentication failed:", error);
                throw error;
            }
        },
        logout() {
            this.token = null;
            this.roles = [];
            localStorage.removeItem('token');
            console.log("Logged out, token and roles removed.");
        },
    },
    getters: {
        isAdmin: (state) => {
            return state.roles.includes('ROLE_ADMIN');
        }
    }
});
