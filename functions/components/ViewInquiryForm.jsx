import React, { useEffect, useState } from 'react';
import { Plus2, Send } from './Icon';
import Input from './Input';
import Room from './Room';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

import loading from '../public/dualLoading.gif';

const ViewInquiryForm = ({ Hotel, NomeModulo, totalPriceForUser, checkInDate, checkOutDate }) => {
    const [value, setvalue] = useState('');
    const [userData, setUserData] = useState({
        Nome: '',
        Cognome: '',
        Email: '',
        Phone: '',
        postedDate: new Date().toDateString(),
        arrival: new Date(checkInDate).toISOString().substr(0, 10),
        departure: new Date(checkOutDate).toISOString().substr(0, 10),
        packageBoard: 'Half Board',
        rooms: [{ noofAdults: 2, noofChildren: 2, ages: [10, 12] }],
        Citta: '',
        note: '',
        NomeModulo,
        Hotel,
        numeroBagagliAlis: '1 bagaglio',
        ferry: 'Minore di 4 metri',
        trasporto: 'Bus da 85 € A/R compreso trasferimenti e passaggi marittimi',
        numeroBagagliViaggio: '',

        pricePerPerson: totalPriceForUser,
        selectedCitta: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const [sending, setSending] = useState(false);

    const handeSubmit = (e) => {
        e.preventDefault();
        const dataToBePosted = { ...userData };
        if (!userData.Nome) {
            toast.error('Please enter name');
            return;
        }
        if (!userData.Cognome) {
            toast.error('please enter cognome');
            return;
        }
        if (!userData.Email) {
            toast.error('please enter email');
            return;
        }
        if (!userData.Phone) {
            toast.error('please enter phone');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

        if (!emailRegex.test(userData.Email)) {
            toast.error('Please enter valid email.');
            return;
        }
        if (!phoneRegex.test(userData.Phone)) {
            toast.error('Please enter valid phone number.');
            return;
        }
        switch (value) {
            case 'aliscafo':
                if (!userData.numeroBagagliAlis) {
                    toast.error('Please enter Numero di Bagagli');
                    return;
                } else dataToBePosted.Citta = `Aliscafo + Transfer | ${userData.numeroBagagliAlis}`;
                break;
            case 'ferry':
                if (!userData.ferry) {
                    toast.error('Please enter Dimensione Auto');
                    return;
                } else dataToBePosted.Citta = `Traghetto + Transfer | ${userData.ferry}`;
                break;

            case 'viaggio':
                if (!userData.trasporto) {
                    toast.error('Please enter Tipo di trasporto preferito');
                    return;
                }
                if (!userData.numeroBagagliViaggio) {
                    toast.error('Please the Numero di Bagagli');

                    return;
                }

                dataToBePosted.Citta = `${userData.trasporto} da ${userData.numeroBagagliViaggio}`;

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
                setUserData({
                    Nome: '',
                    Cognome: '',
                    Email: '',
                    Phone: '',
                    postedDate: new Date().toDateString(),
                    arrival: new Date(checkInDate).toISOString().substr(0, 10),
                    departure: new Date(checkOutDate).toISOString().substr(0, 10),
                    packageBoard: 'Half Board',
                    rooms: [{ noofAdults: 2, noofChildren: 2, ages: [10, 12] }],
                    Citta: '',
                    note: '',
                    NomeModulo,
                    Hotel,
                    numeroBagagliAlis: '1 bagaglio',
                    ferry: '',
                    trasporto: 'Bus da 85€',
                    numeroBagagliViaggio: 'Milano',

                    pricePerPerson: totalPriceForUser,
                    selectedCitta: '',
                });
            })
            .catch((err) => {
                setSending(false);
                console.log(err);
                toast.error(err.response?.data.message || 'Internal server error');
            });
    };

    const handleAddRoom = () => {
        setUserData({ ...userData, rooms: [...userData.rooms, { noofAdults: 2, noofChildren: 2, ages: [10, 12] }] });
    };

    const removeRoom = (index) => {
        const updatedRooms = userData.rooms.filter((room, i) => i !== index);

        setUserData(() => ({ ...userData, rooms: updatedRooms }));
    };

    const handleUpdateRooms = (room, i) => {
        const updatedRooms = userData.rooms.map((r, index) => {
            if (i === index) return room;
            return r;
        });
        setUserData({ ...userData, rooms: updatedRooms });
    };

    return (
        <>
            <div className="inquiry--form">
                <div className="row g-3">
                    <div className="col-sm-6 col-md-3">
                        <Input
                            required
                            type="text"
                            value={userData.Nome}
                            name="Nome"
                            handleChange={handleChange}
                            label="First Name"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <Input
                            required
                            type="text"
                            name="Cognome"
                            value={userData.Cognome}
                            handleChange={handleChange}
                            label="Last Name"
                            placeholder="User Name"
                        />
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <Input
                            required
                            type="email"
                            label="E-mail "
                            value={userData.Email}
                            handleChange={handleChange}
                            name="Email"
                            placeholder="Your Email"
                        />
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <Input
                            required
                            label="Phone "
                            type="text"
                            value={userData.Phone}
                            handleChange={handleChange}
                            name="Phone"
                            placeholder="1234567890"
                        />
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-2">
                        <Input
                            handleChange={handleChange}
                            value={userData.arrival}
                            name="arrival"
                            required
                            label="Arrival Date "
                            type="date"
                        />
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-2">
                        <Input
                            handleChange={handleChange}
                            value={userData.departure}
                            name="departure"
                            label="Departure Date"
                            type="date"
                        />
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-2">
                        <Input
                            value={userData.packageBoard}
                            handleChange={handleChange}
                            name="packageBoard"
                            label="Package"
                            placeholder="Half board"
                            select
                            options={packaged}
                        />
                    </div>
                </div>

                <Room id={0} handleUpdateRoom={handleUpdateRooms} />

                {userData.rooms.slice(1)?.map((item, i) => (
                    <Room id={i + 1} removeRoom={removeRoom} handleUpdateRoom={handleUpdateRooms} />
                ))}

                <div className="row g-3">
                    <div className="col-sm-6 col-md-3">
                        <button
                            className="form-control __form-control"
                            onClick={() => {
                                handleAddRoom();
                            }}
                        >
                            <span>Add Room</span>
                            <Plus2 />
                        </button>
                    </div>
                </div>
                <h5 className="mt-4 r-title">Offer With</h5>
                <div className="__form-radio-group pt-2">
                    <label className="__form-radio">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="offer-with"
                                onChange={(e) => setvalue('')}
                            />
                            <div className="form-check-label">No Options</div>
                        </div>
                        <div className="text">
                            VIP FORMULA: Hydrofoil + Transfer to Hotel $ 35.00 er Person instead of € 71.00 (round trip)
                        </div>
                    </label>
                    <label className="__form-radio">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="offer-with"
                                onChange={(e) => setvalue('aliscafo')}
                            />
                            <div className="form-check-label">Aliscafo + Transfer</div>
                        </div>
                        <div className="text">
                            Auto (fino a 4 metri) € 75.00 (andata e ritorno). I passeggeri che viaggiano con Cauto, il
                            costo supplementare é di € 22.00 a persona (andata e ritorno).
                        </div>
                        {value == 'aliscafo' && (
                            <>
                                <br />
                                <Input
                                    handleChange={handleChange}
                                    name="numeroBagagliAlis"
                                    value={userData.numeroBagagliAlis}
                                    label="Numero di Bagagli *"
                                    select
                                    options={options}
                                />
                            </>
                        )}
                    </label>
                    <label className="__form-radio">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="offer-with"
                                onChange={(e) => setvalue('ferry')}
                            />
                            <div className="form-check-label">Ferry + Transfer</div>
                        </div>
                        <div className="text">
                            from Naples or Pozzuoli wth tan to the hotel round trip € 2500 per person instead of € 5000.
                        </div>
                        {value == 'ferry' && (
                            <>
                                <br />
                                <Input
                                    value={userData.ferry}
                                    handleChange={handleChange}
                                    name={'ferry'}
                                    label="Dimensione Auto"
                                    select
                                    options={options2}
                                />
                            </>
                        )}
                    </label>
                    {/* <label className="__form-radio">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="offer-with"
                                onChange={(e) => setvalue('high-speed')}
                            />
                            <div className="form-check-label">High Speed Train</div>
                        </div>
                        <div className="text">
                            Train from the main Italian cities, with transfer from Naples station to the port, sea
                            passages from Naples to Ischia, taxi from the port to the hotel starting from € 160.00 per
                            person round trip.
                        </div>
                        {value == 'high-speed' && (
                            <>
                                <br />
                                <Input
                                    handleChange={handleChange}
                                    name="numeroBaggliTrain"
                                    label="Numero di Bagagli"
                                    select
                                    options={options}
                                />
                            </>
                        )}
                    </label> */}
                    <label className="__form-radio">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="offer-with"
                                onChange={(e) => setvalue('viaggio')}
                            />
                            <div className="form-check-label">Viaggio dalla tua citta</div>
                        </div>
                        <div className="text">
                            Train from the main Italian cities, with transfer from Naples station to the port, sea
                            passages from Naples to Ischia, taxi from the port to the hotel starting from € 160.00 per
                            person round trip.
                        </div>
                        {value == 'viaggio' && (
                            <div className="row g-3 mt-2">
                                <div className="col-sm-6">
                                    <Input
                                        name="trasporto"
                                        handleChange={handleChange}
                                        value={userData.trasporto}
                                        label="Tipo di trasporto preferito"
                                        select
                                        options={options3}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <Input
                                        type="text"
                                        value={userData.numeroBagagliViaggio}
                                        name="numeroBagagliViaggio"
                                        handleChange={handleChange}
                                        label="Numero di Bagagli"
                                    />
                                </div>
                            </div>
                        )}
                    </label>
                </div>
                <br />
                <div className="msg-txt mb-4">
                    Per offrirvi il miglior servizio Vi preghiamo di specificare, nel campo che segue, maggiori
                    informazioni per i trasferimenti ed eventuali esigenze per la vostra vacanza
                </div>
                <textarea
                    value={userData.note}
                    name="note"
                    onChange={handleChange}
                    className="form-control __form-control p-3"
                    placeholder="Text..."
                ></textarea>
                <div className="mt-3"></div>
                <label className="form-check form--check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <span className="form-check-label">
                        Ho preso visione e acconsento al{' '}
                        <a href="#" className="text-base">
                            trattamento dei miei dati personali in conformitä al Regolamento europeo 679/2016 *
                        </a>
                    </span>
                </label>
                <div className="mt-3"></div>
                <label className="form-check form--check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <span className="form-check-label">
                        Dichiaro di volermi iscrivere al servizio newsletter per ricevere Ie migliori offerte
                    </span>
                </label>
            </div>
            <div onClick={handeSubmit} className="pt-4">
                <button className="cmn-btn w-100" type="button">
                    {sending ? (
                        <img style={{ width: '25px' }} src={loading.src} alt="loading" />
                    ) : (
                        <>
                            Send Inquiry <Send />
                        </>
                    )}
                </button>
            </div>
        </>
    );
};
const options = [
    { val: '1 bagaglio', text: '1 bagaglio' },
    { val: '5 bagaglio', text: '5 bagaglio' },
    { val: '10 bagaglio', text: '10 bagaglio' },
];
const options2 = [
    { val: 'Minore di 4 metri', text: 'Minore di 4 metri' },
    { val: '5 bagaglio', text: '5 bagaglio' },
    { val: '10 bagaglio', text: '10 bagaglio' },
];
const options3 = [
    {
        val: 'Bus da 85 € A/R compreso trasferimenti e passaggi marittimi',
        text: 'Bus da 85 € A/R compreso trasferimenti e passaggi marittimi',
    },
    {
        val: 'Treno alta velocità da € 99 A/R, compreso trasferimenti e passaggi marittimi',
        text: 'Treno alta velocità da € 99 A/R, compreso trasferimenti e passaggi marittimi',
    },
    {
        val: 'Volo da € 199 A/R, compreso trasferimenti e passaggi marittimi',
        text: 'Volo da € 199 A/R, compreso trasferimenti e passaggi marittimi',
    },
];
const options4 = [
    { val: 'Milano', text: 'Milano' },
    { val: 'Milano2', text: 'Milano2' },
];

const packaged = [
    {
        options: '1',
        text: 'Half board',
    },
    {
        options: '2',
        text: 'Full board',
    },
];

export default ViewInquiryForm;
