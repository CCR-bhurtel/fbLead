import React, { createRef, useEffect, useState } from 'react';
import { Plus2, Send } from './Icon';
import Input from './Input';
import Room from './Room';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

import loading from '../public/dualLoading.gif';

const formatDate = (ogDate) => {
    let date = new Date(ogDate);

    // Get the individual components of the date
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    let day = String(date.getDate()).padStart(2, '0');

    // Format the date as YYYY-MM-DD
    let formattedDate = `${year}-${month}-${day}`;

    // Set the value of the HTML input element
    return formattedDate;
};

function calculateDaysAndNights(startDate, endDate) {
    // Convert the dates to milliseconds
    const startMillis = new Date(startDate).getTime();
    const endMillis = new Date(endDate).getTime();

    // Calculate the time difference in milliseconds
    const timeDiffMillis = endMillis - startMillis;

    var numberOfNights = Math.ceil(timeDiffMillis / (1000 * 3600 * 24));

    // Calculate the number of days
    const days = Math.floor(timeDiffMillis / (1000 * 60 * 60 * 24));

    return { days, nights: numberOfNights };
}

const checkDateValidity = (offer, checkInDate, checkOutDate) => {
    const minNights = parseInt(offer['minimo notti']);
    const maxNights = parseInt(offer['massimo notti']);

    const checkInDateFromRecord = new Date(offer['Valida dal']);
    const checkOutDateFromRecord = new Date(offer['Valida al']);

    const checkInDateFromQuery = new Date(checkInDate);
    const checkOutDateFromQuery = new Date(checkOutDate);

    const { nights } = calculateDaysAndNights(checkInDateFromQuery, checkOutDateFromQuery);

    if (checkInDateFromQuery >= checkInDateFromRecord && checkOutDateFromQuery <= checkOutDateFromRecord - minNights) {
        if (nights === minNights || (nights >= minNights && nights <= maxNights)) {
            return true;
        }
    }

    return false;
};

const ViewInquiryForm = ({ offer, Hotel, NomeModulo, totalPriceForUser, checkInDate, checkOutDate }) => {
    const [value, setvalue] = useState('');

    const [dateValid, setDateValid] = useState(checkDateValidity(offer, checkInDate, checkOutDate));
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [userData, setUserData] = useState({
        Nome: '',
        Cognome: '',
        Email: '',
        Phone: '',
        postedDate: new Date().toDateString(),
        departure: '',

        arrival: '',
        packageBoard: 'Mezza pensione"',
        rooms: [{ noofAdults: 2, noofChildren: 0, ages: [] }],
        Citta: '',
        note: '',
        NomeModulo,
        Hotel,

        numeroBagagliAlis: '1',
        ferry: 'traghetto con auto fino 4 mt. da Pozzuoli A/R € 75 - passeggeri € 22',
        trasporto: 'Bus',
        numeroBagagliViaggio: '',

        pricePerPerson: '',
        selectedCitta: '',
    });

    const [maxDepartureDate, setMaxDepatureDate] = useState('');
    const [minDepartureDate, setMinDepartureDate] = useState('');
    const [minArrivalDate, setMinArrivalDate] = useState('');
    const [maxArrivalDate, setMaxArrivalDate] = useState('');

    function calculateInitialMinAndMaxDates(offer) {
        const minNights = parseInt(offer['minimo notti']);
        // const maxNights = parseInt(offer['massimo notti']);

        const checkInDateFromRecord = new Date(offer['Valida dal']);
        const checkOutDateFromRecord = new Date(offer['Valida al']);

        // for departure
        const minimumDeparture = checkInDateFromRecord;

        const maximumDeparture = checkOutDateFromRecord;
        maximumDeparture.setDate(maximumDeparture.getDate() - minNights);

        setMaxDepatureDate(formatDate(maximumDeparture));
        setMinDepartureDate(formatDate(minimumDeparture));

        // for arrival

        const minimumArrival = checkInDateFromRecord;
        minimumArrival.setDate(minimumArrival.getDate() + minNights);

        const maximumArrival = new Date(offer['Valida al']);

        setMaxArrivalDate(formatDate(maximumArrival));

        setMinArrivalDate(formatDate(minimumArrival));
    }

    useEffect(() => {
        setDateValid(checkDateValidity(offer, checkInDate, checkOutDate));
    }, [offer, checkInDate, checkOutDate]);

    const [readOnly, setReadOnly] = useState(false);

    useEffect(() => {
        calculateInitialMinAndMaxDates(offer, checkInDate, checkOutDate);

        let { nights } = calculateDaysAndNights(offer['Valida dal'], offer['Valida al']);
        const minNights = parseInt(offer['minimo notti']);

        const equal = nights === minNights;

        setReadOnly(equal);
        // const maxNights = parseInt(offer['massimo notti']);

        setUserData({
            ...userData,
            departure: equal ? formatDate(new Date(offer['Valida dal'])) : dateValid ? formatDate(checkInDate) : '',

            arrival: equal ? formatDate(new Date(offer['Valida al'])) : dateValid ? formatDate(checkOutDate) : '',
            NomeModulo,
            Hotel,
            pricePerPerson: totalPriceForUser,
        });
    }, [offer, checkInDate, checkOutDate, Hotel, NomeModulo, totalPriceForUser, dateValid]);

    const handleDepartureChange = (e) => {
        const departureDateFromForm = new Date(e.target.value);
        const minNights = parseInt(offer['minimo notti']);

        const minArrivalDateCalc = formatDate(
            departureDateFromForm.setDate(departureDateFromForm.getDate() + minNights)
        );
        setMinArrivalDate(minArrivalDateCalc);
    };

    const handleArrivalChange = (e) => {
        const arrivalDateFromForm = new Date(e.target.value);
        const minNights = parseInt(offer['minimo notti']);

        const maxDepartureDateCalc = formatDate(arrivalDateFromForm.setDate(arrivalDateFromForm.getDate() - minNights));

        setMaxDepatureDate(maxDepartureDateCalc);
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const [sending, setSending] = useState(false);

    const departureRef = createRef(null);

    const arrivalRef = createRef(null);

    const handeSubmit = (e) => {
        e.preventDefault();
        if (buttonDisabled) {
            toast.error('Wait for a while');
            return;
        }
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
        if (!userData.arrival) {
            toast.error('please select arrival date');
            return;
        }
        if (!userData.departure) {
            toast.error('please select departure date');
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

    const handleAddRoom = () => {
        setUserData({ ...userData, rooms: [...userData.rooms, { noofAdults: 2, noofChildren: 0, ages: [] }] });
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
            {userData ? (
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
                                    label="Nome"
                                    placeholder="Il tuo nome"
                                />
                            </div>
                            <div className="col-sm-6 col-md-3 relative">
                                <div>
                                    <Input
                                        required
                                        type="text"
                                        name="Cognome"
                                        value={userData.Cognome}
                                        handleChange={handleChange}
                                        label="Cognome"
                                        placeholder="Il tuo cognome"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <Input
                                    required
                                    type="email"
                                    label="E-mail "
                                    value={userData.Email}
                                    handleChange={handleChange}
                                    name="Email"
                                    placeholder="La tua email"
                                />
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <Input
                                    required
                                    label="Numero di Telefono"
                                    type="tel"
                                    value={userData.Phone}
                                    handleChange={handleChange}
                                    name="Phone"
                                    placeholder="1234567890"
                                />
                            </div>
                            <div className="col-sm-6 col-md-3 col-lg-2 relative">
                                <div className="">
                                    <Input
                                        handleChange={(e) => {
                                            handleChange(e);
                                            handleDepartureChange(e);
                                        }}
                                        value={userData.departure}
                                        name="departure"
                                        min={minDepartureDate}
                                        max={maxDepartureDate}
                                        label="Data Check In"
                                        type="date"
                                        ref={departureRef}
                                        readOnly={readOnly}
                                        placeholder="Seleziona la data di partenza"
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />
                                </div>

                                {/* {!userData.departure && ( */}
                                <div className="absolute top-0 left-0 right-sm-0 w-100 px-2">
                                    <Input
                                        placeholder="Seleziona la data di partenza"
                                        label="Data Check In"
                                        value={userData.departure}
                                        style={{
                                            // textAlign: 'center',
                                            paddingLeft: '7%',
                                        }}
                                        onClick={(e) => {
                                            try {
                                                departureRef?.current?.showPicker();
                                                // departureRef.current.style.opacity = 1;
                                            } catch (err) {
                                                console.log(err);
                                            }
                                        }}
                                    />
                                </div>
                                {/* )} */}
                            </div>
                            <div className="col-sm-6 col-md-3 col-lg-2 relative">
                                <div className="">
                                    <Input
                                        handleChange={(e) => {
                                            handleChange(e);
                                            handleArrivalChange(e);
                                        }}
                                        value={userData.arrival}
                                        name="arrival"
                                        min={minArrivalDate}
                                        max={maxArrivalDate}
                                        required
                                        label="Data Check Out"
                                        ref={arrivalRef}
                                        placeholder="Seleziona la data di arrivo"
                                        type="date"
                                        readOnly={readOnly}
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />
                                </div>

                                {/* {!userData.arrival && ( */}
                                <div className="absolute top-0 left-0 w-100 px-2">
                                    <Input
                                        placeholder="Seleziona la data di arrivo"
                                        label="Data Check Out"
                                        value={userData.arrival}
                                        style={{
                                            // textAlign: 'center',
                                            paddingLeft: '7%',
                                        }}
                                        onClick={(e) => {
                                            try {
                                                arrivalRef?.current?.showPicker();
                                                // arrivalRef.current.style.opacity = 1;
                                            } catch (err) {
                                                console.log(err);
                                            }
                                        }}
                                    />
                                </div>
                                {/* )} */}
                            </div>
                            <div className="col-sm-6 col-md-3 col-lg-2">
                                <Input
                                    value={userData.packageBoard}
                                    handleChange={handleChange}
                                    name="packageBoard"
                                    label="Pacchetto"
                                    select
                                    options={packaged}
                                />
                            </div>
                        </div>

                        {/* <Room room={userData.rooms[0]} id={0} handleUpdateRoom={handleUpdateRooms} /> */}

                        {userData.rooms.map((item, i) => (
                            <Room room={item} id={i} removeRoom={removeRoom} handleUpdateRoom={handleUpdateRooms} />
                        ))}

                        <div className="row g-3">
                            <div className="col-sm-6 col-md-3">
                                <button
                                    className="form-control __form-control"
                                    onClick={() => {
                                        handleAddRoom();
                                    }}
                                >
                                    <span>Aggiungi Stanza</span>
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
                                    <div className="form-check-label">Nessuna Opzione</div>
                                </div>
                                <div className="text">Nessun trasporto incluso</div>
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
                                    Aliscafo da Napoli Beverello A/R € 35 compreso trasferimenti porto hotel
                                </div>
                                {value == 'aliscafo' && (
                                    <>
                                        <br />
                                        <Input
                                            handleChange={handleChange}
                                            name="numeroBagagliAlis"
                                            type="number"
                                            value={userData.numeroBagagliAlis}
                                            label="Numero di Bagagli *"
                                            // select
                                            // options={options}
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
                                    <div className="form-check-label">Traghetto + Transfer</div>
                                </div>
                                <div className="text">
                                    Traghetto da Napoli Calata porta di Massa o Pozzuoli A/R € 25 compreso trasferimenti
                                    porto hotel
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
                                    Train from the main Italian cities, with transfer from Naples station to the port,
                                    sea passages from Naples to Ischia, taxi from the port to the hotel starting from €
                                    160.00 per person round trip.
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
                                                label="Città di Partenza"
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
                    {buttonDisabled ? (
                        <div className="pt-4">
                            <button style={{ opacity: 0.7 }} className="cmn-btn w-100" type="button">
                                Preventivo Richiesto
                            </button>
                        </div>
                    ) : (
                        <div onClick={handeSubmit} className="pt-4">
                            <button className="cmn-btn w-100" type="button">
                                {sending ? (
                                    <img style={{ width: '25px' }} src={loading.src} alt="loading" />
                                ) : (
                                    <>
                                        Richiedi Preventivo <Send />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <img src={loading} height={'30px'} alt="" />
                </>
            )}
        </>
    );
};
const options2 = [
    {
        options: 'traghetto con auto fino 4 mt. da Pozzuoli A/R € 75 - passeggeri € 22',
        text: 'traghetto con auto fino 4 mt. da Pozzuoli A/R € 75 - passeggeri € 22',
    },
    {
        options: 'traghetto con auto su. ai 4 mt. da Pozzuoli A/R € 100 - passeggeri € 22',
        text: 'traghetto con auto su. ai 4 mt. da Pozzuoli A/R € 100 - passeggeri € 22',
    },
];
const options3 = [
    {
        options: 'Bus',
        text: 'Bus da 85 € A/R compreso trasferimenti e passaggi marittimi',
    },
    {
        options: 'Treno',
        text: 'Treno alta velocità da € 99 A/R, compreso trasferimenti e passaggi marittimi',
    },
    {
        options: 'Aereo',
        text: 'Volo da € 199 A/R, compreso trasferimenti e passaggi marittimi',
    },
];

const packaged = [
    {
        options: '1',
        text: 'Mezza pensione',
    },
    {
        options: '2',
        text: 'Pensione completa',
    },
];

export default ViewInquiryForm;
