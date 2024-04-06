import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../../constants';


const Religion = () => {
  const location=useLocation()
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'polarArea',
      },
      stroke: {
        colors: ['#fff']
      },
      fill: {
        opacity: 1
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 500,
            height:500
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  });

  useEffect(() => {
    const fetchReligionData = async () => {
      try {
        const response = await axios.get(`${BACKEND_ENDPOINT}getreligionChartData`);
        const religionData = response.data;

        const series = Object.values(religionData.religionChartData);
        const labels = Object.keys(religionData.religionChartData);    
        setChartData(prevState => ({
          ...prevState,
          series: series,
          options: {
            ...prevState.options,
            labels: labels
          }
        }));
      } catch (error) {
        console.error('Error fetching religion data:', error);
      }
    };

    fetchReligionData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} height={location.pathname.includes("religionChart")?500:300} width={location.pathname.includes("religionChart")?900:300} type="polarArea" />
    </div>
  );
};

export default Religion;