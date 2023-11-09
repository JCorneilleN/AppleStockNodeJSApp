require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/stock-data', async (req, res) => {
    const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
    const SYMBOL = 'AAPL';
    const endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${SYMBOL}&apikey=${API_KEY}`;

    try {
        const response = await axios.get(endpoint);

        const dailyData = response.data['Time Series (Daily)'];
        const mostRecentDate = Object.keys(dailyData)[0];
        const mostRecentPrice = dailyData[mostRecentDate]['4. close'];

        res.json({
            dailyData: dailyData,
            mostRecentDate: mostRecentDate,
            mostRecentPrice: mostRecentPrice
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

