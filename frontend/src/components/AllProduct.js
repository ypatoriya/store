import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './component.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Search from './Search';


const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState([])
    const [query, setQuery] = useState('');
    const [deletedProductId, setDeletedProductId] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                console.log('No token found. User is not authenticated.');
                navigate('/');
                return;
            }

            if (query === "") {
                // Load all products if no search query
                const response = await fetch(`http://localhost:5000/api/products?page=${page}&pageSize=${pageSize}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Request failed. Status:', response.status);
                }
            } else {
                // Load filtered products if there's a search query
                const response = await fetch(`http://localhost:5000/api/search?name=${query}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Request failed. Status:', response.status);
                }
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const navigate = useNavigate();

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleCategory = () => {
        navigate('/category');
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/')
    }

    const handleClick = () => {
        navigate('/addProduct');
    }

    const handleImageClick = () => {

    }

    const handleMail = () => {
        navigate('/email');
    }

    const handleDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this product?');

        if (isConfirmed) {
            deleteProduct(id);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.log('No token found. User is not authenticated.');
                navigate('/');
                return;
            }

            const response = await fetch(`http://localhost:5000/api/deleteProducts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                },
            });

            if (response.ok) {
                setErrorMessage('Product deleted successfully');
                console.log('Product deleted successfully');
                // Set the deleted product's ID
                setDeletedProductId(id);
            } else {
                setErrorMessage("You are not authorized to delete this product. Failed to delete product.");
                console.error('Failed to delete product. Status:', response.status);
            }
        } catch (error) {
            setErrorMessage('Error deleting product. Network error');
            console.error('Error deleting product. Network error:', error);
        }
    };


    useEffect(() => {

        const fetchProducts = async () => {
            try {

                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.log('No token found. User is not authenticated.');
                    navigate("/")
                }
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `http://localhost:5000/api/products?page=${page}&pageSize=${pageSize}`, true);
                xhr.setRequestHeader('Authorization', token);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText);
                            setProducts(response);
                            console.log(response);
                        } else {
                            console.error('Error fetching products:', xhr.statusText);
                        }
                    }
                };
                xhr.send();
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.log('No token found. User is not authenticated.');
                    navigate("/");
                    return;
                }

                const headers = {
                    'Authorization': token
                };

                const response = await axios.get(`http://localhost:5000/api/users/profile`, { headers });
                setUser(response.data.user);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
        fetchProducts();
    }, [deletedProductId, page, pageSize]);


    return (
        <div className="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary mt-5 mb-3">

                <div class="container-fluid">

                    <div class="product-navbar" id="navbarSupportedContent">
                        <h2>Product list</h2>

                    </div>

                    <div class="d-flex right-menu"> <input type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} />
                        <button className="btn btn-primary btn-sm " type="button" onClick={handleSearch}>Search</button>
                        <button className="btn btn-warning logout-button " type="button" onClick={handleLogout}>Log Out</button>
                        <a class="navbar-brand mt-2 mt-lg-0" href='' onClick={handleImageClick}>
                            <img
                                src={`http://localhost:5000${user.profile_pic}`}
                                height="30"
                                width="30"
                                alt="user" />
                        </a>
                    </div>
                </div>
            </nav>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {/* <table className="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(products) && products.map((product, index) => (
                        <tr key={index}>
                            <td>
                                <div>
                                    {product.images && product.images.split(',').map((imagePath, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:5000${imagePath}`}
                                            alt={`Product ${index}`}
                                            style={{ width: '100px', height: '100px', margin: '10px' }}
                                        />
                                    ))}
                                </div>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category_name}</td>
                            <td>{product.price}</td>

                            <td>{<button className="btn btn-primary btn-sm" onClick={() => navigate(`/editProduct/${product.id}`)}>Edit</button>}</td>
                            <td>{<button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}


            <div className='main-card-section'>
                {Array.isArray(products) && products.map((product, index) => (
                    <div key={index} className='card'>
                        <div>
                            {product.images && product.images.split(',').map((imagePath, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:5000${imagePath}`}
                                    alt={`Product ${index}`}
                                    style={{ width: '100px', height: '100px', margin: '10px' }}
                                />
                            ))}
                        </div>
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <h3><b>{product.price}</b></h3>
                        </div>
                    </div>
                ))}
            </div>


            <div className='allproduct-button'>
                <div>
                    <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</button>
                    <span className="mx-2">Page {page}</span>

                    <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleNextPage} disabled={products.length < pageSize}>Next Page</button>
                </div>
                <button className="btn btn-primary btn-sm" type="button" onClick={handleClick}>Add Product</button>
                <button className="btn btn-primary btn-sm" type="button" onClick={handleMail}>Send Mail</button>
                <button className="btn btn-secondary btn-sm" type="button" onClick={handleCategory}>Category</button>
            </div>
        </div>
    );
};

export default ProductTable;
