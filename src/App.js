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
        <Payment />
      </Route>
      <Route path="/orders" exact>
        <Topbar />
        <Orders />
      </Route>
    </div>
  );
}

export default App;
