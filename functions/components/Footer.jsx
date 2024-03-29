import React, { useEffect, useState } from 'react';
// import EventListener from "react-event-listener";
import DropdownGroup from './DropdownGroup';
import { Calendar, Dollar, FiveStar, Location, SearchIcon, Star, Stelle } from './Icon';

import Calender from './calender/Calender';

const Footer = ({ initialConfigData, config, setConfig, comunes, datePickerOpen }) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const handleKeyboardEvent = (event) => {
        setIsKeyboardOpen(event.detail.isKeyboardOpen);
    };

    const [footerConfig, setFooterConfig] = useState({ ...config, comune: config.comune || comunes[0] });
    const handleFooterConfig = (name, value) => {
        setFooterConfig({ ...footerConfig, [name]: value });
    };

    // calender
    const [isCalender, setIsCalender] = useState(false);
    const [checkData, setCheckData] = useState({
        start: footerConfig.checkInDate,
        end: footerConfig.checkOutDate,
    });

    const handleSubmit = () => {
        setConfig({
            ...footerConfig,
            checkInDate: checkData.start,
            checkOutDate: checkData.end,
        });
    };

    const [isMobile, setIsMobile] = useState(false);
    const checkHandler = (e, source) => {
        e.target.blur();
        setIsCalender(true);
    };

    useEffect(() => {
        setIsMobile(/Mobi|Android/i.test(window.navigator.userAgent));
    }, []);

    const options = (isMobile && {
        month: 'long',
        day: 'numeric',
    }) || {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const { stelles, distances, fascio } = initialConfigData;

    return (
        <footer style={{ position: isKeyboardOpen || datePickerOpen ? 'relative' : 'sticky' }}>
            {/* <EventListener
        target="window"
        onResize={handleKeyboardEvent}
        onScreenResize={handleKeyboardEvent}
      /> */}
            <div className="container-fluid">
                <div
                    style={{ zIndex: -1 }}
                    className="footer-wrapper d-none d-sm-flex align-items-center justify-center"
                >
                    {/* <DropdownGroup
                        handleChange={(value) => handleFooterConfig('comune', value)}
                        value={footerConfig.comune}
                        label="Comune"
                        icon={<Location />}
                        data={comunes}
                        position="top"
                    />
                    <DropdownGroup
                        handleChange={(value) => handleFooterConfig('distance', value)}
                        label="Distanza dal mare"
                        name="distance"
                        icon={<Stelle />}
                        value={footerConfig.distance}
                        data={distances}
                        position="top"
                    />
                    <DropdownGroup
                        handleChange={(value) => handleFooterConfig('fascio', value)}
                        label="Fascia di Prezzo "
                        name="fascio"
                        smText="(giorno)"
                        icon={<Dollar />}
                        value={footerConfig.fascio}
                        data={fascio}
                        position="top"
                    />
                    <DropdownGroup
                        handleChange={(value) => handleFooterConfig('stelle', value)}
                        label="Stelle"
                        name="stelle"
                        icon={<FiveStar />}
                        value={footerConfig.stelle}
                        data={stelles}
                        position="top"
                    /> */}
                    <div className="custom-dropdown">
                        <label htmlFor="checkin">Check In</label>
                        <input
                            type="text"
                            value={
                                (checkData.start && new Date(checkData.start).toLocaleDateString('it-IT', options)) ||
                                new Date().toLocaleDateString('it-IT', options)
                            }
                            onClick={(e) => checkHandler(e)}
                        />
                        <span className="icon">
                            <Calendar />
                        </span>
                    </div>
                    <div className="custom-dropdown" style={{ marginLeft: '5rem' }}>
                        <label htmlFor="checkin">Check Out</label>
                        <input
                            type="text"
                            value={
                                (checkData.end && new Date(checkData.end).toLocaleDateString('it-IT', options)) ||
                                new Date().toLocaleDateString('it-IT', options)
                            }
                            onClick={(e) => checkHandler(e)}
                        />
                        <span className="icon">
                            <Calendar />
                        </span>
                    </div>

                    {/* <button onClick={handleSubmit} type="submit" className="cmn-btn d-none d-sm-flex">
                        <SearchIcon /> Find a Best Hotel
                    </button> */}
                </div>
                <div className="footer-wrapper d-sm-none custom-dropdown-wrp">
                    <div className="custom-dropdown">
                        <label htmlFor="checkin">Check In</label>
                        <input
                            type="text"
                            value={
                                (checkData.start && new Date(checkData.start).toLocaleDateString('it-IT', options)) ||
                                new Date().toLocaleDateString('it-IT', options)
                            }
                            onClick={(e) => checkHandler(e)}
                        />
                        <span className="icon">
                            <Calendar />
                        </span>
                    </div>
                    <div className="custom-dropdown">
                        <label htmlFor="checkin">Check Out</label>
                        <input
                            type="text"
                            value={
                                (checkData.end && new Date(checkData.end).toLocaleDateString('it-IT', options)) ||
                                new Date().toLocaleDateString('it-IT', options)
                            }
                            onClick={(e) => checkHandler(e)}
                        />
                        <span className="icon">
                            <Calendar />
                        </span>
                    </div>
                </div>
            </div>

            {isCalender && (
                <Calender
                    config={footerConfig}
                    setConfig={setConfig}
                    handler={setIsCalender}
                    setCheckData={setCheckData}
                />
            )}
        </footer>
    );
};

export default Footer;
