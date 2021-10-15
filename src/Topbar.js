import React from 'react';
import './Topbar.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

export default function Topbar() {
    const [{ basket, user }, dispatch] = useStateValue();
    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }
    return (
        <div className="header">
            <Link to="/">
                <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazonlogo" className="toplogo" />
            </Link>
            <div className="search">
                <input className="headerInput" />
                <SearchIcon className="topsearch" />
            </div>
            <div className="headerNavbar">
                {!user ?
                    <Link to={"/login"}>
                        <div className="navbarOption" onClick={handleAuthentication}>
                            <span className="firstnav">Hello Guest</span>
                            <span className="secondnav">
                                {"Sign In"}
                            </span>
                        </div>
                    </Link> :
                    <div className="navbarOption" onClick={handleAuthentication}>
                        <span className="firstnav">Hello {user?.email}</span>
                        <span className="secondnav">{"Sign Out"}</span>
                    </div>
                }
                <Link to="/orders">
                    <div className="navbarOption">
                        <span className="firstnav">Return</span>
                        <span className="secondnav">Order</span>
                    </div>
                </Link>
                <div className="navbarOption">
                    <span className="firstnav">Your</span>
                    <span className="secondnav">Prime</span>
                </div>
                <Link to="/checkout">
                    <div className="topBusketOption">
                        <ShoppingBasketIcon />
                        <span className="secondnav topBusketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
