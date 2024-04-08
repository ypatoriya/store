import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './component.css';

const ProductForm = ({ onSubmit }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        categoryId: '',
        price: '',
        images: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleShowAllProducts = () => {
        navigate('/allProducts');
    }

    const handleCancel = () => {
        navigate('/allProducts');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.categoryId || !formData.price || !formData.images) {
            setErrorMessage('All fields are required!');
            return;
        }
        const { name, description, categoryId, price, images } = formData;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('price', price);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/api/createProducts', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Product created successfully');

                } else {
                    console.error('Error creating product:', xhr.responseText);

                }
            }
        };
        xhr.send(
            JSON.stringify({
                name,
                description,
                categoryId,
                price,
                images: images.name
            })
        );
        navigate('/allProducts');
    };

    return (
        <Container>
            <h1 className="text-center mt-5">Add Product</h1>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    <div>
                        <div className="form-group mx-4 mt-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group mx-4 mt-3">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="form-group mx-4 mt-3">
                            <label htmlFor="categoryId">Category ID</label>
                            <input type="text" className="form-control" id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} />
                        </div>
                        <div className="form-group mx-4 mt-3">
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
                        </div>
                        <div className="form-group mx-4 mt-3">
                            <label htmlFor="images">Images</label>
                            <div className="custom-file mx-3 mt-3">
                                <input type="file" className="custom-file-input" id="images" name="images" onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="addproduct-buttons mt-5">
            <div>
                    <button className="btn btn-primary" onClick={handleShowAllProducts}>
                            Show All Products
                        </button>
                </div>
                <div className='right-section'>
                    <button className="btn btn-danger " onClick={handleCancel}>
                            Cancel
                        </button>
                    <button className="btn btn-primary " onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
           
        </Container>

    );
};

export default ProductForm;
