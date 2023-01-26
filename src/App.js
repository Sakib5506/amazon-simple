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

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path='/' element={<Shop></Shop>}></Route>
          <Route path='/shop' element={<Shop></Shop>}></Route>
          <Route path='/review' element={<Review></Review>}></Route>
          <Route path='/inventory' element={<Inventory></Inventory>}></Route>
          <Route path='/product/:productKey' element={<ProductDetails></ProductDetails>} ></Route>
          <Route path='/login' element={<Login></Login>} />
          <Route path='/shipment' element={<Shipment></Shipment>} />
          <Route path='*' element={<NotFound></NotFound>} ></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
