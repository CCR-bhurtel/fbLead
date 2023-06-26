import React from 'react';
import TemplateItem from './TemplateItem';

function TemplateList({ templates, updateTemplateMap, deleteTemplateMap }) {
    return (
        <div className="p-4 mx-[3rem]">
            <table className="table-auto w-[100%]">
                <thead>
                    <tr>
                        <th className="headItem text-bold text-blue-500">Id</th>
                        <th className="headItem text-bold text-blue-500">Table Name</th>
                        <th className="headItem text-bold text-blue-500">Template Name</th>
                        <th className="headItem text-bold text-blue-500">Form Action</th>
                    </tr>
                </thead>
                <tbody className="">
                    {templates.map((template) => (
                        <TemplateItem
                            key={template._id}
                            updateLocal={updateTemplateMap}
                            deleteFromLocal={deleteTemplateMap}
                            template={template}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TemplateList;
