import React, { useState } from 'react'; 
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ onSubmit }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        categoryName: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowAllProducts = () => {
        navigate('/category');
    }

    const handleCancel = () => {
        navigate('/category');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log('No token found. User is not authenticated.');
            navigate('/');
            return;
        }

        if (!formData.categoryName) {
            setErrorMessage('All fields are required!');
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/api/createCategory', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Category created successfully');

                } else {
                    console.error('Error creating category:', xhr.responseText);

                }
            }
        };
        xhr.send(JSON.stringify(formData));
        console.log(formData);
        navigate('/category');
    };

    return (
        <Container>
            <h1 className="text-center mt-5">Add Category</h1>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    <div>
                        <div className="form-group mx-3 mt-3">
                            <label htmlFor="categoryName">Category Name</label>
                            <input type="text" className="form-control" id="categoryName" name="categoryName" value={formData.categoryName} onChange={handleChange} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-between mt-3">
                <Col>
                    <button className="btn btn-primary" onClick={handleShowAllProducts}>
                        Show All Categories
                    </button>
                </Col>
                <Col className="text-right">
                    <button className="btn btn-danger mr-2 mx-3" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-primary mr-2 mx-3" onClick={handleSubmit}>
                        Submit
                    </button>
                </Col>
            </Row>
        </Container>

    );
};

export default ProductForm;
