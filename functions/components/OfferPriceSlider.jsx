/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import scalapay from "../assets/img/scalapay.png";
import { FaqsItems } from "./FaqsItems";
import {
	AngleDown,
	AngleUp,
	Bus,
	Car,
	CheckIcon,
	NextIcon,
	PrevIcon,
	Ship,
	Train,
} from "./Icon";
import ViewInquiryForm from "./ViewInquiryForm";
const OfferPriceSlider = ({ serial, setOfferButtonIn, offerButtonIn }) => {
	const [index, setIndex] = useState(0);
	const [innerCollapse, setInnerCollapse] = useState(false);

	const sliderRef = useRef(null);

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);
	const scrollRef = useRef();
	useEffect(() => {
		if (innerCollapse) {
			if (scrollRef) {
				scrollRef.current.scrollIntoView({ behavior: "smooth" });
			}
			setOfferButtonIn(false);
		} else {
			setOfferButtonIn(true);
		}
	}, [innerCollapse]);

	return (
		<>
			<div className="offer-item-middle-title gap-2 mb-3">
				<span>Best offers For you</span>
				<div className="d-flex gap-2">
					<span className="prev" onClick={handlePrev}>
						<PrevIcon />
					</span>
					<span className="next" onClick={handleNext}>
						<NextIcon />
					</span>
				</div>
			</div>
			<div className="offer-price-slider mb-4">
				<Swiper
					ref={sliderRef}
					slidesPerView={1.1}
					spaceBetween={0}
					modules={[Navigation, Pagination]}
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
					{data?.map((item, i) => (
						<SwiperSlide key={i}>
							<div
								className={`offer-price-slider-item ${
									i === index ? "active" : ""
								}`}
								onClick={() => setIndex(i)}
								style={{ margin: "1px" }}
							>
								<div className="info">
									<div className="duration">From</div>
									<div className="duration">{item?.duration}</div>
									<div className="text--small">
										7 nights - Full board
									</div>
								</div>
								<h3 className="price">{item?.price}</h3>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="py-4">
				<button
					className={`cmn-btn w-100 ${innerCollapse ? "disable" : ""}`}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={`#package-inner-${serial}`}
					onClick={() => setInnerCollapse(!innerCollapse)}
				>
					<span className={`${innerCollapse ? "text-title" : ""}`}>
						View Inquiry
					</span>{" "}
					{innerCollapse ? <AngleUp /> : <AngleDown />}
				</button>
			</div>
			<div className="offer-price-slider-bottom">
				<div className="row g-4">
					<div className="col-lg-6">
						<div className="full-board">
							<div className="full-board-top">
								<div>
									<h6>
										Full Board <AngleDown color="var(--base)" />{" "}
									</h6>
									<span>Drinks Included</span>
								</div>
								<h3>7 Nights</h3>
							</div>
							<ul className="check-lists">
								{checkItems?.map((item, i) => (
									<li key={i}>
										<CheckIcon />
										{item}
									</li>
								))}
							</ul>
							<blockquote className="mb-4 blockquote">
								FOR THIS OFFER, PAY WITH ZERO INTEREST IN 3 COMFORTABLE
								INSTALLMENTS WITH
							</blockquote>
							<div className="text-center">
								<img src={scalapay.src} alt="" className="mw-100" />
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
			<div
				className="inquiry-form pt-32 collapse"
				id={`package-inner-${serial}`}
			>
				<div className="scroll-pos" ref={scrollRef}></div>
				<ViewInquiryForm />
			</div>
		</>
	);
};

const data = [
	{
		duration: "7 JUNE to 11 JUNE",
		price: "$304.6",
	},
	{
		duration: "12 JUNE to 18 JUNE",
		price: "$456.9",
	},
	{
		duration: "7 JUNE to 11 JUNE",
		price: "$533.5",
	},
	{
		duration: "7 JUNE to 11 JUNE",
		price: "$304.6",
	},
	{
		duration: "12 JUNE to 18 JUNE",
		price: "$456.9",
	},
	{
		duration: "7 JUNE to 11 JUNE",
		price: "$533.5",
	},
];
const checkItems = [
	"All Inclusive",
	"Drinks Included",
	"- Solarium",
	"Swimming Pools",
	"June 2nd Bridge",
];
const faqs = [
	{
		title: "Description",
		paragraph: "Accommodation in standard room",
		text: [
			"Full board treatment including drinks",
			"BEACH SERVICE INCLUDED IN THE PRICE",
		],
	},
	{
		title: "Package Included ",
		paragraph: "Accommodation in standard room",
		text: [
			"Full board treatment including drinks",
			"BEACH SERVICE INCLUDED IN THE PRICE",
		],
	},
	{
		title: "Supplements",
		paragraph: "Accommodation in standard room",
		text: [
			"Full board treatment including drinks",
			"BEACH SERVICE INCLUDED IN THE PRICE",
		],
	},
	{
		title: "Reductions",
		paragraph: "Accommodation in standard room",
		text: [
			"Full board treatment including drinks",
			"BEACH SERVICE INCLUDED IN THE PRICE",
		],
	},
];
const infos = [
	{
		icon: [<Ship />],
		title: "Save On The Sea Passage + Transfer",
		text: "VIP FORMULA: Hydrofoil + Transfer to Hotel  $ 35.00 er Person instead of € 71.00 (round trip)",
	},
	{
		icon: [<Ship />, <Car />],
		title: "Travel Without Worries: Book The Ferry + Car With Us",
		text: "VIP FORMULA: Hydrofoil + Transfer to Hotel  $ 35.00 er Person instead of € 71.00 (round trip)",
	},
	{
		icon: [<Bus />],
		title: "Save On The Sea Passage + Transfer",
		text: "VIP FORMULA: Hydrofoil + Transfer to Hotel  $ 35.00 er Person instead of € 71.00 (round trip)",
	},
	{
		icon: [<Train />],
		title: "This Offer Falls Under: Train From Italy",
		text: "VIP FORMULA: Hydrofoil + Transfer to Hotel  $ 35.00 er Person instead of € 71.00 (round trip)",
	},
];

export default OfferPriceSlider;
