import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale,   
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement 
} from 'chart.js';

import { Bar, Line, Pie, Scatter} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart(props){

    let chartConfig = (
        <h4>Invalid chart type</h4>
    )

    function sortX(data, type, xAxis){
        let sorted = []

        if(type === "string"){
            return [...data].sort((a, b) => a[xAxis].localeCompare(b[xAxis]));
        }

        sorted = [...data].sort((a, b) => a[xAxis] - b[xAxis]);

        return sorted;
    }

    if(props.chartType === "Bar"){

        const sortedData = sortX(props.dataset, props.xType, props.xAxis)

        chartConfig = (
            <Bar
                data = {{
                    labels: sortedData.map(row => row[props.xAxis]),
                    datasets: [
                    {
                        label: props.yAxis,
                        data: sortedData.map(row => row[props.yAxis]),
                        backgroundColor: 'rgba(153, 102, 255, 0.9)'
                    }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                    legend: { position: 'top' }
                    },
                    scales: {
                        x: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white' 
                        },
                        title: {
                            display: true,
                            text: props.xAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }},
                        y: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white'
                        },
                        title: {
                            display: true,
                            text: props.yAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        }
                    }
                }}
            />
        )
    }
    else if(props.chartType === "Line"){

        const sortedData = sortX(props.dataset, props.xType, props.xAxis)

        chartConfig = (
            <Line
                data = {{
                    labels: sortedData.map(row => row[props.xAxis]),
                    datasets: [
                    {
                        label: props.yAxis,
                        data: sortedData.map(row => row[props.yAxis]),
                        borderColor: 'white',
                        backgroundColor: 'rgba(109, 90, 246, 1)',
                    }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                    legend: { position: 'top' }
                    },
                    scales: {
                        x: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white' 
                        },
                        title: {
                            display: true,
                            text: props.xAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        },
                        y: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white'
                        },
                        title: {
                            display: true,
                            text: props.yAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        }
                    }
                }}
            />
        )
    }

    else if(props.chartType === "Pie"){

        const sortedData = sortX(props.dataset, props.xType, props.xAxis)

        chartConfig = (
            <Pie
                data={{
                labels: sortedData.map(row => row[props.xAxis]),
                datasets: [
                {
                    label: props.xAxis,
                    data: sortedData.map(row => row[props.yAxis]),
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    ]
                }
                ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' }
                    }
                }}
            />
        )
    }
    
    else if(props.chartType === "Scatter"){

        const sortedData = sortX(props.dataset, props.xType, props.xAxis)

        chartConfig = (
            <Scatter
                data={{
                    datasets: [
                    {
                        label: `${props.xAxis} vs ${props.yAxis}`,
                        data: sortedData.map(row => ({
                        x: row[props.xAxis],
                        y: row[props.yAxis]
                        })),
                        backgroundColor: 'rgba(72, 244, 244, 0.79)'
                    }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                    legend: { position: 'top' }
                    },
                    scales: {
                    x: { type: 'linear', position: 'bottom',
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white' 
                        },
                        title: {
                            display: true,
                            text: props.xAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                     },
                     y: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white'
                        },
                        title: {
                            display: true,
                            text: props.yAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }

                    }
                }}
            />

        )
    }

    else if (props.chartType === "Histogram Bar") {

    const sortedData = sortX(props.dataset, props.xType, props.xAxis)

    const values = sortedData.map(row => row[props.xAxis]);

    const numericValues = values.filter(v => typeof v === "number" && !isNaN(v));

    if (numericValues.length === 0) {
        chartConfig = <h4>No numeric data for histogram</h4>;
    } else {
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);

        const numBins = Math.ceil(Math.sqrt(numericValues.length));
        const binSize = (max - min) / numBins;

        const bins = {};

        numericValues.forEach(v => {
            const binStart = Math.floor((v - min) / binSize) * binSize + min;
            const binEnd = binStart + binSize;
            const label = `${binStart.toFixed(1)} - ${binEnd.toFixed(1)}`;
            bins[label] = (bins[label] || 0) + 1;
        });

        const labels = Object.keys(bins);
        const counts = Object.values(bins);

        chartConfig = (
            <Bar
                data={{
                    labels,
                    datasets: [
                        {
                            label: `Histogram of ${props.xAxis}`,
                            data: counts,
                            backgroundColor: 'rgba(68, 74, 255, 0.48)'
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' }
                    },
                    scales: {
                        x: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white' 
                        },
                        title: {
                            display: true,
                            text: props.xAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        },
                        y: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white'
                        },
                        title: {
                            display: true,
                            text: props.yAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        }
                    }
                }}
            />
        );
    }
}

else if (props.chartType === "Histogram Pie") {

    const sortedData = sortX(props.dataset, props.xType, props.xAxis)

    const values = sortedData.map(row => row[props.xAxis]);

    const numericValues = values.filter(v => typeof v === "number" && !isNaN(v));

    if (numericValues.length === 0) {
        chartConfig = <h4>No numeric data for histogram</h4>;
    } else {
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);

        const numBins = Math.ceil(Math.sqrt(numericValues.length));
        const binSize = (max - min) / numBins;

        const bins = {};

        numericValues.forEach(v => {
            const binStart = Math.floor((v - min) / binSize) * binSize + min;
            const binEnd = binStart + binSize;
            const label = `${binStart.toFixed(1)} - ${binEnd.toFixed(1)}`;
            bins[label] = (bins[label] || 0) + 1;
        });

        const labels = Object.keys(bins);
        const counts = Object.values(bins);

        chartConfig = (
            <Pie
                data={{
                    labels,
                    datasets: [
                        {
                            label: `Histogram of ${props.xAxis}`,
                            data: counts,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                            ]
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' }
                    },
                    scales: {
                        x: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white' 
                        },
                        title: {
                            display: true,
                            text: props.xAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        },
                        y: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white'
                        },
                        title: {
                            display: true,
                            text: props.yAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        }
                    }
                }}
            />
        );
    }
}


    else if(props.chartType === "Frequency Bar"){
        const freq = {};

        const sortedData = sortX(props.dataset, props.xType, props.xAxis)

        sortedData.forEach(row => {
            freq[row[props.xAxis]] = (freq[row[props.xAxis]] || 0) + 1;
        });

        const labels = Object.keys(freq);
        const counts = Object.values(freq);
        chartConfig = (
            <Bar
                data={{
                    labels,
                    datasets: [
                    {
                        label: `Frequency of ${props.xAxis}`,
                        data: counts,
                        backgroundColor: 'rgba(251, 71, 71, 0.53)'
                    }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                    legend: { position: 'top' }
                    },
                    scales: {
                        x: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white' 
                        },
                        title: {
                            display: true,
                            text: props.xAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        },
                        y: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white'
                        },
                        title: {
                            display: true,
                            text: props.yAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        }
                    }
                }}
            />
        )
    }

    else if(props.chartType === "Frequency Pie"){
        const freq = {};

        const sortedData = sortX(props.dataset, props.xType, props.xAxis)

        sortedData.forEach(row => {
            freq[row[props.xAxis]] = (freq[row[props.xAxis]] || 0) + 1;
        });

        const labels = Object.keys(freq);
        const counts = Object.values(freq);
        chartConfig = (
            <Pie
                data={{
                    labels,
                    datasets: [
                    {
                        label: `Frequency of ${props.xAxis}`,
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                        ]
                    }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                    legend: { position: 'top' }
                    },
                    scales: {
                        x: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white' 
                        },
                        title: {
                            display: true,
                            text: props.xAxis, 
                            color: 'white',    
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        },
                        y: {
                        grid: {
                            color: 'gray' 
                        },
                        ticks: {
                            color: 'white'
                        },
                        title: {
                            display: true,
                            text: props.yAxis, 
                            color: 'white',   
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                        }
                    }
                }}
            />
        )
    }

    return chartConfig;

}

export default Chart;