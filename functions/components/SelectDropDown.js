import React, { useState } from 'react';
import { AngleDown, AngleUp } from './Icon';

function SelectDropDown({ selectItems }) {
    const [activeSelectIndex, setActiveSelectIndex] = useState(0);
    const [selectOpen, setSelectOpen] = useState(false);
    if (!selectItems) return <></>;
    return (
        <h6>
            {selectItems[activeSelectIndex]}
            {selectItems.length > 0 ? (
                <>
                    {selectOpen ? (
                        <span className="relative">
                            <span onClick={() => setSelectOpen(false)}>
                                <AngleUp color="var(--title)" />
                            </span>
                            <ul className="bg-white rounded-md absolute p-2 top-0 left-0 w-[8rem]">
                                {selectItems.map((item, i) => (
                                    <li
                                        className="mt-2 cursor-pointer w-100  hover:text-orange-400 "
                                        key={i}
                                        onClick={() => {
                                            setActiveSelectIndex(i);
                                            setSelectOpen(false);
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </span>
                    ) : (
                        <span onClick={() => setSelectOpen(true)}>
                            <AngleDown color="var(--title)" />
                        </span>
                    )}
                </>
            ) : (
                <></>
            )}
        </h6>
    );
}

export default SelectDropDown;
