import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../../constants';

const AgeGender = () => {
  const location=useLocation()
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4],
        curve:'smooth'
      },
      xaxis: {
        categories: ["below 18", "18-24", "25-30", "31-40", "41-50", "51-60", "60+"],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            }
          },
          title: {
            text: "Count",
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft',
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_ENDPOINT}getAgeChartData`);
        const { ageGenderChartData } = response.data;
        const maxCount = Math.max(...Object.values(ageGenderChartData).map(data => Object.values(data).reduce((acc, curr) => acc + curr, 0)));
        const series = ["M", "F", "Other"].map(gender => ({
          name: gender,
          type: 'column',
          data: ["below 18", "18-24", "25-30", "31-40", "41-50", "51-60", "60+"].map(category => ageGenderChartData[category]?.[gender] || 0)
        }));
        setChartData({
          ...chartData,
          series: [
            ...series,
            {
              name: 'Age Group',
              type: 'area',
              stroke: 'curve',
              data: ["below 18", "18-24", "25-30", "31-40", "41-50", "51-60", "60+"].map(category => {
                return Object.values(ageGenderChartData[category] || {}).reduce((acc, curr) => acc + curr, 0);
              })
            }
          ],
          options: {
            ...chartData.options,
            yaxis: {
              ...chartData.options.yaxis,
              max: maxCount + 3
            }
          }
        });
      } catch (error) {
        console.error('Error fetching age gender data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={location.pathname.includes("ageGenderChart")?500:300} width={location.pathname.includes("ageGenderChart")?900:300} />
    </div>
  );
};

export default AgeGender;
