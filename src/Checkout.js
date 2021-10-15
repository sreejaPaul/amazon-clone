import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

export default function Checkout() {
    const [{ basket,user }, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="ckeckoutLeft">
                <img src="https://www.idlenerd.com/wp-content/uploads/2018/06/amazon-prime-day-india-1.gif" alt="" className="checkoutAd" />
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkoutTitle">Your Shopping Basket</h2>
                    {
                        basket.map((item,index) => (
                            <CheckoutProduct
                                id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} key={index}/>
                        ))
                    }
                </div>
            </div>
            <div className="checkoutRight">
                <Subtotal />
            </div>
        </div>
    )
}
