import React from 'react';
import loading from '../../public/loading.gif';

function Loading() {
    return (
        <div className="flex w-screen h-[100vh] items-center justify-center">
            <img src={loading.src} alt="loading gif" />
        </div>
    );
}

export default Loading;
