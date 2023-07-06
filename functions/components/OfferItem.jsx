import React, { useCallback, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import mask from "../assets/img/mask.png";
import bg_3 from "../assets/img/offer-bg-2.png";
import bg_4 from "../assets/img/offer-bg-3.png";
import bg_2 from "../assets/img/offer-bg.png";
import plus from "../assets/img/plus.png";
import bg_1 from "../assets/img/regular-bg.png";
import review from "../assets/img/review.png";
import DistanzaSlider from "./DistanzaSlider";
import {
	AngleDown,
	AngleUp,
	LocationThree,
	NextArrow,
	Phone,
	PrevArrow,
	Star,
	Whatsapp,
} from "./Icon";
import OfferPriceSlider from "./OfferPriceSlider";
const OfferItem = (props) => {
	const { img, price, ticker, offer, index } = props;

	const [offerOpen, setOfferOpen] = useState(false);
	const [offerButtonIn, setOfferButtonIn] = useState(true);

	const sliderRef = useRef(null);

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);
	return (
		<div className="offer-item">
			<div
				className="offer-item-top"
				style={{
					background: `url(${
						offer
							? index % 3 == 0
								? bg_4.src
								: index % 3 == 1
								? bg_2.src
								: bg_3.src
							: bg_1.src
					}) no-repeat center center / cover`,
				}}
			>
				<div
					className={`offer-item-top-top flex justify-between items-center ${
						ticker ? "has-ticker" : ""
					}`}
				>
					<div className="rating">
						<Star />
						<Star />
						<Star />
						<Star />
						<Star />
					</div>
					<div className="price-area">
						<div>A PARTIRE DA</div>
						<h4>{price}</h4>
					</div>

					{ticker ? (
						<span className="ticker hidden md:flex">
							<span>{ticker}</span>
						</span>
					) : (
						""
					)}
				</div>
				<div className="offer-top-middle flex flex-wrap justify-between">
					<div className="offer-left-side">
						<div
							className="slider-area"
							style={{
								WebkitMask: `url(${mask}) no-repeat center center / contain`,
							}}
						>
							<div className="prev-arrow" onClick={handlePrev}>
								<PrevArrow />
							</div>
							<div className="next-arrow" onClick={handleNext}>
								<NextArrow />
							</div>
							<Swiper
								spaceBetween={20}
								modules={[Pagination, Navigation]}
								pagination={{ clickable: true }}
								ref={sliderRef}
							>
								{img?.map((item, i) => (
									<SwiperSlide key={i}>
										<div className="img-item">
											<img src={item} alt="" />
										</div>
									</SwiperSlide>
								))}
							</Swiper>
							{ticker ? (
								<span className="ticker d-md-none">
									<span>{ticker}</span>
								</span>
							) : (
								""
							)}
						</div>
						<div className="slider-content-area">
							<h5 className="title">
								<a href="#0" className="text-title">
									Wellness Hotel Flora
								</a>
							</h5>
							<span className="location">
								<LocationThree /> Ischia Porto
							</span>
							<div className="flex items-center review">
								<img src={review.src} alt="" />
								<button
									className="outline-0 border-0 bg-transparent position-relative"
									style={{ marginLeft: "-25px" }}
								>
									<img src={plus.src} alt="" />
								</button>
								<div>
									<div>4.5/5</div>
									<div className="subtxt">(125K Review)</div>
								</div>
							</div>
							<h6 className="subtitle">
								Hotel 3 Stelle situato a Ischia Porto Centro poco
								distante dal mare e terme convenzionate
							</h6>
							<div className="lorem">
								A pochi passi dal porto, dalla spiaggia e dalle vie
								principali dello shopping e della movida ischitana. Il
								Wellness Hotel Flora e' per chi a...
							</div>
						</div>
					</div>
					<div className="offer-right-side">
						<DistanzaSlider />
						<div className="offer-btn-grp">
							<button
								className={`cmn-btn ${offerOpen ? "disable" : ""}`}
								data-bs-toggle="collapse"
								data-bs-target={`#offer-${index}`}
								onClick={() => setOfferOpen(!offerOpen)}
							>
								{offerOpen ? (
									<span className="text-title">
										Close Offer <AngleUp />
									</span>
								) : (
									<span>
										Vedi Offerta <AngleDown />
									</span>
								)}
							</button>
							<button
								type="button"
								className="outline-0 bg-transparent whatsapp-btn"
							>
								<Whatsapp />
							</button>
							<a href="#0" className="tel-btn">
								<div className="icon">
									<Phone color="#24A9E0" />
								</div>
								<div className="cont">
									<div>Parliamone!</div>
									<div className="subtxt">081.197.58.557</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="offer-item-middle collapse" id={`offer-${index}`}>
				<div className="overlayer" />
				<OfferPriceSlider
					setOfferButtonIn={setOfferButtonIn}
					offerButtonIn={offerButtonIn}
					serial={index}
				/>
			</div>
		</div>
	);
};

export default OfferItem;
