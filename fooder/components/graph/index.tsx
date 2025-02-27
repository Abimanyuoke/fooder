import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
    // Data untuk grafik penjualan
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Bulan
        datasets: [
            {
                label: 'Nilai Penjualan (IDR)',
                data: [1200, 1500, 1800, 2200, 1700, 2100, 2300, 2500, 2800, 3000, 3500, 4000], // Data penjualan
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,  // Menggunakan 'top' sebagai nilai yang valid untuk posisi legend
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `IDR ${context.raw.toLocaleString()}`,
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => `IDR ${value.toLocaleString()}`
                }
            }
        }
    };
    

    return (
        <div className="text-white p-8">
            <div className="flex justify-center">
                <div className="w-3/4">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default SalesChart;
