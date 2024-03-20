import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../api';
import { toast } from 'react-toastify';

const ListPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchUsers = async (page, limit) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS.listUser, {
        params: {
          page: page + 1,
          limit: limit
        },
        headers: {
          token: token
        }
      });
      setUsers(response.data.result.docs);
      setTotalCount(response.data.result.totalDocs);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleEditUser = (userId) => {
    navigate(`/edit/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = sessionStorage.getItem('token');
      console.log(API_ENDPOINTS.deleteUser);
      const response = await axios.delete(`${API_ENDPOINTS.deleteUser}/${userId}`, {
        headers: {
          token: token
        }
      });

      fetchUsers(page, rowsPerPage);
      toast.success(response.data.responseMessage, {
        position: 'top-center'
      })
      navigate("/")
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteIconClick = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log(userId)
      handleDeleteUser(userId);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
        <h2>List with Details</h2>
        <div></div>
      </div>
      <div className="card p-4">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>User Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{page * rowsPerPage + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.user_role}</td>
                <td>{user.user_status}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                    startIcon={<SettingsIcon />}
                    onClick={() => handleEditUser(user._id)}
                  >
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteIconClick(user._id)}
                  >
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 30, 40]}
        />
      </div>
    </div>
  );
};

export default ListPage;
