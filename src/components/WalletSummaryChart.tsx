import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WalletSummaryChart: React.FC<{ walletAddress: string }> = ({
  walletAddress,
}) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://onchain.dextrading.com/walletsummary/${walletAddress}?network=eth`
        );
        const apiData = response.data;

        const months = Object.keys(apiData.totalProfits.month);
        const buyAmounts = months.map(
          (month) => apiData.totalBuyAmounts.month[month]
        );
        const sellAmounts = months.map(
          (month) => apiData.totalSellAmounts.month[month]
        );
        const totalOperations = months.map(
          (month) => apiData.totalBuySellTimes.month[month]
        );

        const profitLossAmounts = months.map((month, index) => {
          const profitOrLoss = sellAmounts[index] - buyAmounts[index];
          return profitOrLoss;
        });

        const backgroundColors = profitLossAmounts.map((value) =>
          value >= 0 ? 'green' : 'red'
        );

        const datasets = [
          {
            type: 'bar' as const,
            label: 'Total Buy Amount',
            data: buyAmounts,
            backgroundColor: 'blue',
            yAxisID: 'y',
            stack: 'Stack 0',
          },
          {
            type: 'bar' as const,
            label: 'Profit/Loss Amount',
            data: profitLossAmounts,
            backgroundColor: backgroundColors,
            yAxisID: 'y',
            stack: 'Stack 0',
          },
          {
            type: 'line' as const,
            label: 'Total Operations',
            data: totalOperations,
            borderColor: 'green',
            yAxisID: 'y1',
          },
        ];

        setData({
          labels: months,
          datasets,
        });
      } catch (error) {
        console.error('Error fetching wallet summary data:', error);
      }
    };

    fetchData();
  }, [walletAddress]);

  if (!data) return <div>Loading...</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Wallet Summary Chart',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        stacked: true,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default WalletSummaryChart;
