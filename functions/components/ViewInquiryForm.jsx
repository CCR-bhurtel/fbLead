import React, { createRef, useEffect, useRef, useState } from 'react';
import { Plus2, Send } from './Icon';
import Input from './Input';
import Room from './Room';

import loading from '../public/dualLoading.gif';
import CustomDatePicker from './calender/CalenderEnquiry';

const formatDate = (ogDate) => {
    let date = new Date(ogDate);

    // Get the individual components of the date
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    let day = String(date.getDate()).padStart(2, '0');

    // Format the date as YYYY-MM-DD
    let formattedDate = `${year}-${month}-${day}`;

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

const ViewInquiryForm = (
    {
        offer,
        Hotel,
        NomeModulo,
        totalPriceForUser,
        checkInDate,
        checkOutDate,
        setUserData,
        userData,
        sending,
        setvalue,
        value,
        handleSubmit,
        buttonDisabled,
        handleUpdateRooms,
        setDatePickerOpen,
        selectItems,
        selectedPackage,
        setSelectedPackage,
        handleOfferClose,
    },
    ref
) => {
    const [dateValid, setDateValid] = useState(checkDateValidity(offer, checkInDate, checkOutDate));

    const [maxDepartureDate, setMaxDepatureDate] = useState('');
    const [minDepartureDate, setMinDepartureDate] = useState('');
    const [minArrivalDate, setMinArrivalDate] = useState('');
    const [maxArrivalDate, setMaxArrivalDate] = useState('');

    const [arrival, setArrival] = useState('');
    const [departure, setDeparture] = useState('');

    const [clicked, setClicked] = useState(false);

    function calculateInitialMinAndMaxDates(offer) {
        const minNights = parseInt(offer['minimo notti']);
        // const maxNights = parseInt(offer['massimo notti']);

        const checkInDateFromRecord = new Date(offer['Valida dal']);
        const checkOutDateFromRecord = new Date(offer['Valida al']);

        // for departure
        const minimumDeparture = checkInDateFromRecord;

        const maximumDeparture = checkOutDateFromRecord;
        maximumDeparture.setDate(maximumDeparture.getDate() - minNights);

        setMaxDepatureDate(maximumDeparture);

        setMinDepartureDate(new Date(offer['Valida dal']));

        // for arrival

        const minimumArrival = checkInDateFromRecord;
        minimumArrival.setDate(minimumArrival.getDate() + minNights);

        const maximumArrival = new Date(offer['Valida al']);

        setMaxArrivalDate(maximumArrival);

        setMinArrivalDate(minimumArrival);
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

        setArrival(equal ? new Date(offer['Valida al']) : dateValid ? new Date(checkOutDate) : '');
        setDeparture(equal ? new Date(offer['Valida dal']) : dateValid ? new Date(checkInDate) : '');
    }, [offer, checkInDate, checkOutDate, Hotel, NomeModulo, totalPriceForUser, dateValid]);

    const handleDepartureChange = (value) => {
        const departureDateFromForm = new Date(value);
        const minNights = parseInt(offer['minimo notti']);

        const minArrivalDateCalc = departureDateFromForm.setDate(departureDateFromForm.getDate() + minNights);
        // arrivalRef?.current?.min(minArrivalDate)handleArrivalChange

        setMinArrivalDate(minArrivalDateCalc);
    };

    const handleArrivalChange = (value) => {
        const arrivalDateFromForm = new Date(value);
        const minNights = parseInt(offer['minimo notti']);

        const maxDepartureDateCalc = arrivalDateFromForm.setDate(arrivalDateFromForm.getDate() - minNights);

        setMaxDepatureDate(maxDepartureDateCalc);
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const departureRef = createRef(null);

    const arrivalRef = createRef(null);

    const handleAddRoom = () => {
        setUserData({ ...userData, rooms: [...userData.rooms, { noofAdults: 2, noofChildren: 0, ages: [] }] });
    };

    const removeRoom = (index) => {
        const updatedRooms = userData.rooms.filter((room, i) => i !== index);

        setUserData(() => ({ ...userData, rooms: updatedRooms }));
    };

    const optionRef = useRef(null);

    const handleScroll = () => {
        console.log(optionRef.current);
        optionRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <>
            {userData ? (
                <>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!clicked) {
                                setClicked(true);
                                setTimeout(() => {
                                    handleSubmit(
                                        formatDate(arrival),
                                        formatDate(departure),
                                        NomeModulo,
                                        Hotel,
                                        totalPriceForUser,
                                        selectedPackage.text,
                                        handleScroll,
                                        handleOfferClose
                                    );
                                    setClicked(false);
                                }, 1000);
                            }
                        }}
                        className="inquiry--form"
                    >
                        <div className="row g-3">
                            <div className="col-sm-6 col-md-3">
                                <Input
                                    required={true}
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
                                        required={true}
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
                                {/* <div className="">
                                    <Input
                                        handleChange={(e) => {
                                            setDeparture(e.target.value);
                                            handleDepartureChange(e);
                                        }}
                                        value={departure}
                                        name="departure"
                                        // min={minDepartureDate}
                                        // max={maxDepartureDate}
                                        label="Data Check In"
                                        type="date"
                                        id="departureDatePicker"
                                        ref={departureRef}
                                        readOnly={readOnly}
                                        placeholder="Seleziona la data"
                                        placeholderMin="Seleziona la data di partenza &nbsp; &nbsp;&nbsp;&nbsp;"
                                        hasValue={departure && departure.length ? true : false}
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />
                                </div> */}

                                <div className="right-sm-0 w-100">
                                    <CustomDatePicker
                                        setDatePickerOpen={setDatePickerOpen}
                                        minDate={minDepartureDate}
                                        maxDate={maxDepartureDate}
                                        selected={departure}
                                        label="Data Check In"
                                        placeholder="Seleziona la data"
                                        handleChange={(value) => {
                                            setDeparture(value);
                                            handleDepartureChange(value);
                                        }}
                                        readOnly={readOnly}
                                    />
                                </div>

                                {/* <Input
                                        placeholder="Seleziona la data di partenza"
                                        label="Data Check In"
                                        value={userData.departure}
                                        style={{
                                            // textAlign: 'center',
                                            paddingLeft: '7%',
                                        }}
                                        readOnly={true}
                                        onClick={(e) => {
                                            try {
                                                if (!readOnly) departureRef?.current?.focus();
                                            } catch (err) {
                                                console.log(err);
                                            }
                                        }}
                                    /> */}
                            </div>
                            <div className="col-sm-6 col-md-3 col-lg-2 relative">
                                {/* <div className="">
                                    <Input
                                        handleChange={(e) => {
                                            setArrival(e.target.value);
                                            handleArrivalChange(e);
                                        }}
                                        value={arrival}
                                        name="arrival"
                                        id="arrivalDatePicker"
                                        // min={minArrivalDate}
                                        // max={maxArrivalDate}
                                        required
                                        label="Data Check Out"
                                        ref={arrivalRef}
                                        placeholder="Seleziona la data"
                                        placeholderMin="Seleziona la data di arrivo &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                        type="date"
                                        readOnly={readOnly}
                                        hasValue={arrival && arrival.length ? true : false}
                                        onClick={(e) => {
                                            try {
                                                arrivalRef?.current?.showPicker();
                                            } catch (err) {}
                                        }}
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />
                                </div> */}

                                <div className="right-sm-0 w-100 ">
                                    <CustomDatePicker
                                        minDate={minArrivalDate}
                                        maxDate={maxArrivalDate}
                                        setDatePickerOpen={setDatePickerOpen}
                                        selected={arrival}
                                        label="Data Check Out"
                                        placeholder="Seleziona la data di arrivo"
                                        handleChange={(value) => {
                                            setArrival(value);
                                            handleArrivalChange(value);
                                        }}
                                        readOnly={readOnly}
                                    />
                                </div>

                                <div className="absolute top-0 left-0 w-100 px-2">
                                    {/* <Input
                                        placeholder="Seleziona la data di arrivo"
                                        label="Data Check Out"
                                        value={userData.arrival}
                                        readOnly={true}
                                        style={{
                                            // textAlign: 'center',
                                            paddingLeft: '7%',
                                        }}
                                        onClick={(e) => {
                                            try {
                                                if (!readOnly) arrivalRef?.current?.showPicker();
                                                // arrivalRef.current.style.opacity = 1;
                                            } catch (err) {
                                                console.log(err);
                                            }
                                        }}
                                    /> */}
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3 col-lg-2">
                                <Input
                                    value={selectedPackage.text}
                                    handleChange={(e) => {
                                        let index = null;
                                        selectItems.forEach((item, i) => {
                                            if (item.text === e.target.value) index = i;
                                            setSelectedPackage(index);
                                        });
                                    }}
                                    name="packageBoard"
                                    label="Pacchetto"
                                    select
                                    required
                                    options={selectItems}
                                />
                            </div>
                        </div>

                        {/* <Room room={userData.rooms[0]} id={0} handleUpdateRoom={handleUpdateRooms} /> */}

                        {userData.rooms.map((item, i) => (
                            <Room roomData={item} id={i} removeRoom={removeRoom} handleUpdateRoom={handleUpdateRooms} />
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
                        <h5 ref={optionRef} className="mt-4 r-title">
                            Offerta con
                        </h5>
                        <div ref={optionRef} className="__form-radio-group pt-2">
                            <label className="__form-radio">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="offer-with"
                                        checked={value === 'none'}
                                        onChange={(e) => setvalue('none')}
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
                                        checked={value === 'aliscafo'}
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
                                        checked={value === 'ferry'}
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
                                        checked={value === 'viaggio'}
                                        onChange={(e) => setvalue('viaggio')}
                                    />
                                    <div className="form-check-label">Viaggio dalla tua citta</div>
                                </div>
                                <div className="text">
                                    Viaggio incluso dalla tua città fino al trasferimento all'hotel
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
                            placeholder="Note Extra, Richieste Particolari, Etc..."
                        ></textarea>
                        <div className="mt-3"></div>
                        <label className="form-check form--check">
                            <input
                                required
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <span className="form-check-label">
                                Ho preso visione e acconsento al{' '}
                                <a
                                    href="https://www.hoescape.com/privacy-policy/"
                                    className="text-base"
                                    target="_blank"
                                    rel="noreferrer"
                                >
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
                        {buttonDisabled ? (
                            <div className="pt-4">
                                <button style={{ opacity: 0.7 }} className="cmn-btn w-100" type="button">
                                    Preventivo Inviato
                                </button>
                            </div>
                        ) : (
                            <div className="pt-4">
                                <button className="cmn-btn w-100" type="submit">
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
                    </form>
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

export default React.forwardRef(ViewInquiryForm);
