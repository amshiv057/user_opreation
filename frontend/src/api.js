const BASE_URL = 'http://localhost:4000';

const API_ENDPOINTS = {
    signUp: BASE_URL + '/api/v1/user/createUser',
    signIn: BASE_URL + '/api/v1/user/loginUser',
    listUser: BASE_URL + '/api/v1/user/userList',
    findUser: BASE_URL + '/api/v1/user/findUser',
    updateUser: BASE_URL + '/api/v1/user/updateUser',
    deleteUser: BASE_URL + '/api/v1/user/deleteUser'
};

export { API_ENDPOINTS };
