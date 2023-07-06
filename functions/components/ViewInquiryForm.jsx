import React, { useState } from "react";
import { Plus2, Send } from "./Icon";
import Input from "./Input";

const ViewInquiryForm = () => {
	const [rooms, setRooms] = useState([]);
	const [value, setvalue] = useState("");

	const removeRoom = (index) => {
		const updatedRooms = [...rooms];
		updatedRooms.splice(index, 1);
		setRooms(updatedRooms);
	};
	return (
		<>
			<div className="inquiry--form">
				<div className="row g-3">
					<div className="col-sm-6 col-md-3">
						<Input label="First Name" placeholder="Your Name" />
					</div>
					<div className="col-sm-6 col-md-3">
						<Input label="Last Name" optional placeholder="User Name" />
					</div>
					<div className="col-sm-6 col-md-3">
						<Input label="E-mail " placeholder="Your Email" />
					</div>
					<div className="col-sm-6 col-md-3">
						<Input label="Telephone " placeholder="1234567890" />
					</div>
					<div className="col-sm-6 col-md-3 col-lg-2">
						<Input label="Arrival Date " placeholder="Your mail" />
					</div>
					<div className="col-sm-6 col-md-3 col-lg-2">
						<Input label="Departure Date" placeholder="15/Jan/2023" />
					</div>
					<div className="col-sm-6 col-md-3 col-lg-2">
						<Input
							label="Package"
							placeholder="Half board"
							select
							options={packaged}
						/>
					</div>
				</div>
				<div>
					<h5 className="text-base mt-4 r-title">
						{`Number of people (Room 1)`}
					</h5>
					<div className="row g-3">
						<div className="col-sm-6 col-md-3 col-lg-2">
							<Input label="Package" select options={adults} />
						</div>
						<div className="col-sm-6 col-md-3 col-lg-2">
							<Input label="Package" select options={children} />
						</div>
						<div className="col-sm-6 col-md-3 col-lg-2">
							<Input label="Package" placeholder="DD/MM/YY" />
						</div>
						<div className="col-sm-6 col-md-3 col-lg-2">
							<Input label="Package" placeholder="DD/MM/YY" />
						</div>
						<div className="col-sm-6 col-md-3 col-lg-2">
							<Input label="Package" placeholder="DD/MM/YY" />
						</div>
						<div className="col-sm-6 col-md-3 col-lg-2">
							<Input label="Package" placeholder="DD/MM/YY" />
						</div>
					</div>
				</div>
				{rooms?.map((item, i) => (
					<div>
						<h5 className="text-base mt-4 r-title">
							{`Number of people (Room ${i + 2})`}{" "}
							<button
								className="border-0 outline-0 bg-transparent text-danger d-none d-sm-inline-block"
								onClick={() => removeRoom(i)}
							>
								Rimuovi stanza 2
							</button>
						</h5>
						<div className="row g-3">
							<div className="col-sm-6 col-md-3 col-lg-2">
								<Input label="Package" select options={adults} />
							</div>
							<div className="col-sm-6 col-md-3 col-lg-2">
								<Input label="Package" select options={children} />
							</div>
							<div className="col-sm-6 col-md-3 col-lg-2">
								<Input label="Package" placeholder="DD/MM/YY" />
							</div>
							<div className="col-sm-6 col-md-3 col-lg-2">
								<Input label="Package" placeholder="DD/MM/YY" />
							</div>
							<div className="col-sm-6 col-md-3 col-lg-2">
								<Input label="Package" placeholder="DD/MM/YY" />
							</div>
							<div className="col-sm-6 col-md-3 col-lg-2">
								<Input label="Package" placeholder="DD/MM/YY" />
							</div>
						</div>
						<div className="text-center mt-2">
							<button
								className="border-0 outline-0 bg-transparent text-danger d-sm-none"
								onClick={() => removeRoom(i)}
							>
								Rimuovi stanza 2
							</button>
						</div>
					</div>
				))}
				<h5 className="text-base mt-4 r-title">
					Number of people (Room {rooms?.length + 2})
				</h5>
				<div className="row g-3">
					<div className="col-sm-6 col-md-3">
						<button
							className="form-control __form-control"
							onClick={() => setRooms((prevItems) => [...prevItems, ""])}
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
								onChange={(e) => setvalue("")}
							/>
							<div className="form-check-label">No Options</div>
						</div>
						<div className="text">
							VIP FORMULA: Hydrofoil + Transfer to Hotel $ 35.00 er
							Person instead of € 71.00 (round trip)
						</div>
					</label>
					<label className="__form-radio">
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="offer-with"
								onChange={(e) => setvalue("aliscafo")}
							/>
							<div className="form-check-label">Aliscafo + Transfer</div>
						</div>
						<div className="text">
							Auto (fino a 4 metri) € 75.00 (andata e ritorno). I
							passeggeri che viaggiano con Cauto, il costo supplementare
							é di € 22.00 a persona (andata e ritorno).
						</div>
						{value == "aliscafo" && (
							<>
								<br />
								<Input
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
								onChange={(e) => setvalue("ferry")}
							/>
							<div className="form-check-label">Ferry + Transfer</div>
						</div>
						<div className="text">
							from Naples or Pozzuoli wth tan to the hotel round trip €
							2500 per person instead of € 5000.
						</div>
						{value == "ferry" && (
							<>
								<br />
								<Input
									label="Dimensione Auto"
									select
									options={options2}
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
								onChange={(e) => setvalue("high-speed")}
							/>
							<div className="form-check-label">High Speed Train</div>
						</div>
						<div className="text">
							Train from the main Italian cities, with transfer from
							Naples station to the port, sea passages from Naples to
							Ischia, taxi from the port to the hotel starting from €
							160.00 per person round trip.
						</div>
						{value == "high-speed" && (
							<>
								<br />
								<Input
									label="Numero di Bagagli"
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
								onChange={(e) => setvalue("viaggio")}
							/>
							<div className="form-check-label">
								Viaggio dalla tua citta
							</div>
						</div>
						<div className="text">
							Train from the main Italian cities, with transfer from
							Naples station to the port, sea passages from Naples to
							Ischia, taxi from the port to the hotel starting from €
							160.00 per person round trip.
						</div>
						{value == "viaggio" && (
							<div className="row g-3 mt-2">
								<div className="col-sm-6">
									<Input
										label="Tipo di trasporto preferito"
										select
										options={options3}
									/>
								</div>
								<div className="col-sm-6">
									<Input
										label="Numero di Bagagli"
										select
										options={options4}
									/>
								</div>
							</div>
						)}
					</label>
				</div>
				<br />
				<div className="msg-txt mb-4">
					Per offrirvi il miglior servizio Vi preghiamo di specificare, nel
					campo che segue, maggiori informazioni per i trasferimenti ed
					eventuali esigenze per la vostra vacanza
				</div>
				<textarea
					className="form-control __form-control p-3"
					placeholder="Text..."
				></textarea>
				<div className="mt-3"></div>
				<label className="form-check form--check">
					<input
						className="form-check-input"
						type="checkbox"
						value=""
						id="flexCheckDefault"
					/>
					<span className="form-check-label">
						Ho preso visione e acconsento al{" "}
						<a href="#" className="text-base">
							trattamento dei miei dati personali in conformitä al
							Regolamento europeo 679/2016 *
						</a>
					</span>
				</label>
				<div className="mt-3"></div>
				<label className="form-check form--check">
					<input
						className="form-check-input"
						type="checkbox"
						value=""
						id="flexCheckDefault"
					/>
					<span className="form-check-label">
						Dichiaro di volermi iscrivere al servizio newsletter per
						ricevere Ie migliori offerte
					</span>
				</label>
			</div>
			<div className="pt-4">
				<button className="cmn-btn w-100" type="button">
					Send Inquiry <Send />
				</button>
			</div>
		</>
	);
};
const options = [
	{ val: "1 bagaglio", text: "1 bagaglio" },
	{ val: "5 bagaglio", text: "5 bagaglio" },
	{ val: "10 bagaglio", text: "10 bagaglio" },
];
const options2 = [
	{ val: "Minore di 4 metri", text: "Minore di 4 metri" },
	{ val: "5 bagaglio", text: "5 bagaglio" },
	{ val: "10 bagaglio", text: "10 bagaglio" },
];
const options3 = [
	{ val: "Bus da 85€", text: "Bus da 85€" },
	{ val: "Bus da 85€", text: "Bus da 85€" },
	{ val: "Bus da 85€", text: "Bus da 85€" },
];
const options4 = [
	{ val: "Milano", text: "Milano" },
	{ val: "Milano", text: "Milano" },
];

const packaged = [
	{
		options: "1",
		text: "Half board",
	},
	{
		options: "1",
		text: "Half board",
	},
	{
		options: "1",
		text: "Half board",
	},
	{
		options: "1",
		text: "Half board",
	},
];
const children = [
	{
		options: "1",
		text: "03 Adults",
	},
	{
		options: "1",
		text: "03 Adults",
	},
	{
		options: "1",
		text: "03 Adults",
	},
	{
		options: "1",
		text: "03 Adults",
	},
];
const adults = [
	{
		options: "1",
		text: "01 Adults",
	},
	{
		options: "1",
		text: "01 Adults",
	},
	{
		options: "1",
		text: "01 Adults",
	},
	{
		options: "1",
		text: "01 Adults",
	},
];

export default ViewInquiryForm;
