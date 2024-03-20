import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import ListPage from './Components/UserList/userList';
import EditPage from './Components/Edit/edit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route path="/listUser" element={<ListPage />} />
        <Route path="/edit/:userId" element={<EditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
