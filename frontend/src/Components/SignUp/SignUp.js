import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_ENDPOINTS } from '../../api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    password: '',
    role: '' 
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      role: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.warn('Password and confirmPassword are not same', {
        position: "top-center",
      })
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth,
      password: formData.password,
      role: formData.role
    };
    try {
      const response = await axios.post(API_ENDPOINTS.signUp, payload);
      toast.success(response.data.responseMessage, {
        position: 'top-center',
      })
      navigate("/")
    } catch (error) {
      console.error('Signup failed:', error.response.data);
    }
  };

  return (
    <div className=" d-flex justify-content-center align-items-center  gray-bg p-5">
      <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate" className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Your Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicRole" className="mb-3">
            <Form.Label>User Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              required
            >
              <option value="ADMIN">Admin</option>
              <option value="PUBLISHER">Publisher</option>
              <option value="REVIEWER">Reviewer</option>
              <option value="MODERATOR">Moderator</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
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

          <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
