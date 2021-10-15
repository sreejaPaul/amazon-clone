import React from 'react'
import './Product.css';
import { useStateValue } from './StateProvider';

export default function Product({id, title, image, price, rating}) {
    const[{basket},dispatch] = useStateValue();
    const addToBasket = ()=>{
        //dispatch the item into data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price:price,
                rating: rating
            }
        })
    }
    return (
        <div className="product">
            <div className="productDetails">
                <p>{title}</p>
                <p className="productPrice">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="productRating">
                    {
                        Array(rating).fill().map((_,index)=>{
                            return <p key={index}>🌟</p>
                        })
                    }

                </div>
            </div>
            <img src={image} alt="product"/>
            <button onClick={addToBasket}>Add to Basket</button>
            
        </div>
    )
}
