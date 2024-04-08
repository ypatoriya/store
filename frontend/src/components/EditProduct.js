import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  console.log(id)


  useEffect(() => {
    const fetchProductData = async () => {

      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          console.log('No token found. User is not authenticated.');
          navigate('/');
          return;
        }
        const response = await fetch(`http://localhost:5000/api/productById/${id}`, {
          headers: {
            'Authorization': token
          }
        });
        
        if (response.status === 200) {
          const data = await response.json();
          setProduct(data);
          console.log(data);
        } else if (response.status === 401) {
          console.log('Unauthorized access. Token may be invalid or expired.');
          navigate('/');
        } else {
          console.log('Error fetching product data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleShowAllBook = () => {
    navigate('/allBooks');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!product.name || !product.description || !product.categoryId || !product.price || !product.image ) {
      setErrorMessage('All fields are required!');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        console.log('Product updated successfully');
        navigate('/allProducts');
      } else {
        console.error('Failed to update product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Update Product</h2>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID  
            </label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={product.id || ''} // || operator to handle undefined values
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">name</label>
            <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={product.description} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">Published Year</label>
            <input type="text" className="form-control" id="categoryId" name="categoryId" value={product.categoryId} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Quantity Available</label>
            <input type="text" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} />
          </div>
        
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input type="file" className="form-control" id="image" name="image" value={product.image} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Update Book</button>
          <button type="submit" className="btn btn-primary mx-5"onClick={handleShowAllBook}>Show All Books</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;