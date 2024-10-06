// src/utils/api.js

export async function apiFetch(url, options = {}) {
    let response;
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token'); // Ensure refresh token is stored

    // Set default headers if not provided
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };

    // If a token exists, set the Authorization header
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    // Attempt the request
    response = await fetch(url, options);

    // If the token is expired (401), handle the refresh logic
    if (response.status === 401) {
        const errorData = await response.json();

        if (errorData.message === 'Expired JWT Token' && refreshToken) {
            console.warn('JWT Token expired, attempting to refresh token');

            // Call the refresh token endpoint
            const refreshResponse = await fetch('/api/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();

                // Store the new token in localStorage
                localStorage.setItem('token', refreshData.token);

                // Retry the original request with the new token
                options.headers['Authorization'] = `Bearer ${refreshData.token}`;
                response = await fetch(url, options);

                // Return the response after retry
                return response;
            } else {
                console.error('Failed to refresh token. Redirecting to login.');
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login'; // Redirect to login page
            }
        } else {
            console.error('Unauthorized access - Invalid or missing JWT token');
            // Redirect to login or handle unauthorized access
            window.location.href = '/login';
        }
    }

    return response;
}
