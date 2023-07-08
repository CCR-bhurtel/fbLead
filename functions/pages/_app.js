import { useContext, useEffect } from 'react';
import AuthContextProvider from '../context/AuthContext';
import '../styles/globals.css';
import '../styles/App.scss';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import Head from 'next/head';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';
function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        setAuthToken(token);
        console.log(axios.defaults.headers.common['x-auth-token']);
    }, []);
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);
    return (
        <AuthContextProvider>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </Head>
            <Component {...pageProps} />
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.2/echarts.min.js"></script>
            <script defer src="app.js"></script>
        </AuthContextProvider>
    );
}

export default MyApp;
