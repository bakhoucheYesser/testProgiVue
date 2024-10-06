// src/utils/api.js

export async function apiFetch(url, options = {}) {
    let response;
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');

    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    response = await fetch(url, options);

    if (response.status === 401) {
        const errorData = await response.json();

        if (errorData.message === 'Expired JWT Token' && refreshToken) {
            console.warn('JWT Token expired, attempting to refresh token');

            const refreshResponse = await fetch('/api/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();

                localStorage.setItem('token', refreshData.token);

                options.headers['Authorization'] = `Bearer ${refreshData.token}`;
                response = await fetch(url, options);

                return response;
            } else {
                console.error('Failed to refresh token. Redirecting to login.');
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        } else {
            window.location.href = '/login';
        }
    }

    return response;
}
