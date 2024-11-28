import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement'; // Import UserManagement
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <Router>
            <div>
                <h1>Wings Management System</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Product Management</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/user-management">User Management</Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    <Routes>
                        <Route path="/" element={<ProductManagement />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/user-management" element={<UserManagement />} /> {/* Add this route */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;