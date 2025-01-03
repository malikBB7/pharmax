import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin:"*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Endpoint to get access token
app.post('/get-access-token', async (req, res) => {
    const { clientId, tenantId, clientSecret} = req.body;
    const tokenUrl = `process.env.TOKEN_URL`;

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

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch access token' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error getting access token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
