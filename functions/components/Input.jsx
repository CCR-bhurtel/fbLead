import React, { createRef, useRef, useState } from 'react';

const Input = React.forwardRef((props, ref) => {
    const { required, type, value, handleChange, label, select, options, name, optional, hasValue, ...rest } = props;

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
                    className={`${value && 'has-value'} form-control __form-control`}
                    value={value}
                    name={name}
                    onChange={handleChange}
                    ref={ref}
                    {...rest}
                />
            ) : options ? (
                options.length ? (
                    options.length === 1 ? (
                        <input
                            type={type}
                            className={`${value && 'has-value'} form-control __form-control`}
                            value={options[0].text}
                            name={name}
                            ref={ref}
                                {...rest}
                                readOnly
                        />
                    ) : (
                        <select
                            value={value}
                            name={name}
                            onChange={(e) => handleChange(e)}
                            className="form-control __form-control form-select"
                        >
                            {...options.map((item, i) => (
                                <option key={i} value={item.text}>
                                    {item.text}
                                </option>
                            ))}
                        </select>
                    )
                ) : (
                    <></>
                )
            ) : (
                <></>
            )}
        </div>
    );
});

export default Input;
