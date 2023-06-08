import React from 'react';

function PieChart() {
    return (
        <div className="item">
            <div style={{ textAlign: 'start' }}>
                <i className="fa-solid fa-chart-simple"></i> Moduli Grafico a Torta
            </div>
            <div style={{ height: '50vh' }} id="chart-container"></div>
        </div>
    );
}

export default PieChart;
