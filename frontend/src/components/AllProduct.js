import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/')
    }

    const handleImageClick = () => {

    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:5000/api/products', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText);
                            setProducts(response);
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

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary mt-5 mb-3">

                <div class="container-fluid">

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <h2>Product list</h2>

                    </div>

                    <div class="d-flex align-items-center">
                        <div class="dropdown">

                            <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleSearch}>Search</button>
                            <button className="btn btn-warning btn-sm mx-5" type="button" onClick={handleLogout}>Log Out</button>
                            <a class="navbar-brand mt-2 mt-lg-0" href='' onClick={handleImageClick}>
                                <img
                                    src=""
                                    height="15"
                                    alt="user"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category ID</th>
                        <th>Price</th>
                        <th>Images</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.categoryId}</td>
                            <td>{product.price}</td>
                            <td>
                                {Array.isArray(product.images) && product.images.map((image, i) => (
                                    <img key={i} src={image} alt={`Product ${i}`} style={{ maxWidth: '100px' }} />
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
