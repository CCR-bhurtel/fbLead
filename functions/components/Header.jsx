/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import logo from '../assets/img/logo.png';
import useScrollPosition from '../hooks/useScroll';
import { Hamburger, Phone } from './Icon';
const Header = () => {
    const scrollPosition = useScrollPosition();
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={`overlay ${open ? 'active' : ''}`} onClick={() => setOpen(!open)}></div>
            <header className={`${scrollPosition > 200 ? 'active' : ''}`}>
                <div className="container_new md:flex md:justify-between">
                    <div className="header-wrapper">
                        <a className="logo" href="#">
                            <img src={logo.src} alt="" />
                        </a>
                        <div className={`menu-wrapper ${open ? 'active' : ''}`}>
                            <ul className="menu">
                                {menu?.map((item, i) => (
                                    <li key={i}>
                                        <a href={item?.url} className={i == 0 ? 'active' : ''}>
                                            {item?.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {/* <div className="lg:hidden">
                                <HeaderRight />
                            </div> */}
                        </div>
                        <div className="invisible lg:visible">
                            <HeaderRight />
                        </div>
                        <div className=" hamburger lg:hidden" onClick={() => setOpen(!open)}>
                            <Hamburger />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

const HeaderRight = () => {
    return (
        <>
            <div className="header-right">
                <a href="#" className="login-btn">
                    Login
                </a>
                <a href="tel:+081.197.58.557" className="tel-btn">
                    <Phone />
                    <div>
                        <div>24/7 Support</div>
                        <div className="number">081.197.58.557</div>
                    </div>
                </a>
            </div>
        </>
    );
};

const menu = [
    {
        title: 'IscHIA Hotel',
        url: '#',
    },
    {
        title: ' Discover The Island',
        url: '#',
    },
    {
        title: 'Top 10 Places To See',
        url: '#',
    },
    {
        title: 'Special Offers',
        url: '#',
    },
    {
        title: 'Privacy Policy',
        url: '#',
    },
];
export default Header;
