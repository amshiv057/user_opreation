import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_ENDPOINTS } from '../../api';
import Avatar from '@mui/material/Avatar'; // Import Avatar component from Material-UI
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINTS.signIn, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { token } = response.data.result;
      sessionStorage.setItem('token', token);
      toast.success(response.data.responseMessage, {
        position: 'top-center',
      })
      navigate('/listUser');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 gray-bg">
      <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <div className="d-flex justify-content-center mb-4">
          <Avatar
            alt="Avatar"
            src="/static/images/avatar.png"
            style={{
              width: '100px',
              height: '100px',
              border: '2px solid #007bff', // Border
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Shadow
              backgroundColor: '#f0f0f0' // Background Color
            }}
          />
        </div>
        <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          <Form.Group controlId="formBasicEmail" className="mb-3 w-100">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3 w-100">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3"
            style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
          >
            Login
          </Button>

          <p className="text-center mb-0">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
