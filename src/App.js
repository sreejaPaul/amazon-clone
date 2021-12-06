import React, { useEffect } from "react";
import Homebody from "./Homebody";
import Topbar from "./Topbar";
import Checkout from "./Checkout";
import { Route } from "react-router-dom";
import Login from "./Login";
import { auth } from './firebase';
import { useStateValue } from "./StateProvider";
import Footer from "./Footer";
import Topaddressbar from './Topaddressbar';
import Payment from "./Payment";
import Address from "./Address";
import Orders from "./Orders";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";


const promise = loadStripe("pk_test_51JzBPMSBx40pS7qHQsQvwJRYjWmwRJTFPIdw1N08UD7SHYieZ0SKZZOiBRe1Wrgp1EMQovaWDNVDFiTV7kthh90p00KplsuQt3");


function App() {
  const [{ }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("The User is ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
  }, []);
  return (
    <div className="App">
      {/* Hrader - top bar
      Home - body */}

      <Route path="/" exact>
        <Topbar />
        <Topaddressbar />
        <Homebody />
        <Footer />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/checkout" exact>
        <Topbar />
        <Checkout />
      </Route>

      <Route path="/AddressInput" exact>
        <Topbar />
        <Address />
      </Route>
      <Route path="/payment" exact>
        <Topbar />
        <Elements stripe={promise}>
          <Payment />
        </Elements>
      </Route>
      <Route path="/orders" exact>
        <Topbar />
        <Orders />
      </Route>
    </div>
  );
}

export default App;
