/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import languages from '../../utils/languages';
import countries from '../../utils/countries';
import ContactInput from './ContactInput';

function UpdateContact({ tableUpdateCount, selectedTable, handleChangeContactFieldMap, initialState }) {
    const [contactFieldMaps, setContactFieldMaps] = useState({
        ...initialState,
    });
    const [fields, setFields] = useState([
        { name: 'firstName', label: 'First Name', dataType: 'text', fieldType: 'normal' },
        { name: 'lastName', label: 'Last Name', dataType: 'text', fieldType: 'normal' },
        { name: 'phone', label: 'Phone', dataType: 'text', fieldType: 'normal' },
        { name: 'email', label: 'Email', dataType: 'text', fieldType: 'normal' },
        {
            name: 'language',
            label: 'Language',
            dataType: 'list',
            allowedValues: { listValues: [...languages] },
            fieldType: 'normal',
        },

        {
            name: 'countryCode',
            label: 'Country',
            dataType: 'list',
            allowedValues: { listValues: [...countries] },
            fieldType: 'normal',
        },
    ]);

    const loadCustomFields = () => {
        const token = localStorage.getItem('token');
        axios
            .get('/api/respond/fields', {
                headers: {
                    'x-auth-token': token,
                },
            })
            .then((res) => {
                const customFields = res.data.fields;

                setFields(fields.concat(customFields));
            })
            .catch((err) => {
                toast.error(err.response?.message);
            });
    };

    const handleFieldMapChange = (key, value) => {
        handleChangeContactFieldMap({ ...contactFieldMaps, [key]: value });
        setContactFieldMaps({ ...contactFieldMaps, [key]: value });
    };

    useEffect(() => {
        if (tableUpdateCount > 0) {
            setContactFieldMaps({ ...initialState });
        }
    }, [tableUpdateCount]);
    useEffect(() => {
        loadCustomFields();
    }, []);
    return (
        <div className="w-100 flex flex-col items-center justify-center mt-2">
            <Toaster />
            <h4 className="font-medium text-md text-center">Add or update contact</h4>
            {fields.map((field) => {
                // if (obj.key === 'custom_field') return <></>;

                if (['text', 'url', 'number'].includes(field.dataType)) {
                    return (
                        <ContactInput
                            updateCount={tableUpdateCount}
                            keyName={field.fieldType === 'normal' ? field.label : field.name}
                            initialValue={
                                field.fieldType === 'normal'
                                    ? contactFieldMaps[field.name]
                                    : contactFieldMaps[`custom_${field.name}`]
                            }
                            selectedTable={selectedTable}
                            handleInputChange={(content) => {
                                if (field.fieldType === 'normal') {
                                    handleFieldMapChange(field.name, content);
                                } else {
                                    handleFieldMapChange(`custom_${field.name}`, content);
                                }
                            }}
                        />
                    );
                } else if (field.dataType === 'list') {
                    if (field.fieldType === 'normal') {
                        return (
                            <div className="mt-4">
                                <p>{field.label}</p>
                                <select
                                    className="outline-0 border-[0.5px] mt-2 border-gray-400 focus:border rounded-md focus:border-blue-300 w-[20rem]  p-[10px]"
                                    onChange={(e) => {
                                        handleFieldMapChange(field.name, e.target.value);
                                    }}
                                    value={contactFieldMaps[field.name]}
                                >
                                    <option disabled selected hidden>
                                        Select an option
                                    </option>
                                    {field.allowedValues.listValues.map((allowedOption) => (
                                        <option value={allowedOption.code}>{allowedOption.name}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    } else {
                        return (
                            <div className="mt-4">
                                <p>{field.name}</p>
                                <select
                                    className="outline-0 border-[0.5px] mt-2 border-gray-400 focus:border rounded-md focus:border-blue-300 w-[20rem] p-[10px]"
                                    onChange={(e) => {
                                        handleFieldMapChange(`custom_${field.name}`, e.target.value);
                                    }}
                                    value={contactFieldMaps[`custom_${field.name}`]}
                                >
                                    <option disabled selected hidden>
                                        Select an option
                                    </option>
                                    {field.allowedValues.listValues.map((allowedOption) => (
                                        <option value={allowedOption}>{allowedOption}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    }
                } else if (field.dataType === 'checkbox') {
                    if (field.fieldType === 'normal') {
                        return (
                            <div className="mt-4">
                                <p>{field.name}</p>
                                <select
                                    className="outline-0 border-[0.5px] mt-2 border-gray-400 focus:border rounded-md focus:border-blue-300 w-[20rem] p-[10px]"
                                    onChange={(e) => {
                                        handleFieldMapChange(field.name, e.target.value);
                                    }}
                                    value={contactFieldMaps[field.name]}
                                >
                                    <option disabled selected hidden>
                                        Select an option
                                    </option>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </select>
                            </div>
                        );
                    } else {
                        return (
                            <div className="mt-4">
                                <p>{field.name}</p>
                                <select
                                    className="outline-0 border-[0.5px] mt-2 border-gray-400 focus:border rounded-md focus:border-blue-300 w-[20rem] p-[10px]"
                                    onChange={(e) => {
                                        handleFieldMapChange(`custom_${field.name}`, e.target.value);
                                    }}
                                    value={contactFieldMaps[`custom_${field.name}`]}
                                >
                                    <option disabled selected hidden>
                                        Select an option
                                    </option>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </select>
                            </div>
                        );
                    }
                }
            })}
        </div>
    );
}

export default UpdateContact;
