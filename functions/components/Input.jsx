import React, { useState } from "react";

const Input = ({ label, select, options, optional, ...rest }) => {
	const [value, setValue] = useState("");
	return (
		<div className="position-relative">
			<label className="__form-label">
				<span className="pe-0">{label}</span>
				{!optional && (
					<span
						className="ps-0"
						style={{ fontSize: "16px", lineHeight: "1" }}
					>
						*
					</span>
				)}
			</label>
			{!select ? (
				<input
					type="text"
					className="form-control __form-control"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					{...rest}
				/>
			) : (
				<select className="form-control __form-control form-select">
					{options?.map((item, i) => (
						<option value={item?.val}>{item?.text}</option>
					))}
				</select>
			)}
		</div>
	);
};

export default Input;
