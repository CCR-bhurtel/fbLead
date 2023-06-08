import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import setAuthToken from '../utils/setAuthToken';
import { useRouter } from 'next/router';
import axios from 'axios';
import Logo from '../public/logo.png';
import Plus from '../public/plus.png';
import Search from '../public/search.png';
import FormList from '../components/FormList';
import { Toaster, toast } from 'react-hot-toast';
import Popup from '../components/Popup';
import AddForm from '../components/AddForm';

export default function Home() {
    const { state, dispatch } = useContext(AuthContext);

    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddFormOpen = () => {
        setShowAddForm(true);
    };
    const handleAddFormClose = () => {
        setShowAddForm(false);
    };

    const [forms, setForms] = useState([]);

    const loadForms = () => {
        const token = localStorage.getItem('token');
        axios
            .get('/api/form', { headers: { 'x-auth-token': token } })
            .then((res) => {
                setForms(res.data.forms);
            })
            .then((err) => {
                console.log(err);
            });
    };

    const addLocalForm = (form) => {
        const newLocalForms = forms.concat(form);
        setForms(newLocalForms);
    };

    const deleteForm = (_id) => {
        const filteredForms = forms.filter((form) => form._id !== _id);
        setForms(filteredForms);
    };

    const router = useRouter();

    const handleSearchChange = (e) => {
        const token = localStorage.getItem('token');
        axios
            .get(`/api/form/search?search=${e.target.value}`, { headers: { 'x-auth-token': token } })
            .then((res) => {
                setForms(res.data.forms);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (!state.isLoggedIn) {
            router.push('login');
        }
        loadForms();
    }, [state.isLoggedIn, router]);

    return (
        <div className="container min-w-screen min-h-screen flex items-center  flex-col">
            {showAddForm && (
                <Popup handleClose={handleAddFormClose} modalOpen={showAddForm}>
                    <AddForm addLocalForm={addLocalForm} handleClose={handleAddFormClose} />
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
                        <div className="plus cursor-pointer" onClick={handleAddFormOpen}>
                            <img src={Plus.src} alt="" className="w-[20px] absolute right-2 top-3" />
                        </div>
                        <input
                            type="text"
                            onChange={handleSearchChange}
                            placeholder="Search by Form name"
                            className="min-w-[100%] rounded-tl-xl rounded-tr-xl h-[3rem] outline-0 px-[4rem] text-bold placeholder:text-gray-300 text-gray-500"
                            style={{ background: '#F6F6F6' }}
                        />
                    </div>
                    <div
                        className="mt-[1rem] flex-grow m-[2px] rounded-bl-xl rounded-br-xl "
                        style={{ background: '#F6F6F6' }}
                    >
                        <FormList deleteForm={deleteForm} forms={forms} />
                    </div>
                </div>
            </div>
        </div>
    );
}
