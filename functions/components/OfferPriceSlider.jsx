/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import scalapay from '../assets/img/scalapay.png';
import { FaqsItems } from './FaqsItems';
import { AngleDown, AngleUp, Bus, Car, CheckIcon, NextIcon, PrevIcon, Ship, Train } from './Icon';
import ViewInquiryForm from './ViewInquiryForm';
import SelectDropDown from './SelectDropDown';
const OfferPriceSlider = (
    {
        offers,
        serial,
        setOfferButtonIn,
        offerButtonIn,
        hotel,
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
        handleOfferClose,
    },
    ref
) => {
    const [index, setIndex] = useState(0);
    const [innerCollapse, setInnerCollapse] = useState(false);

    const sliderRef = useRef(null);

    const [innerOffers, setInnerOffers] = useState(offers);

    const [activeData, setActiveData] = useState(innerOffers[index]);

    useEffect(() => {
        setActiveData(innerOffers[index]);
    }, [innerOffers]);

    const [faqs, setFaqs] = useState([
        {
            title: 'Descrizione',
            paragraph: activeData['Descrizione offerta'],
            text: [],
        },
        {
            title: 'Pacchetto Incluso ',
            paragraph: activeData['Pacchetto'],
            text: [],
        },
        {
            title: 'Supplementi',
            paragraph: activeData['Supplementi offerta'],
            text: [],
        },
        {
            title: 'Riduzioni',
            paragraph: activeData['Riduzioni offerta'],
            text: [],
        },
    ]);

    const handleSelectedItemChange = (i, nextIndex) => {
        const newOffers = innerOffers.map((offer, index) => {
            if (i === index) return { ...offer, selectedOption: nextIndex };
            else return offer;
        });
        setInnerOffers(newOffers);
    };

    const scrollRef = useRef();
    useEffect(() => {
        if (innerCollapse) {
            if (scrollRef) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            setOfferButtonIn(false);
        } else {
            setOfferButtonIn(true);
        }
    }, [innerCollapse]);

    const [beginningReached, setBeginningReached] = useState(true);
    const [endReached, setEndReached] = useState(false);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;

        const swiperInstance = sliderRef.current.swiper;

        if (!beginningReached) {
            setEndReached(false);
            swiperInstance.slidePrev();

            if (swiperInstance.translate === 0) {
                setBeginningReached(true);
            } else {
                setBeginningReached(false);
            }
        }
    }, [beginningReached]);

    const handlePrevDrag = () => {
        setEndReached(false);
    };

    const handleNextDrag = () => {
        setBeginningReached(false);
    };

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        const swiperInstance = sliderRef.current.swiper;

        if (!endReached) {
            swiperInstance.slideNext();

            setBeginningReached(false);
        }
    }, [endReached]);

    return (
        <>
            <div className="offer-item-middle-title gap-2 mb-3">
                <span>Selezionate per te</span>
                {innerOffers.length > 1 ? (
                    <div className="d-flex gap-2">
                        <span
                            className={`prev ${beginningReached ? 'swiper-control-disabled' : 'swiper-control-active'}`}
                            onClick={!beginningReached ? handlePrev : () => {}}
                        >
                            <PrevIcon />
                        </span>
                        <span
                            className={`next ${endReached ? 'swiper-control-disabled' : 'swiper-control-active'}`}
                            onClick={!endReached ? handleNext : () => {}}
                        >
                            <NextIcon />
                        </span>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="offer-price-slider mb-4">
                <Swiper
                    ref={sliderRef}
                    slidesPerView={1.1}
                    spaceBetween={0}
                    modules={[Navigation, Pagination]}
                    onSlideNextTransitionStart={handleNextDrag}
                    onSlidePrevTransitionStart={handlePrevDrag}
                    onReachBeginning={() => {
                        setBeginningReached(true);
                    }}
                    onReachEnd={() => {
                        setEndReached(true);
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        500: {
                            slidesPerView: 1.5,
                            spaceBetween: 15,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 2.2,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                    }}
                >
                    {innerOffers?.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className={`offer-price-slider-item ${i === index ? 'active' : ''}`}
                                onClick={() => {
                                    setIndex(i);
                                    setActiveData(innerOffers[i]);
                                }}
                                style={{ margin: '1px' }}
                            >
                                <div className="info">
                                    <div className="duration">Dal</div>
                                    <div className="duration">
                                        {item?.startDate} al {item?.endDate}
                                    </div>
                                    <div className="text--small">
                                        {item?.dateString} - {item.selectItems[item.selectedOption].text}
                                    </div>
                                </div>

                                <h3 className="price">
                                    {parseInt(item?.selectItems[item.selectedOption].price).toFixed(2)}€
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="py-4">
                <button
                    className={`cmn-btn w-100 ${innerCollapse ? 'disable' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#package-inner-${serial}`}
                    onClick={() => setInnerCollapse(!innerCollapse)}
                >
                    <span className={`${innerCollapse ? 'text-title' : ''}`}>Richiedi Preventivo</span>{' '}
                    {innerCollapse ? <AngleUp /> : <AngleDown />}
                </button>
            </div>
            <div className="offer-price-slider-bottom">
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="full-board">
                            <div className="full-board-top">
                                <div>
                                    <SelectDropDown
                                        selectedOption={activeData.selectedOption}
                                        handleChange={(i) => {
                                            handleSelectedItemChange(index, i);
                                        }}
                                        selectItems={activeData.selectItems}
                                    />

                                    <span>Bevande {activeData['Bevande']}</span>
                                </div>
                                <h3>{activeData.dateString}</h3>
                            </div>
                            <ul className="check-lists">
                                {activeData['Tag Offerta'].split('-')?.map((item, i) =>
                                    item && item.length ? (
                                        <li key={i}>
                                            <CheckIcon />
                                            {item}
                                        </li>
                                    ) : (
                                        <></>
                                    )
                                )}
                            </ul>
                            <blockquote className="mb-4 blockquote">
                                PER QUESTA OFFERTA PUOI PAGARE CON INTERESSI ZERO IN 3 COMODE RATE CON SCALAPAY{' '}
                            </blockquote>
                            <div className="text-center">
                                <img src={scalapay} alt="" className="mw-100" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <FaqsItems id={`package-${serial}`} data={faqs} />
                    </div>
                </div>
                <div className="py-3"></div>
                <div className="row gx-4 gy-2">
                    {infos?.map((item, i) => (
                        <div className="col-md-6" key={i}>
                            <div className="infos-item">
                                <h5 className="title">
                                    <div>
                                        {item?.icon?.map((ico, j) => (
                                            <span className="icon" key={i}>
                                                {ico}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="s-title">{item?.title}</span>
                                </h5>
                                {item?.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="inquiry-form pt-32 collapse" id={`package-inner-${serial}`}>
                <div className="scroll-pos" ref={scrollRef}></div>
                <ViewInquiryForm
                    setUserData={setUserData}
                    userData={userData}
                    sending={sending}
                    setvalue={setvalue}
                    value={value}
                    handleSubmit={handleSubmit}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    offer={activeData}
                    Hotel={hotel['Nome Hotel']}
                    NomeModulo={hotel['NomeModulo']}
                    totalPriceForUser={activeData.selectItems[activeData.selectedOption].price.toFixed()}
                    buttonDisabled={buttonDisabled}
                    handleUpdateRooms={handleUpdateRooms}
                    setDatePickerOpen={setDatePickerOpen}
                    selectItems={activeData.selectItems}
                    selectedPackage={activeData.selectItems[activeData.selectedOption]}
                    handleOfferClose={handleOfferClose}
                    setSelectedPackage={(i) => {
                        handleSelectedItemChange(index, i);
                    }}
                />
            </div>
        </>
    );
};

const infos = [
    {
        icon: [<Ship />],
        title: 'In questa offerta rientra: Aliscafo + Transfer',
        text: 'FORMULA VIP: Aliscafo + Transfer in hotel (andata e ritorno) €35 a persona invece di € 71,00\nFORMULA VIP: Traghetto + Transfer in hotel (andata e ritorno) €25 a persona invece di € 71,00',
    },
    {
        icon: [<Ship />, <Car />],
        title: 'In questa offerta rientra: Traghetto + Auto',
        text: 'Auto (fino a 4 metri) con conducente a € 70,00 (invece di € 130,00) andata a ritorno. Per i passeggeri il costo è di € 17 a passeggero.',
    },
    {
        icon: [<Bus />],
        title: 'In questa offerta rientra: Bus da oltre 120 città italiane',
        text: 'Bus dalle principali città italiane fino in hotel, incluso biglietto traghetto facchinaggio e trasporto bagagli, a partire da € 69,00 a persona andata e ritorno.',
    },
    {
        icon: [<Train />],
        title: "In questa offerta rientra: Treno dall'Italia",
        text: "Treno dalle principali città italiane, con transfer dalla stazione di Napoli al porto, passaggi marittimi da Napoli per Ischia, taxi dal porto fino all'hotel, andata e ritorno, a partire da € 160,00 a persona.",
    },
];

export default React.forwardRef(OfferPriceSlider);
