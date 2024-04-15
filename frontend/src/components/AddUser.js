import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { MDBRadio } from 'mdb-react-ui-kit';

const AddBook = () => {

  // const schema  = Yup.object().shape({
  //   firstName: Yup.string().required().min(3, "3 chars"),
  //   email: Yup.string().email().required(),
  //   password: Yup.string().required().min(8)
  // })

  // const {
  //   register,
  //   handleSubmit,
  //   formState: {errors},
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  const [errorMessage, setErrorMessage] = useState()
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile_pic: null,
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/')
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    

    if (!formData.firstName || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('All fields are required!');
      return;
    }


    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      console.log("Passwords don't match");
      return;
    }
    else {
        
      try {

        const response = await axios.post('http://localhost:5000/api/users/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status >= 200) {
          console.log('Registered successfully.');
          navigate('/');
        } else {
          console.log(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Error registering user:', error.message || JSON.stringify(error));
      }
    }

  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      profile_pic: event.target.files[0],
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Sign Up</h2>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleFormSubmit}>

            <div className="mb-3 mt-5">
             
              <input type="text" required className="form-control" placeholder='First Name' id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />

            </div>

            <div className="mb-3">
            
              <input type="text" required className="form-control" placeholder='Last Name' id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
          
              <input type="email" required className="form-control" placeholder='Email' id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
            
              <input type="password" required className="form-control" placeholder='Password' id="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
         
              <input type="password" required className="form-control" placeholder='Confirm Password' id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
            <label className='mb-3'>Gender</label> <br></br>
            <MDBRadio name='gender' id='gender' value='Male' label='Male' onChange={handleInputChange} inline />
            <MDBRadio name='gender' id='gender' value='Female' label='Female' onChange={handleInputChange} inline />
            </div>


            <div className="mb-3">
           
              <input type="text" required className="form-control" placeholder='Hobbies' id="hobbies" name="hobbies" value={formData.hobbies} onChange={handleInputChange} />
            </div>

            <div className='mb-3'>

              <label>Profile Picture</label>
              <input type="file" className="form-control" id="profile_pic" name="profile_pic" onChange={handleFileChange} />
            </div>

            <div className='button'>

              <button
                className="btn btn-primary btn-sm mx-1 Login"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="btn btn-primary btn-sm mx-1 Register"
                type="button"
                onClick={handleFormSubmit}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;