import React, {useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import {
  IoIosArrowDown,
} from "react-icons/io";
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
   
    },
    
  },
  scales: {
    y: {
        type: 'linear' , // magic
        ticks: {
            stepSize: 1,
            min: 0,
        },
        suggestedMin: 0,
      
    },
},
};



export default function AreaChart({LineChartData}) {

  const [openMenu, setopenMenu] = useState(false);
  const [sort, setSort] = useState("Yearly");
const data = {
  labels: Object.keys(LineChartData),
  datasets: [
    {
      fill: false,
      label: false,
      data: Object.values(LineChartData),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
  return <div className="chart card">
    <div className="space-b">
      <h4>Sales Analytics</h4>
      <div
          className={`drop-down-cont ${openMenu ? "open" : ""}`}
        >
          <div
            className="center drop-down-btn"
            onClick={() => {
              setopenMenu(!openMenu);
            }}
          >
          <h4> Sort By : <span>{sort}</span></h4> 
            <IoIosArrowDown />
          </div>
          <div className="drop-down card">
            <div className="item f-start" onClick={()=>{setSort("Yearly"); setopenMenu(false)}}>
               Yearly
            </div>
            <div className="item f-start" onClick={()=>{setSort("Monthly"); setopenMenu(false)}}>
              Monthly
            </div>
            <div className="item f-start" onClick={()=>{setSort("Weekly"); setopenMenu(false)}}>
               Weekly
            </div>
          </div>
        </div>
    </div>
    <Line options={options} data={data} updateMode="resize"/>
  </div>;
}
