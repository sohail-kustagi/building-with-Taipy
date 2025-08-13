import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Selector from '../components/Selector';
import PredictionCard from '../components/PredictionCard';
import Chart from '../components/Chart';

const countries = [
  { value: 'USA', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
];

const companiesByCountry = {
  USA: [
    { value: 'AAPL', label: 'Apple Inc.' },
    { value: 'GOOGL', label: 'Alphabet Inc.' },
    { value: 'MSFT', label: 'Microsoft Corporation' },
    { value: 'AMZN', label: 'Amazon.com Inc.' },
    { value: 'TSLA', label: 'Tesla Inc.' },
  ],
  Canada: [
    { value: 'SHOP', label: 'Shopify Inc.' },
    { value: 'TD.TO', label: 'Toronto-Dominion Bank' },
    { value: 'BMO.TO', label: 'Bank of Montreal' },
    { value: 'RY.TO', label: 'Royal Bank of Canada' },
  ],
  UK: [
    { value: 'HSBC', label: 'HSBC Holdings plc' },
    { value: 'BARC.L', label: 'Barclays PLC' },
    { value: 'BP.L', label: 'BP p.l.c.' },
    { value: 'SHEL.L', label: 'Shell plc' },
  ],
};

function Dashboard({ user }) {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedCompany, setSelectedCompany] = useState('AAPL');
  const [stockData, setStockData] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  const availableCompanies = companiesByCountry[selectedCountry] || [];

  useEffect(() => {
    if (availableCompanies.length > 0) {
      setSelectedCompany(availableCompanies[0].value);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCompany) {
      fetchStockData(selectedCompany);
    }
  }, [selectedCompany]);

  const fetchStockData = async (symbol) => {
    setLoading(true);
    try {
      // Fetch stock data
      const stockResponse = await axios.get(`http://localhost:8000/stocks/${symbol}`);
      setStockData(stockResponse.data);

      // Fetch predictions
      const predResponse = await axios.get(`http://localhost:8000/stocks/${symbol}/predictions`);
      setPredictions(predResponse.data);

      // Process chart data
      if (stockResponse.data && stockResponse.data.Close) {
        const dates = Object.keys(stockResponse.data.Close);
        const prices = Object.values(stockResponse.data.Close);
        
        setChartData({
          labels: dates.slice(-30).map(date => new Date(parseInt(date)).toLocaleDateString()),
          datasets: [
            {
              label: `${symbol} Price`,
              data: prices.slice(-30),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      // Set mock data for development
      setMockData(symbol);
    } finally {
      setLoading(false);
    }
  };

  const setMockData = (symbol) => {
    // Mock data for development
    const mockPrices = Array.from({ length: 30 }, (_, i) => 
      150 + Math.sin(i * 0.5) * 10 + Math.random() * 5
    );
    
    setChartData({
      labels: Array.from({ length: 30 }, (_, i) => 
        new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString()
      ),
      datasets: [
        {
          label: `${symbol} Price`,
          data: mockPrices,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.1,
        },
      ],
    });

    setPredictions({
      linear: { value: 152.34, trend: 2.1 },
      knn: { value: 148.76, trend: -1.5 },
      rnn: { value: 155.89, trend: 3.2 },
    });
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to access the dashboard
          </h2>
          <p className="text-gray-600">You need to be authenticated to view stock data and predictions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Dashboard</h1>
          <p className="text-gray-600">
            Explore stock predictions and trends for companies around the world
          </p>
        </div>

        {/* Selectors */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Selector
              label="Country"
              value={selectedCountry}
              options={countries}
              onChange={handleCountryChange}
              loading={loading}
            />
            <Selector
              label="Company"
              value={selectedCompany}
              options={availableCompanies}
              onChange={handleCompanyChange}
              loading={loading}
            />
          </div>
        </div>

        {/* Predictions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <PredictionCard
            title="Linear Regression"
            value={predictions?.linear?.value}
            trend={predictions?.linear?.trend}
            loading={loading}
          />
          <PredictionCard
            title="K-Nearest Neighbors"
            value={predictions?.knn?.value}
            trend={predictions?.knn?.trend}
            loading={loading}
          />
          <PredictionCard
            title="Recurrent Neural Network"
            value={predictions?.rnn?.value}
            trend={predictions?.rnn?.trend}
            loading={loading}
          />
        </div>

        {/* Chart */}
        <Chart data={chartData} loading={loading} />
      </div>
    </div>
  );
}

export default Dashboard;