import React from 'react';
import img1 from '../assets/img/offers/1.png';

import OfferItem from './OfferItem';
import Shapes from './Shapes';
const MainSection = ({ hotels, checkInDate, checkOutDate }) => {
    return (
        <>
            <section className="main-section">
                <div className="shapes">
                    <Shapes />
                </div>
                <div className="container">
                    <h3 className="text-base font-medium m-title">Le migliori offerte per te!</h3>
                    <div className="d-flex flex-column gap-36">
                        {hotels.slice(0, 3).map((hotel, i) => {
                            return (
                                <>
                                    <OfferItem
                                        offer
                                        key={i}
                                        index={i + 1}
                                        checkInDate={checkInDate}
                                        checkOutDate={checkOutDate}
                                        hotel={{ ...hotel, img: [img1.src, img1.src, img1.src] }}
                                    />
                                </>
                            );
                        })}
                    </div>
                    <br />
                    <br />
                    <h3 className="text-base font-medium m-title">Ecco altre offerte che ti potrebbero piacere.</h3>
                    {hotels.slice(3).map((hotel, i) => {
                        return (
                            <div style={{ marginTop: '2rem' }}>
                                <OfferItem
                                    offer={false}
                                    key={i}
                                    index={i + '--' + 1}
                                    checkInDate={checkInDate}
                                    checkOutDate={checkOutDate}
                                    hotel={{ ...hotel, img: [img1.src, img1.src, img1.src] }}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default MainSection;
