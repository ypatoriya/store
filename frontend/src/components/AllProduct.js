import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './component.css';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleSearch = (event) => {
     navigate("/search");
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
    

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/')
    }

    const handleClick = () => {
        navigate('/addProduct');
    }

    const handleImageClick = () => {

    }

    const handleDelete = () => {

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
            <table className="table">
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
                            <td>{<button className="btn btn-primary btn-sm" onClick={() => navigate(`/edit/${product._id}`)}>Edit</button>}</td>
                            <td>{<button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary btn-sm" type="button" onClick={handleClick}>Add Product</button>

            <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</button>
            <span className="mx-2">Page {page}</span>

            <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleNextPage} disabled={products.length < pageSize}>Next Page</button>
        </div>
    );
};

export default ProductTable;
