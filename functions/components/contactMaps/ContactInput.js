import React, { useEffect, useRef, useState } from 'react';

function ContactInput({ initialValue, selectedTable, updateCount, handleInputChange, keyName }) {
    const [content, setContent] = useState(initialValue);
    const [fields, setFields] = useState([...selectedTable.fields]);
    const [hideSelect, setHideSelect] = useState(true);
    const [search, setSearch] = useState('');

    const container = useRef();

    useEffect(() => {
        if (updateCount > 0) setContent('');
    }, [selectedTable]);

    const handleInputChangeInner = (event) => {
        setContent(event.target.value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        const regex = new RegExp(e.target.value, 'i');

        const filteredFields = selectedTable.fields.filter((field) => regex.test(field.name));

        setFields(filteredFields);
    };

    const handleFieldClicked = (field) => {
        const updated_content = content + `(${field.name}) `;
        setContent(updated_content);
        setHideSelect(true);
    };

    const handleKeyDown = (event) => {
        if (event.key == '$') {
            setHideSelect(false);
        } else {
            setHideSelect(true);
        }
    };

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (!container?.current?.contains(e.target)) {
                setHideSelect(true);
            }
        });
    }, []);

    useEffect(() => {
        handleInputChange(content);
    }, [content]);
    return (
        <div className="mt-2">
            <div>{keyName}*</div>
            <div ref={container} className="group relative ">
                <input
                    value={content}
                    className="outline-0 border-[0.5px] mt-4 border-gray-400 focus:border rounded-md focus:border-blue-300 min-w-[20rem] p-[10px]"
                    onChange={handleInputChangeInner}
                    onKeyDown={handleKeyDown}
                />

                {!hideSelect && (
                    <div className="absolute top-[100%] min-w-[20rem] left-[1rem] right-[1rem] flex flex-col border-[0.5px] border-gray-600 rounded bg-white z-[100] shadow-md max-h-[30rem] overflow-auto">
                        <input
                            onChange={handleSearchChange}
                            value={search}
                            placeholder="Search for fields"
                            className="outline-0 border-[0.5px]  border-gray-400 focus:border rounded-md focus:border-blue-300 p-[10px]"
                        />
                        <div className="mt-2 flex flex-row flex-wrap items-center justify-center p-4">
                            {fields.map((field) => (
                                <span
                                    key={field.name}
                                    onClick={() => {
                                        handleFieldClicked(field);
                                    }}
                                    className="mt-2 p-2 ml-2 rounded-md text-white bg-gray-400  cursor-pointer hover:bg-gray-600"
                                >
                                    {field.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactInput;
