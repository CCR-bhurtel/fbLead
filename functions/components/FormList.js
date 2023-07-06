import React from 'react';
import FormItem from './FormItem';

function FormList({ forms, deleteForm }) {
    return (
        <div className="p-4 mx-[3rem]">
            <table className="table-auto w-[100%]">
                <thead>
                    <tr>
                        <th className="headItem text-bold text-blue-500">Id</th>
                        <th className="headItem text-bold text-blue-500">Name</th>
                        <th className="headItem text-bold text-blue-500">Status</th>
                        <th className="headItem text-bold text-blue-500">Form Action</th>
                    </tr>
                </thead>
                <tbody className="overflow-scroll" >
                    {forms.map((form) => (
                        <FormItem key={form.formId} deleteFromLocal={deleteForm} form={form} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FormList;
