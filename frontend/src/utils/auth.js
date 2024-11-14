export const getAccessToken = async () => {
    try {
        const response = await fetch('http://localhost:5000/get-access-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientId: process.env.REACT_APP_CLIENT_ID,
                tenantId: process.env.REACT_APP_TENANT_ID,
                clientSecret: process.env.REACT_APP_CLIENT_SECRET,
            }),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`Failed to fetch access token: ${errorDetails.error}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in getAccessToken:', error);
        throw error;
    }
};