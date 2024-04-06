import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../../constants';

const City = () => {
  const location=useLocation()
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        title: {
            text: 'Count'
          }
      },
      yaxis: {
        categories: [],
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          }
        }
      },
      colors: ['#f8bf50']
    }
  });

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(`${BACKEND_ENDPOINT}getCityChartData`);
        const cityData = response.data.cityChartData;

        const counts = Object.values(cityData);
        const cities = Object.keys(cityData);

        setChartData(prevState => ({
          ...prevState,
          series: [{ data: counts }],
          options: {
            ...prevState.options,
            xaxis: { categories: cities },
          }
        }));
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={location.pathname.includes("cityChart")?500:300} width={location.pathname.includes("cityChart")?900:300} />
    </div>
  );
};

export default City;