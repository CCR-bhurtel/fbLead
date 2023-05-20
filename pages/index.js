import React, { useContext, useEffect, useState } from 'react';
import Logo from '../public/logo.png';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

function Login() {
    const [data, setData] = useState({ email: '', password: '' });
    const { dispatch, state } = useContext(AuthContext);
    const router = useRouter();

    const loadUser = (token) => {
        axios
            .get('/api/user', { headers: { 'x-auth-token': token } })
            .then((res) => {
                dispatch({ type: 'USER_LOADED', payload: { token } });
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: 'AUTHENTICATION_ERROR' });
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadUser(token);
        }
    }, []);

    useEffect(() => {
        if (state.isLoggedIn) {
            router.push('/dashboard');
        }
    }, [state.isLoggedIn]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.email || !data.password) {
            toast.error('Please enter all data');
        }
        axios
            .post('/api/user/login', { ...data })
            .then((res) => {
                const resData = res.data;
                localStorage.setItem('token', resData.token);
                toast.success('Logged in successfully');
                dispatch('LOGGED_IN', { token: resData.token });
                router.push('/history');
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response?.data.message || 'Error signing up');
                dispatch('AUTHENTICATION_ERROR');
            });
    };
    return (
        <div className="container min-w-screen min-h-screen flex items-center justify-center">
            <Toaster />
            <div className="login-wrapper shadow-lg rounded-md p-2 flex-col flex items-center justify-items-start min-w-[500px] max-w-[700px]">
                <img src={Logo.src} alt="infologo" className="w-[120px]" />

                <form onSubmit={handleSubmit} className="formContainer flex flex-col items-center">
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        placeholder="Email"
                        required
                        className="outline-0 border-[0.5px] mt-4 border-gray-400 focus:border rounded-md focus:border-blue-300 w-[20rem] p-[10px]"
                    />

                    <input
                        type="password"
                        onChange={handleChange}
                        value={data.password}
                        name="password"
                        placeholder="Password"
                        required
                        className="outline-0 border-[0.5px] mt-4 border-gray-400 rounded-md focus:border rounde-md focus:border-blue-300 w-[20rem] p-[10px]"
                    />

                    <button className="bg-blue-600 mt-4 text-white w-[5rem] p-3 rounded-md hover:bg-transparent hover:border-[1px] hover:border-blue-600 hover:text-blue-600">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
