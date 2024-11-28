import React, { useEffect, useState } from 'react';
import './ProductManagement.css'; // Import the CSS file

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });

    const [sellProduct, setSellProduct] = useState({
        id: '',
        quantity: ''
    });

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:5000/api/products'); // Ensure the correct URL
        if (response.ok) {
            const data = await response.json();
            setProducts(data);
        } else {
            console.error('Error fetching products');
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSellChange = (e) => {
        setSellProduct({ ...sellProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            fetchProducts();
            setProduct({ name: '', description: '', category: '', price: '', quantity: '' });
        } else {
            console.error('Error adding product');
        }
    };

    const handleSellSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sellProduct),
        });

        if (response.ok) {
            fetchProducts();
            setSellProduct({ id: '', quantity: '' });
        } else {
            const errorData = await response.json();
            console.error('Error selling product:', errorData.message);
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchProducts();
        } else {
            console.error('Error deleting product');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                />
                <input
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                />
                <input
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Price"
                    type="number"
                    required
                />
                <input
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    type="number"
                    required
                />
                <button type="submit">Add Product</button>
            </form>

            <h2>Sell Product</h2>
            <form onSubmit={handleSellSubmit}>
                <select name="id" value={sellProduct.id} onChange={handleSellChange} required>
                    <option value="" disabled>Select Product</option>
                    {products.map(prod => (
                        <option key={prod.id} value={prod.id}>{prod.name}</option>
                    ))}
                </select>
                <input
                    name="quantity"
                    value={sellProduct.quantity}
                    onChange={handleSellChange}
                    placeholder="Quantity to Sell"
                    type="number"
                    required
                />
                <button type="submit">Sell Product</button>
            </form>

            <ul>
                {products.map(prod => (
                    <li key={prod.id}>
                        {prod.name} - {prod.description} - ${prod.price} - Quantity: {prod.quantity}
                        <button onClick={() => handleDelete(prod.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;