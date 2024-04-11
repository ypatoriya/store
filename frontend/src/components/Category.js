import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './component.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CategoryTable = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [query, setQuery] = useState('');

   const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(searchTerm);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.log('No token found. User is not authenticated.');
                    navigate('/');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/allCategory', {
                    headers: {
                        'Authorization': token
                    }
                });
                if (response.status === 200) {
                    setCategories(response.data);
                }
                else {
                    console.error('Error fetching categories:', response.data.message);
                    setErrorMessage('Error fetching categories. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('Error fetching categories. Please try again later.');
            }
        }

        fetchCategories();
    }, []);

    return (
        <div className="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary mt-5 mb-3">

                <div class="container-fluid">

                    <div class="product-navbar" id="navbarSupportedContent">
                        <h2>Your Category</h2>

                    </div>

                    <div class="d-flex right-menu"> <input type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} />
                        <button className="btn btn-primary btn-sm " type="button" onClick={handleSearch}>Search</button>
                        <button className="btn btn-warning logout-button " type="button" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </nav>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
     
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.categoryName}</td>
                            <td>{category.createdBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container d-flex justify-content-between" >
                <button
                    className="btn btn-primary" onClick={() => navigate('/addCategory')}>
                    Add Category</button>
                <button
                    className="btn btn-secondary" onClick={() => navigate('/allProducts')}>
                    Back to Products</button>
            </div>
        </div>
    );
};

export default CategoryTable;