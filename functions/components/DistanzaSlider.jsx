import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { DistanzaDalMare, InternalConv, LocationTwo } from "./Icon";

const DistanzaSlider = () => {
	return (
		<Swiper
			slidesPerView={1.4}
			spaceBetween={12}
			modules={[Pagination, Navigation]}
			pagination={{ clickable: true }}
			breakpoints={{
				640: {
					slidesPerView: 2,
					spaceBetween: 12,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 12,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 12,
				},
			}}
		>
			{distanzaData?.map(({ icon, title, text }, i) => (
				<SwiperSlide key={i}>
					<div className="destanza-slide-item">
						<div className="icon">{icon}</div>
						<h5>{title}</h5>
						<div>{text}</div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

const distanzaData = [
	{
		icon: <LocationTwo />,
		title: "300m.",
		text: "Distanza dal centro",
	},
	{
		icon: <DistanzaDalMare />,
		title: "2418m.",
		text: "Distanza dal mare",
	},
	{
		icon: <InternalConv />,
		title: "Internal Conv.",
		text: "Distanza dalle Terme",
	},
];

export default DistanzaSlider;
