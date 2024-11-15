import express from 'express';  // Ensure Express is imported
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins array
const allowedOrigins = ['https://pharmax-gr76.vercel.app'];
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'], // Allow OPTIONS for preflight
    allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly specify allowed headers
    credentials: true,
};

// Use CORS with defined options
app.use(cors(corsOptions));

// Parse incoming JSON requests
app.use(bodyParser.json());

// Endpoint to get access token
app.post('/get-access-token', async (req, res) => {
    const { clientId, tenantId, clientSecret } = req.body;
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    // Prepare URLSearchParams for POST body
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('scope', 'https://graph.microsoft.com/.default');
    params.append('grant_type', 'client_credentials');

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Check if the response was not successful
        if (!response.ok) {
            const errorText = await response.text(); // Get more details from response
            console.error('Failed to fetch access token:', errorText);
            return res.status(response.status).json({ error: 'Failed to fetch access token' });
        }

        // Successful response
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error getting access token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
