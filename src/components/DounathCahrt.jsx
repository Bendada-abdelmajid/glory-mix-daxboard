
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function DounathCahrt({DonateChartData}) {
  const data = {
    labels: Object.keys(DonateChartData),
    datasets: [
      {
        label: '# orders ',
        data: Object.values(DonateChartData).map(el => el.length),
        
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        
      
      },
    ],
  };
    return <div className="chart center card">
      <Doughnut data={data}  />
    </div>;
}
