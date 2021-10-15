import React, { useState } from 'react';
import './Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function Subtotal() {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();
    const [vis, setvis] = useState("none");

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            {"Subtotal (" + basket.length + "items):"}<strong>{value}</strong>
                        </p>
                        <small className="subtotalGift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)} 
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
            {(basket.length <= 0) ?
                <Popup trigger={<button >Proceed to Checkout</button>} modal>
                    {close => (
                        <div className="modal" position="right center">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="modaldiv"> Add products in the basket to proceed further. </div>
                        </div>
                    )}
                </Popup> :
                (user !== null) ?
                    <button onClick={e => history.push('/AddressInput')}>Proceed to Checkout</button> :
                    <button onClick={e => history.push('/login')}>Proceed to Checkout</button>}
        </div>
    )
}

export default Subtotal
