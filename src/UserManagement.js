import React, { useEffect, useState } from 'react';
import './UserManagement.css'; // Import the CSS file

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ id: '', name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing 
                ? `http://localhost:5000/api/users/${formData.id}` 
                : 'http://localhost:5000/api/users';

            // Create a new object without id for POST request
            const dataToSend = isEditing ? formData : { name: formData.name, email: formData.email };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.statusText} - ${errorText}`);
            }

            setFormData({ id: '', name: '', email: '' });
            setIsEditing(false);
            fetchUsers();
        } catch (error) {
            console.error('Error adding/updating user:', error);
        }
    };

    const handleEdit = (user) => {
        setFormData(user);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error deleting user with ID ${id}: ${response.statusText}`);
            }
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
            </form>

            <h3>User List</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <span>{user.name} - {user.email}</span>
                        <div>
                            <button onClick={() => handleEdit(user)}>Edit</button>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;