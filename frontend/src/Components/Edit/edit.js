import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_ENDPOINTS } from '../../api';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    console.log(userId);
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        email: '',
        dateOfBirth: '',
        user_role: '',
        user_status: ''
    });

    useEffect(() => {
        fetchUserData(userId);
    }, [userId]);

    const fetchUserData = async (userId) => {
        const token = sessionStorage.getItem('token');
        try {

            const response = await axios.get(`${API_ENDPOINTS.findUser}/${userId}`, {
                headers: {
                    token: token
                }
            });
            const userData = response.data.result;
            delete userData.password;
            delete userData.__v;
            delete userData.updatedAt
            delete userData.createdAt
            setFormData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    useEffect(() => {
        fetchUserData(userId);
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        try {
            const response = await axios.put(API_ENDPOINTS.updateUser, formData, {
                headers: {
                    token: token
                }
            });
            toast.success(response.data.responseMessage, {
                position: 'top-center'
            })
            navigate("/listUser")
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center gray-bg p-5">
            <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Edit User Details</h2>
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
                            name="user_role"
                            value={formData.user_role}
                            onChange={handleChange}
                            required
                        >
                            <option value="ADMIN">Admin</option>
                            <option value="PUBLISHER">Publisher</option>
                            <option value="REVIEWER">Reviewer</option>
                            <option value="MODERATOR">Moderator</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formBasicStatus" className="mb-3">
                        <Form.Label>User Status</Form.Label>
                        <Form.Select
                            name="user_status"
                            value={formData.user_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="ACTIVE">Active</option>
                            <option value="SUSPENDED">Suspended</option>
                            <option value="INACTIVE">Inactive</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Edit;
