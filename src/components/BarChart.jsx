import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
    

  },
  scales: {
    y: {
        type: 'linear' , // magic
        ticks: {
            stepSize: 1,
        },
    },
},
};


export default function BarChart({DonateChartData}) {
  function count(arr, x){
    return arr.filter(m => m==x).length;
  }
  const colors = ['rgba(255, 99, 132, 0.5)','rgba(53, 162, 235, 0.5)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',]
  const datasets=Object.values(DonateChartData).map((el, index)=>{
      return {
        label: Object.keys(DonateChartData)[index],
        data: [count(el,"1"), count(el,"3"), count(el,"6"), count(el,"12")],
        backgroundColor: colors[index],
      }     
  })
  console.log(datasets)
    const data = {
        labels: ['one Month', '3 Months', '6 Months', 'year'],
        datasets:datasets,
      };
  return (<div className="chart center card">
    <Bar options={options} data={data} />
  </div>
  );
}
