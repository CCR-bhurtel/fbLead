import React, { useEffect, useState } from 'react';
import Plus from '../public/plus.png';
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
uuidv4();

function AddForm({ addLocalForm, handleClose }) {
    const [fields, setFields] = useState([]);

    const [data, setData] = useState({ formName: '', formId: '' });

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addNewField = (type) => {
        const newFields = fields.concat({
            id: uuidv4(),
            facebookField: '',
            ninoxField: '',
            tableType: type,
        });
        setFields(newFields);
    };

    const removeField = (id) => {
        const newFields = fields.filter((field) => field.id !== id);
        setFields(newFields);
    };

    const handleFieldDataChange = (e, id) => {
        const newFields = fields.map((field) => {
            if (field.id == id) {
                return { ...field, [e.target.name]: e.target.value };
            } else {
                return field;
            }
        });
        setFields(newFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios
            .post(
                '/api/form',
                { ...data, formFields: fields },
                { headers: { 'x-auth-token': token, 'Content-Type': 'application/json' } }
            )
            .then((res) => {
                addLocalForm(res.data.form);
                toast.success('Form added successfully');
                handleClose();
            })
            .catch((err) => {
                toast.error(err.response?.data.message || 'Error adding new form');
            });
    };

    return (
        <div className="bg-white absolute min-w-[30rem] h-[30rem] overflow-y-scroll rounded-xl p-4 ">
            <h1 className="font-semibold text-xl text-center">Add new form</h1>
            <form onSubmit={handleSubmit} className="w-100 flex flex-col items-center justify-center">
                <input
                    type="text"
                    name="formName"
                    onChange={handleDataChange}
                    value={data.formName}
                    placeholder="Form name"
                    required
                    className="outline-0 border-[0.5px] mt-4 border-gray-400 focus:border rounded-md focus:border-blue-300 w-[90%] p-[10px]"
                />

                <input
                    type="text"
                    name="formId"
                    onChange={handleDataChange}
                    value={data.formId}
                    placeholder="Form id"
                    required
                    className="outline-0 border-[0.5px] mt-4 border-gray-400 rounded-md focus:border rounde-md focus:border-blue-300 w-[90%] p-[10px]"
                />
                <div className="fieldSection flex items-center flex-col justify-center">
                    <p className="mt-2 font-medium">Form fields for Anagrafiche</p>

                    {fields.map((field) => {
                        if (field.tableType === 'basics') {
                            return (
                                <div
                                    key={field.formId}
                                    className="w-[90%] flex flex-row mt-4 items-center justify-between"
                                >
                                    <input
                                        type="text"
                                        value={field.ninoxField}
                                        name="ninoxField"
                                        placeholder="Ninox field"
                                        required
                                        onChange={(e) => handleFieldDataChange(e, field.id)}
                                        className="outline-0 border-[0.5px]  border-gray-400 focus:border rounded-md focus:border-blue-300  p-[10px]"
                                    />

                                    <input
                                        type="text"
                                        value={field.facebookField}
                                        name="facebookField"
                                        placeholder="Facebook field"
                                        required
                                        onChange={(e) => handleFieldDataChange(e, field.id)}
                                        className="outline-0 border-[0.5px] ml-2 border-gray-400 rounded-md focus:border rounde-md focus:border-blue-300  p-[10px]"
                                    />
                                    <div
                                        onClick={() => {
                                            removeField(field.id);
                                        }}
                                        className="minus text-5xl mx-3 cursor-pointer text-red-500"
                                    >
                                        -
                                    </div>
                                </div>
                            );
                        }
                    })}
                    <img onClick={() => addNewField('basics')} src={Plus.src} alt="" className="cursor-pointer" />
                </div>

                <div className="fieldSection flex items-center flex-col justify-center mt-4">
                    <p className="mt-2 font-medium">Form fields for PR FB</p>

                    {fields.map((field) => {
                        if (field.tableType === 'prFb') {
                            return (
                                <div
                                    key={field.formId}
                                    className="w-[90%] flex flex-row mt-4 items-center justify-between"
                                >
                                    <input
                                        type="text"
                                        value={field.ninoxField}
                                        name="ninoxField"
                                        placeholder="Ninox field"
                                        required
                                        onChange={(e) => handleFieldDataChange(e, field.id)}
                                        className="outline-0 border-[0.5px]  border-gray-400 focus:border rounded-md focus:border-blue-300  p-[10px]"
                                    />

                                    <input
                                        type="text"
                                        value={field.facebookField}
                                        name="facebookField"
                                        placeholder="Facebook field"
                                        required
                                        onChange={(e) => handleFieldDataChange(e, field.id)}
                                        className="outline-0 border-[0.5px] ml-2 border-gray-400 rounded-md focus:border rounde-md focus:border-blue-300  p-[10px]"
                                    />
                                    <div
                                        onClick={() => {
                                            removeField(field.id);
                                        }}
                                        className="minus text-5xl mx-3 cursor-pointer text-red-500"
                                    >
                                        -
                                    </div>
                                </div>
                            );
                        }
                    })}
                    <img onClick={() => addNewField('prFb')} src={Plus.src} alt="" className="cursor-pointer" />
                </div>

                <button className="bg-blue-600 mt-4 text-white w-[5rem] p-3 rounded-md hover:bg-transparent hover:border-[1px] hover:border-blue-600 hover:text-blue-600">
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddForm;
