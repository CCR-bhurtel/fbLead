import React from 'react';
import mask_bg from '../assets/img/banner-bg.png';
import hero_bg from '../assets/img/hero-bg.png';
import DropdownGroup from './DropdownGroup';
import { Dollar, FiveStar, Location, Stelle } from './Icon';

import icon_1 from '../assets/img/icon-1.png';
import icon_2 from '../assets/img/icon-2.png';

const Banner = ({ initialConfigData, config, handleConfigChange, comunes, stelles }) => {
    const { distances, fascio } = initialConfigData;
    return (
        <section className="banner-section">
            <div className="container">
                <div className="banner-wrapper">
                    <DropdownGroup
                        handleChange={(value) => {
                            handleConfigChange('comune', value);
                        }}
                        value={config.comune || comunes[0]}
                        label="Comune"
                        icon={<Location />}
                        data={comunes}
                        zIndex={1000}
                    />
                    <DropdownGroup
                        handleChange={(value) => {
                            handleConfigChange('fascio', value);
                        }}
                        value={config.fascio}
                        label="Fascia di Prezzo "
                        smText="(giorno)"
                        icon={<Dollar />}
                        data={fascio}
                        zIndex={999}
                    />
                    <DropdownGroup
                        handleChange={(value) => {
                            handleConfigChange('stelle', value);
                        }}
                        value={config.stelle || stelles[0]}
                        label="Stelle"
                        icon={<FiveStar />}
                        data={stelles}
                        zIndex={998}
                    />
                    <DropdownGroup
                        handleChange={(value) => {
                            handleConfigChange('distance', value);
                        }}
                        value={config.distance}
                        label="Distanza dal mare"
                        icon={<Stelle />}
                        data={distances}
                        zIndex={997}
                    />
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

export default Banner;
