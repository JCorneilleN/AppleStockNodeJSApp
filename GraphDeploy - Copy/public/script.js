document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/stock-data');
        const data = await response.json();

        const dailyData = data.dailyData;
        const dates = Object.keys(dailyData);
        const closingPrices = dates.map(date => parseFloat(dailyData[date]['4. close']));

        // Displaying the most recent stock price and date
        document.getElementById('recentDate').textContent = data.mostRecentDate;
        document.getElementById('recentPrice').textContent = data.mostRecentPrice;

        const trace = {
            x: dates,
            y: closingPrices,
            type: 'scatter'
        };

        Plotly.newPlot('plotly-graph', [trace]);

    } catch (error) {
        console.error('Error fetching and plotting data:', error);
    }
});

