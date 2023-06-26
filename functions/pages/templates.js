import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

import { useRouter } from 'next/router';
import axios from 'axios';
import Logo from '../public/logo.png';
import Plus from '../public/plus.png';
import Search from '../public/search.png';
import { Toaster, toast } from 'react-hot-toast';
import Popup from '../components/Popup';
import AddTemplate from '../components/templates/AddTemplate';
import TemplateList from '../components/templates/TemplateList';

export default function Templates() {
    const { state, dispatch } = useContext(AuthContext);

    const [showAddTemplate, setShowAddTemplate] = useState(false);

    const handleAddTemplateOpen = () => {
        setShowAddTemplate(true);
    };
    const handleAddTemplateClose = () => {
        setShowAddTemplate(false);
    };

    const [templates, setTemplates] = useState([]);

    const addLocalTemplate = (form) => {
        const newLocalTemplates = templates.concat(form);
        setTemplates(newLocalTemplates);
    };

    const deleteTemplate = (_id) => {
        const filteredTemplates = templates.filter((template) => template._id !== _id);
        setTemplates(filteredTemplates);
    };

    const updateTemplate = (updated_template) => {
        const filteredTemplates = templates.map((template) => {
            if (template._id == updated_template._id) {
                return updated_template;
            } else {
                return template;
            }
        });
        setTemplates((prev_templates) => [...filteredTemplates]);
    };

    const loadMaps = () => {
        const token = localStorage.getItem('token');

        axios
            .get('/api/respond/templatemaps', {
                headers: {
                    'x-auth-token': token,
                },
            })
            .then((res) => {
                setTemplates(res.data.templateMaps);
            })
            .catch((err) => {
                toast.error(err.response?.data.message || 'Error loading template maps');
            });
    };
    const router = useRouter();

    const handleSearchChange = (e) => {
        const token = localStorage.getItem('token');
        axios
            .get(`/api/respond/templatemaps/search?search=${e.target.value}`, { headers: { 'x-auth-token': token } })
            .then((res) => {
                setTemplates((prevMaps) => [...res.data.templateMaps]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (!state.isLoggedIn) {
            router.push('login');
        }
        loadMaps();
    }, [state.isLoggedIn, router]);

    return (
        <div className="container min-w-screen min-h-screen flex items-center  flex-col">
            {showAddTemplate && (
                <Popup handleClose={handleAddTemplateClose} modalOpen={showAddTemplate}>
                    <AddTemplate addLocalTemplate={addLocalTemplate} handleClose={handleAddTemplateClose} />
                </Popup>
            )}
            <Toaster />

            <img src={Logo.src} alt="infologo" className="w-[120px] mt-[4rem]" />
            <div className="tableContainer mt-[6rem] mb-[2rem]">
                <div className="tableWrapper min-w-[60vw] border-[1px] border-blue-400 min-h-[30rem] rounded-xl relative flex flex-col">
                    <div className="inputContainer relative">
                        <div className="search ">
                            <img src={Search.src} className="w-[20px] absolute left-2 top-3" alt="" />
                        </div>
                        <div className="plus cursor-pointer" onClick={handleAddTemplateOpen}>
                            <img src={Plus.src} alt="" className="w-[20px] absolute right-2 top-3" />
                        </div>
                        <input
                            type="text"
                            onChange={handleSearchChange}
                            placeholder="Search by table name"
                            className="min-w-[100%] rounded-tl-xl rounded-tr-xl h-[3rem] outline-0 px-[4rem] text-bold placeholder:text-gray-300 text-gray-500"
                            style={{ background: '#F6F6F6' }}
                        />
                    </div>
                    <div
                        className="mt-[1rem] flex-grow m-[2px] rounded-bl-xl rounded-br-xl "
                        style={{ background: '#F6F6F6' }}
                    >
                        <TemplateList
                            templates={templates}
                            deleteTemplateMap={deleteTemplate}
                            updateTemplateMap={updateTemplate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
