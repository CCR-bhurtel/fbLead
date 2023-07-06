import React from 'react';
import img1 from '../assets/img/offers/1.png';
import img2 from '../assets/img/offers/2.png';
import img3 from '../assets/img/offers/3.png';
import img4 from '../assets/img/offers/4.png';
import img5 from '../assets/img/offers/5.png';
import img6 from '../assets/img/offers/6.png';
import img7 from '../assets/img/offers/7.png';
import OfferItem from './OfferItem';
import Shapes from './Shapes';
const MainSection = () => {
    return (
        <>
            <section className="main-section">
                <div className="shapes">
                    <Shapes />
                </div>
                <div className="container_new">
                    <h3 className="text-base font-medium m-title">Le migliori offerte per te!</h3>
                    <div className="d-flex flex-column gap-36">
                        {data?.map((item, i) => (
                            <OfferItem offer key={i} index={i + 1} {...item} />
                        ))}
                    </div>
                    <br />
                    <br />
                    <h3 className="text-base font-medium m-title">Ecco altre offerte che ti potrebbero piacere.</h3>
                    <div className="d-flex flex-column gap-36">
                        {data2?.map((item, i) => (
                            <OfferItem key={i} index={i + '--' + 1} {...item} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

const data = [
    {
        img: [img1.src, img1.src, img1.src],
        ticker: 'Più vicino al mare',
        price: '82,15€',
    },
    {
        img: [img2.src, img2.src, img2.src],
        ticker: 'Più Venduto',
        price: '76,15€',
    },
    {
        img: [img3.src, img3.src, img3.src],
        ticker: 'Prezzo più basso',
        price: '69,15€',
    },
];
const data2 = [
    {
        img: [img4.src, img4.src, img4.src],
        price: '82,15€',
    },
    {
        img: [img5.src, img5.src, img5.src],
        price: '$64.15',
    },
    {
        img: [img6.src, img6.src, img6.src],
        price: '$92.15',
    },
    {
        img: [img7.src, img7.src, img7.src],
        price: '$99.15',
    },
    {
        img: [img4.src, img4.src, img4.src],
        price: '82,15€',
    },
    {
        img: [img5.src, img5.src, img5.src],
        price: '$64.15',
    },
    {
        img: [img6.src, img6.src, img6.src],
        price: '$92.15',
    },
    {
        img: [img7.src, img7.src, img7.src],
        price: '$99.15',
    },
];

export default MainSection;
