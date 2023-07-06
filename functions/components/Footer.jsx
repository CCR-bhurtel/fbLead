import React, { useEffect, useState } from 'react';
// import EventListener from 'react-event-listener';
import DropdownGroup from './DropdownGroup';
import { Calendar, Dollar, FiveStar, Location, SearchIcon, Stelle } from './Icon';

import Calender from './calender/Calender';

const Footer = () => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const handleKeyboardEvent = (event) => {
        setIsKeyboardOpen(event.detail?.isKeyboardOpen);
    };

    // calender
    const [isCalender, setIsCalender] = useState(false);
    const [checkData, setCheckData] = useState({});

    const [isMobile, setIsMobile] = useState(false);

    const checkHandler = (e) => {
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
    return (
        <footer style={{ position: isKeyboardOpen ? 'relative' : 'sticky' }}>
            {/* <EventListener target="window" onResize={handleKeyboardEvent} onScreenResize={handleKeyboardEvent} /> */}
            <div className="container-fluid">
                <div className="footer-wrapper footer-wrapper-old ">
                    <DropdownGroup label="Comune" icon={<Location />} data={selectData} position="top" />
                    <DropdownGroup label="Distanza dal mare" icon={<Stelle />} data={stelle} position="top" />
                    <DropdownGroup
                        label="Fascia di Prezzo "
                        smText="(per persona)"
                        icon={<Dollar />}
                        data={fascio}
                        position="top"
                    />
                    <DropdownGroup label="Stelle" icon={<FiveStar />} data={stelle} position="top" />
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

                    <button type="submit" className="cmn-btn d-none d-sm-flex">
                        <SearchIcon /> Find a Best Hotel
                    </button>
                </div>
                <div className="footer-wrapper footer-wrapper-new  custom-dropdown-wrp">
                    <div className="custom-dropdown">
                        <label htmlFor="checkin">Check In</label>
                        <input
                            type="text"
                            value={
                                (checkData.start && new Date(checkData.end).toLocaleDateString('it-IT', options)) ||
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

            {isCalender && <Calender handler={setIsCalender} setCheckData={setCheckData} />}
        </footer>
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
const checkout = [
    {
        name: 'Sun 12/4',
    },
    {
        name: 'Sun 12/4',
    },
    {
        name: 'Sun 12/4',
    },
    {
        name: 'Sun 12/4',
    },
];
const checkin = [
    {
        name: 'Fri 12/2',
    },
    {
        name: 'Fri 12/2',
    },
    {
        name: 'Fri 12/2',
    },
    {
        name: 'Fri 12/2',
    },
];
export default Footer;
