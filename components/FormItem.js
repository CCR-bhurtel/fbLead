import axios from 'axios';
import React, { useState } from 'react';
import Popup from './Popup';
import { toast } from 'react-hot-toast';

function FormItem({ form, deleteFromLocal }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        setDeleting(true);
        axios
            .delete(`/api/form/${form._id}`, { headers: { 'x-auth-token': token } })
            .then((res) => {
                setDeleting(false);
                toast.success('Form deleted successfully');
                deleteFromLocal(form._id);
                handleIsDeleteClose();
            })
            .catch((err) => {
                setDeleting(false);
                toast.error(err.response?.data.message || 'Error deleting form');
            });
    };
    const handleIsDeleteOpen = () => {
        setIsDeleteOpen(true);
    };
    const handleIsDeleteClose = () => {
        setIsDeleteOpen(false);
    };
    return (
        <>
            {isDeleteOpen && (
                <Popup modalOpen={isDeleteOpen} handleClose={handleIsDeleteClose}>
                    <div className="bg-white p-4 rounded-md min-h-[4rem] min-w-[10rem] flex flex-col items-center justify-center ">
                        <h2 className="font-semibold text-xl"> Are you sure, you want to delete this form?</h2>
                        <div className="buttons flex items-center flex-row justify-between mt-4">
                            <button
                                onClick={handleDelete}
                                className="rounded-md bg-red-500 color-white p-2 hover:border-2 hover:border-red-500 hover:text-red-500 hover:bg-transparent text-white"
                            >
                                {deleting ? 'Deleting' : 'Delete'}
                            </button>
                            <button
                                onClick={handleIsDeleteClose}
                                className="rounded-md ml-4 bg-blue-500 color-white p-2 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent text-white"
                            >
                                cancel
                            </button>
                        </div>
                    </div>
                </Popup>
            )}
            <tr className="min-w-[100%]">
                <td className="text-center">{form.formId}</td>
                <td className="text-center">{form.formName}</td>
                <td className="text-center">active</td>
                <td className="text-center">
                    <button
                        onClick={handleIsDeleteOpen}
                        className="bg-red-600 text-white rounded-xl p-2 w-[6rem] hover:border-2 hover:bg-transparent hover:border-red-600 hover:text-red-600"
                    >
                        Elimina
                    </button>
                </td>
            </tr>
        </>
    );
}

export default FormItem;
