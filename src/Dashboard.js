import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const images = [
        '/Images/1.jpeg',
        '/Images/2.jpg',
        '/Images/3.jpg'
    ];

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products'); // Ensure the correct URL
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Chart Data
    const chartData = {
        labels: products.map(item => item.name), // Product names
        datasets: [
            {
                label: 'Quantity',
                data: products.map(item => item.quantity), // Product quantities
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Image Slider Functions
    const showNextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const showPrevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Product Dashboard</h2>
            
            {/* Image Slider */}
            <div className="slider" style={{ position: 'relative', maxWidth: '600px', margin: 'auto', overflow: 'hidden' }}>
                <img 
                    src={images[currentIndex]} 
                    alt={`Slide ${currentIndex + 1}`} 
                    style={{ width: '100%', display: 'block' }} 
                />
                <button onClick={showPrevImage} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>Previous</button>
                <button onClick={showNextImage} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>Next</button>
            </div>

            {/* Bar Chart */}
            {products.length > 0 ? (
                <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};

export default Dashboard;