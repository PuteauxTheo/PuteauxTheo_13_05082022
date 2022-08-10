import React from "react";
import ReactDOM from 'react-dom/client';
import './style/css/style.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import User from './pages/User.jsx'
import { Provider } from "react-redux";
import store from "./utils/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<SignIn />}></Route>
          <Route path='/profile' element={<User />}></Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>

)