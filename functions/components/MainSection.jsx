import React, { createRef, useEffect, useRef, useState } from 'react';
import img1 from '../assets/img/offers/1.png';

import { toast, Toaster } from 'react-hot-toast';

import OfferItem from './OfferItem';
import Shapes from './Shapes';
import axios from 'axios';
const MainSection = ({ hotels, checkInDate, checkOutDate, setDatePickerOpen }) => {
    const [userData, setUserData] = useState({
        Nome: '',
        Cognome: '',
        Email: '',
        Phone: '+39',
        postedDate: new Date().toDateString(),
        departure: null,

        arrival: null,
        packageBoard: null,
        rooms: [{ noofAdults: 2, noofChildren: 0, ages: [] }],
        Citta: '',
        note: '',
        NomeModulo: null,
        Hotel: null,

        numeroBagagliAlis: '1',
        ferry: 'traghetto con auto fino 4 mt. da Pozzuoli A/R € 75 - passeggeri € 22',
        trasporto: 'Bus',
        numeroBagagliViaggio: '',

        pricePerPerson: '',
        selectedCitta: '',
    });

    const [sending, setSending] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [value, setValue] = useState('');

    const handleUpdateRooms = (room, i) => {
        const updatedRooms = userData.rooms.map((r, index) => {
            if (i === index) return room;
            return r;
        });
        setUserData({ ...userData, rooms: updatedRooms });
    };

    const handleChangeValue = (value) => {};

    const handleChange = (name, value) => {};

    const handleSubmit = (
        arrival,
        departure,
        NomeModulo,
        Hotel,
        totalPriceForUser,
        packageBoard,
        handleScroll,
        handleOfferClose
    ) => {
        if (buttonDisabled) {
            toast.error('Wait for a while');
            return;
        }

        // setButtonDisabled(true);
        const dataToBePosted = {
            ...userData,
            arrival,
            departure,
            NomeModulo,
            Hotel,
            pricePerPerson: totalPriceForUser,
            packageBoard,
        };
        if (!userData.Nome) {
            toast.error('Devi inserire name');
            return;
        }
        if (!userData.Cognome) {
            toast.error('Devi inserire  cognome');
            return;
        }
        if (!userData.Email) {
            toast.error('Devi inserire  email');
            return;
        }
        if (!userData.Phone) {
            toast.error('Devi inserire Numero di Telefono');
            return;
        }
        if (!arrival || !arrival.length || arrival?.split('-')[0] === 'NaN') {
            toast.error('Devi inserire Data Check In');
            return;
        }
        if (!departure || !departure.length || departure?.split('-')[0] === 'NaN') {
            toast.error('Devi inserire  Data Check Out');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

        if (!emailRegex.test(userData.Email)) {
            toast.error('si prega di inserire valido email.');
            return;
        }
        if (!phoneRegex.test(userData.Phone)) {
            toast.error('si prega di inserire valido Numero di Telefono.');
            return;
        }

        if (!value) {
            toast.error('Seleziona una opzione sopra');
            handleScroll();
            return;
        }
        switch (value) {
            case 'aliscafo':
                if (!userData.numeroBagagliAlis) {
                    toast.error('Devi inserire  Numero di Bagagli');
                    return;
                } else dataToBePosted.Citta = `Aliscafo + Transfer | ${userData.numeroBagagliAlis}`;
                break;
            case 'ferry':
                if (!userData.ferry) {
                    toast.error('Devi inserire  Dimensione Auto');
                    return;
                } else dataToBePosted.Citta = `Traghetto + Transfer | ${userData.ferry}`;
                break;

            case 'viaggio':
                if (!userData.trasporto) {
                    toast.error('Devi inserire  Tipo di trasporto preferito');
                    return;
                }
                if (!userData.numeroBagagliViaggio) {
                    toast.error('Devi inserire Città di Partenza');

                    return;
                }

                dataToBePosted.Citta = `${userData.numeroBagagliViaggio} con ${userData.trasporto}`;

                break;

            default:
                dataToBePosted.Citta = '';
        }

        setSending(true);
        axios
            .post('/api/enquiry', { ...dataToBePosted })
            .then((res) => {
                toast.success('Success');
                setSending(false);
                setButtonDisabled(true);

                setTimeout(() => {
                    handleOfferClose();
                }, 8000);
                setTimeout(() => {
                    setButtonDisabled(false);
                }, 10000);
                // setUserData({
                //     Nome: '',
                //     Cognome: '',
                //     Email: '',
                //     Phone: '',
                //     postedDate: new Date().toDateString(),
                //     arrival: formatDate(checkOutDate),
                //     departure: formatDate(checkInDate),
                //     packageBoard: 'Half Board',
                //     rooms: [{ noofAdults: 2, noofChildren: 0, ages: [] }],
                //     Citta: '',
                //     note: '',
                //     NomeModulo,
                //     Hotel,
                //     numeroBagagliAlis: '1 bagaglio',
                //     ferry: '',
                //     trasporto: 'Bus da 85€',
                //     numeroBagagliViaggio: 'Milano',

                //     pricePerPerson: totalPriceForUser,
                //     selectedCitta: '',
                // });
            })
            .catch((err) => {
                setSending(false);
                console.log(err);
                toast.error(err.response?.data.message || 'Internal server error');
            });
    };

   
    return (
        <>
            <section className="main-section">
                <Toaster />
                <div className="shapes">
                    <Shapes />
                </div>
                <div className="container">
                    <h3  className="text-base font-medium m-title">
                        Le migliori offerte per te!
                    </h3>
                    <div className="d-flex flex-column gap-36">
                        {hotels.slice(0, 3).map((hotel, i) => {
                            return (
                                <>
                                    <OfferItem
                                        setUserData={setUserData}
                                        userData={userData}
                                        sending={sending}
                                        setvalue={setValue}
                                        value={value}
                                        handleSubmit={handleSubmit}
                                        buttonDisabled={buttonDisabled}
                                        handleUpdateRooms={handleUpdateRooms}
                                        offer
                                        key={i}
                                        index={i + 1}
                                        checkInDate={checkInDate}
                                        checkOutDate={checkOutDate}
                                        setDatePickerOpen={setDatePickerOpen}
                                        hotel={{ ...hotel, img: [img1.src, img1.src, img1.src] }}
                                    />
                                </>
                            );
                        })}
                    </div>
                    <br />
                    <br />
                    {hotels.length > 3 ? (
                        <h3 className="text-base font-medium m-title">Ecco altre offerte che ti potrebbero piacere.</h3>
                    ) : (
                        <></>
                    )}
                    {hotels.slice(3).map((hotel, i) => {
                        return (
                            <div style={{ marginTop: '2rem' }}>
                                <OfferItem
                                    setUserData={setUserData}
                                    userData={userData}
                                    sending={sending}
                                    setvalue={setValue}
                                    value={value}
                                    handleSubmit={handleSubmit}
                                    handleUpdateRooms={handleUpdateRooms}
                                    buttonDisabled={buttonDisabled}
                                    offer={false}
                                    key={i}
                                    index={i + '--' + 1}
                                    checkInDate={checkInDate}
                                    checkOutDate={checkOutDate}
                                    setDatePickerOpen={setDatePickerOpen}
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
