/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import axios from 'axios';
import { useRouter } from 'next/router';
import formatDate from '../utils/formatDate';
import Loading from '../components/Layouts/Loading';
import { Toaster, toast } from 'react-hot-toast';
import getDateString from '../utils/getDateString';

function Hotel() {
    const [loadingInitialData, setLoadingInitialData] = useState(false);
    const [loadingHotels, setloadingHotels] = useState(false);
    const [initialConfigData, setInitialConfigData] = useState(null);

    const [config, setConfig] = useState(null);
    const [hotels, setHotels] = useState([]);

    const router = useRouter();

    const loadInitialConfig = async () => {
        try {
            setLoadingInitialData(true);

            const response = await axios.get('/api/data/initialhoteldata');

            response.data && setInitialConfigData((prevData) => response.data);
        } catch (err) {
            setLoadingInitialData(false);
            toast.error('Error loading initial props');
            console.log(err);
        }
    };

    const setConfigFromInitialAppState = () => {
        const { checkInDate, checkOutDate } = router.query;

        const config = {
            fascio: initialConfigData.fascio[0],
            distance: initialConfigData.distances[0],
            comune: initialConfigData.comunes[0],
            stelle: initialConfigData.stelles[2],
        };
        if (checkInDate && checkOutDate) {
            config.checkInDate = formatDate(checkInDate, 'checkin');
            config.checkOutDate = formatDate(checkOutDate, 'checkout');
        } else {
            config.checkInDate = initialConfigData.dateAfterTwoDays;
            config.checkOutDate = initialConfigData.dateAfterAWeek;
        }

        setConfig(config);
    };

    const loadHotels = async () => {
        try {
            setloadingHotels(true);

            const hotels = await axios.post(`/api/data/hotelData`, {
                ...config,
            });
            setHotels(hotels.data.hotels);
        } catch (err) {
            setHotels([]);
            toast.error('Error loading hotels');

            setloadingHotels(false);
        }
    };

    const handleConfigChange = (type, value) => {
        setConfig({ ...config, [type]: value });
    };

    useEffect(() => {
        loadInitialConfig();
    }, []);

    useEffect(() => {
        if (initialConfigData) {
            setLoadingInitialData(false);
            setConfigFromInitialAppState();
        }
    }, [initialConfigData]);

    useEffect(() => {
        if (config) {
            loadHotels().catch((err) => {});
            const checkInDateString = getDateString(config.checkInDate);
            const checkOutDateString = getDateString(config.checkOutDate);
            router.push({
                query: { checkInDate: checkInDateString, checkOutDate: checkOutDateString },
            });
        }
    }, [config]);

    useEffect(() => {
        if (hotels) {
            setloadingHotels(false);
        }
    }, [hotels]);

    return (
        <>
            <Toaster />
            <Header />
            {loadingInitialData || loadingHotels || !initialConfigData ? (
                <Loading />
            ) : (
                <>
                    <Banner
                        initialConfigData={initialConfigData}
                        config={config}
                        handleConfigChange={handleConfigChange}
                    />
                    <MainSection hotels={hotels} checkInDate={config.checkInDate} checkOutDate={config.checkOutDate} />
                    <Footer initialConfigData={initialConfigData} config={config} setConfig={setConfig} />
                </>
            )}
        </>
    );
}

export default Hotel;
