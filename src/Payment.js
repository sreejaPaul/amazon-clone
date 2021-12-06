import React, { useState, useEffect } from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { db } from './firebase';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from './axios';

function Payment() {
    const [{ basket, user, address, filteredBasket }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    //IMP Part
    useEffect(() => {
        //generate stripe secret used to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payment/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
        //when basket changes, it will make req nd update special stripe req
    }, [basket]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentItent = Payment Confirmation
            db
                .collection("users")
                .doc(user?.uid)
                .collection("orders")
                .doc(paymentIntent.id)
                .set({
                    basket: filteredBasket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });
            dispatch({
                type: 'EMPTY_BASKET',
            })
            history.replace('/orders')

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders')
        })
    }

    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

    useEffect(() => {
        console.log(filteredBasket)
    }, [filteredBasket]);

    return (
        <div>
            <div className='payment'>
                <div className='payment__container'>
                    <h1>
                        Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                    </h1>


                    {/* Payment section - delivery address */}
                    <div className='payment__section'>
                        <div className='payment__title'>
                            <h3>Delivery Address Details</h3>
                        </div>
                        <div className='payment__address'>
                            {(address !== null) ?
                                <div>
                                    <div className="innerdiv">
                                        <div className="indiv"><b>Email  </b></div>
                                        <div className="indiv2">{user?.email}</div>
                                    </div>
                                    <div className="innerdiv">
                                        <div className="indiv"><b>Contact Number </b></div>
                                        <div className="indiv2">{address.Number}</div>
                                    </div>
                                    <div className="innerdiv">
                                        <div className="indiv"><b>Address  </b></div>
                                        <div className="indiv2">{address.Address + "," + address.City + "," + address.State}</div>
                                    </div>
                                    <div className="innerdiv">
                                        <div className="indiv"><b>Pincode  </b></div>
                                        <div className="indiv2">{address.Pin}</div>
                                    </div>
                                </div> : ""}
                        </div>
                    </div>

                    {/* Payment section - Review Items */}
                    <div className='payment__section'>
                        <div className='payment__title'>
                            <h3>Review items and delivery</h3>
                        </div>
                        <div className='payment__items'>
                            {filteredBasket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                    count={item.count}
                                />
                            ))}
                        </div>
                    </div>


                    {/* Payment section - Payment method */}
                    <div className='payment__section'>
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange} />
                                <div className="payment_prizeContainer">
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"₹"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing </p> :
                                            "Buy Now"}</span>
                                    </button>
                                </div>
                            </form>

                        </div>
                        {error && <div>{error}</div>}
                        <div>
                            <div className="cred">
                                <span style={{fontWeight:"bold", fontStyle:"italic"}}>Card Credentials:</span>
                                <br/>
                                <span style={{fontWeight:"bold"}}>Card No:</span> 4242 4242 4242 4242
                                <br/>
                                <span style={{fontWeight:"bold"}}>Date:</span> 04 / 24
                                <br/>
                                <span style={{fontWeight:"bold"}}>CVC:</span> 242 , <span style={{fontWeight:"bold"}}>Zip:</span> 42424
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
