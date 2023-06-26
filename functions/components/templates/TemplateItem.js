import axios from 'axios';
import React, { useState } from 'react';
import Popup from '../Popup';
import { toast } from 'react-hot-toast';
import UpdateTemplate from './UpdateTemplate';

function TemplateItem({ template, deleteFromLocal, updateLocal }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleIsUpdateOpen = () => {
        setIsUpdateOpen(true);
    };

    const handleIsUpdateClose = () => {
        setIsUpdateOpen(false);
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        setDeleting(true);
        axios
            .delete(`/api/respond/templatemaps/${template._id}`, { headers: { 'x-auth-token': token } })
            .then((res) => {
                toast.success('Template_map deleted successfully');
                deleteFromLocal(template._id);
                handleIsDeleteClose();
                setDeleting(false);
            })
            .catch((err) => {
                toast.error(err.response?.data.message || 'error deleting template_map');
                setDeleting(false);
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
                        <h2 className="font-semibold text-xl"> Are you sure, you want to delete this template map?</h2>
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
            {isUpdateOpen && (
                <Popup modalOpen={isUpdateOpen} handleClose={handleIsUpdateClose}>
                    <UpdateTemplate template={template} updateLocal={updateLocal} handleClose={handleIsUpdateClose} />
                </Popup>
            )}
            <tr className="min-w-[100%]">
                <td className="text-center">{template._id}</td>
                <td className="text-center">{template.tableName}</td>
                <td className="text-center">{template.templateName}</td>
                <td className="text-center flex flex-row items-center justify-center">
                    <button
                        onClick={handleIsUpdateOpen}
                        className="bg-blue-400 text-white rounded-xl p-2 w-[6rem] hover:border-2 hover:bg-transparent hover:border-red-600 hover:text-red-600"
                    >
                        Modificare
                    </button>
                    <button
                        onClick={handleIsDeleteOpen}
                        className="bg-red-600 text-white rounded-xl ml-2 p-2 w-[6rem] hover:border-2 hover:bg-transparent hover:border-red-600 hover:text-red-600"
                    >
                        Elimina
                    </button>
                </td>
            </tr>
        </>
    );
}

export default TemplateItem;
