import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h1>Email: {loggedInUser.email}</h1>

      <Router>
        <Header></Header>
        <Routes>
          <Route exact path='/' element={<Shop></Shop>}></Route>
          <Route path='/shop' element={<Shop></Shop>}></Route>
          <Route path='/review' element={<Review></Review>}></Route>

          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route path='/orders' element={<Inventory></Inventory>} />
          </Route>

          <Route path='/product/:productKey' element={<ProductDetails></ProductDetails>} ></Route>

          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route path='/shipment' element={<Shipment></Shipment>} />
          </Route>

          <Route path='/login' element={<Login></Login>} />

          <Route path='*' element={<NotFound></NotFound>} ></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
