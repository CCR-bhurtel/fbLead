import React, { useState } from 'react';

const Input = ({ required, type, value, handleChange, label, select, options, name, optional, ...rest }) => {
    return (
        <div className="position-relative">
            <label className="__form-label">
                <span className="pe-0">{label}</span>
                {!optional && (
                    <span className="ps-0" style={{ fontSize: '16px', lineHeight: '1' }}>
                        *
                    </span>
                )}
            </label>
            {!select ? (
                <input
                    type={type}
                    className="form-control __form-control"
                    value={value}
                    name={name}
                    onChange={handleChange}
                    {...rest}
                />
            ) : options ? (
                options.length ? (
                    <select
                        value={value}
                        name={name}
                        onChange={handleChange}
                        className="form-control __form-control form-select"
                    >
                        {...options.map((item, i) => (
                            <option key={i} value={item.options}>
                                {item.text}
                            </option>
                        ))}
                    </select>
                ) : (
                    <></>
                )
            ) : (
                <></>
            )}
        </div>
    );
};

export default Input;
