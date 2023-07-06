import React from 'react';
import mask_bg from '../assets/img/banner-bg.png';
import hero_bg from '../assets/img/hero-bg.png';
import DropdownGroup from './DropdownGroup';
import { Dollar, FiveStar, Location, Stelle } from './Icon';

import icon_1 from '../assets/img/icon-1.png';
import icon_2 from '../assets/img/icon-2.png';

const Banner = () => {
    return (
        <section className="banner-section">
            <div className="container z-[1]">
                <div className="banner-wrapper">
                    <DropdownGroup label="Comune" icon={<Location />} data={selectData} />
                    <DropdownGroup label="Fascia di Prezzo " smText="(per persona)" icon={<Dollar />} data={fascio} />
                    <DropdownGroup label="Stelle" icon={<FiveStar />} data={stelle} />
                    <DropdownGroup label="Distanza dal mare" icon={<Stelle />} data={distance} />
                </div>
                <img src={icon_1.src} alt="" className="icon-1" />
                <img src={icon_2.src} alt="" className="icon-2" />
            </div>
            <div
                className="hero_bg_2"
                style={{
                    mask: `url(${mask_bg.src}) no-repeat center bottom / cover`,
                    WebkitMask: `url(${mask_bg.src}) no-repeat center bottom / cover`,
                }}
            />
            <div
                className="hero_bg"
                style={{
                    background: `url(${hero_bg.src}) no-repeat center center / cover`,
                }}
            />
        </section>
    );
};
const selectData = [
    {
        name: 'Tutta l’isola',
    },
    {
        name: 'Tutta',
    },
    {
        name: 'Tutta l’isola',
    },
    {
        name: 'Tutta ',
    },
];
const fascio = [
    {
        name: '100€ - 1000€',
    },
    {
        name: '100€ - 1000€',
    },
    {
        name: '100€ - 1000€',
    },
    {
        name: '100€ - 1000€',
    },
];
const stelle = [
    {
        name: '5 Stelle',
    },
    {
        name: '15 Stelle',
    },
    {
        name: '25 Stelle',
    },
    {
        name: '35 Stelle ',
    },
];
const distance = [
    {
        name: '1 km - 5 km',
    },
    {
        name: '5 km - 10 km',
    },
    {
        name: '1 km - 15 km',
    },
    {
        name: '50km+ ',
    },
];

export default Banner;
