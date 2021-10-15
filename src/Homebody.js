import React from 'react';
import './Homebody.css';
import Product from './Product';


export default function Homebody() {

    return (
        <div className="home">
            <div className="homeContainer">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2021/desktop-1x._CB658860139_.jpg" alt="backgroundImage" className="backgroundImage" />
                <div className="homeRow">
                    <Product id="55956" title="Samsung Galaxy M12 (Blue,4GB RAM, 64GB Storage) 6000 mAh with 8nm Processor  " price={9499.00} image="https://m.media-amazon.com/images/I/416npwZlh7L.jpg" rating={5}/>
                    <Product id="99969" title="Mi Power Bank 3i 20000mAh | 18W Fast PD Charging | Input- Type C and Micro USB| Triple Output" price={1599.00} image="https://m.media-amazon.com/images/I/71lVwl3q-kL._SL1500_.jpg" rating={4}/>
                    <Product id="11233" title="GOQii Smart Vital Fitness SpO2, body temperature and blood pressure tracker with 3 months personal Coaching" price={3999.00} image="https://m.media-amazon.com/images/I/51UUJpcldDL._SL1000_.jpg" rating={4}/>
                    <Product id="55555" title="PHILIPS BHS736/00 Kerashine Titanium Wide Plate Straightener With SilkProtect Technology, Black" price={2198.00} image="https://m.media-amazon.com/images/I/417RNQcL6yS.jpg" rating={5}/>
                </div>
                <div className="homeRow">
                <Product id="666666" title="boAt Airdopes 121v2 TWS Earbuds with Bluetooth V5.0, Immersive Audio, Up to 14H Total Playback, Instant Voice Assistant(Active Black)" price={899.00} image="https://m.media-amazon.com/images/I/71ByNT34bfL._SL1500_.jpg" rating={4}/>
                <Product id="777777" title="HealthSense BP100 Heart-Mate BP 100 Digital BP Monitor with Talking Function" price={1199} image="https://m.media-amazon.com/images/I/71cJXVjDyTL._SX355_.jpg" rating={4}/>
                <Product id="999999" title="AGARO Majestic 25 Litres Oven Toaster Griller, Motorised Rotisserie Cake Baking OTG with 5 Heating Mode, (Black)" price={3698.00} image="https://m.media-amazon.com/images/I/81XHOQoJJGL._SL1500_.jpg" rating={3}/>
                    
                </div>
                <div className="homeRow">
                    <Product id="11111" title="Sony Bravia 164 cm (65 inches) 4K Ultra HD Smart LED Google TV KD-65X80AJ (Black) (2021 Model) | with Alexa Compatibility" price={110990.00}
                    image="https://m.media-amazon.com/images/I/81aAdbBzGTS._SL1500_.jpg" rating={5}/>
                    <Product id="12345" title="LG 165.1 cm (65 inches) 4K Ultra HD Smart OLED TV 65A1PTZ (Dark Meteo Titan) (2021 Model)" price={189999.00} image="https://m.media-amazon.com/images/I/81I1sw-FBgL._AC_UY218_.jpg" rating={4}/>
                </div>
            </div>
        </div>
    )
}
