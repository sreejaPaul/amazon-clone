import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({id, image,title,price,rating, hideButton}) {
    const[{basket},dispatch] = useStateValue();
    const removeProductFromList=()=>{
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    return (
        <div className="checkoutProduct">
            <img src={image} alt="" className="checkoutProductImage"/>
            <div className="checkoutProductInfo">
                <p className="checkoutProductTitle">{title}</p>
                <p className="checkoutProductPrice">
                    <small>{"₹"}</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProductRating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p key={i}>🌟</p>
                    ))}
                </div>
                {!hideButton && (<button onClick={removeProductFromList}>Remove from Basket</button>)}
            </div>
            
        </div>
    )
}

export default CheckoutProduct;
