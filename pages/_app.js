import { useContext, useEffect } from 'react';
import AuthContextProvider from '../context/AuthContext';
import '../styles/globals.css';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        setAuthToken(token);
        console.log(axios.defaults.headers.common['x-auth-token']);
    }, []);
    return (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    );
}

export default MyApp;
