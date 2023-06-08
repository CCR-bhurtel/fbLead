import React from 'react';

function BarGraph() {
    return (
        <div className="item">
            <div style={{ textAlign: 'start' }}>
                <i className="fa-solid fa-chart-simple"></i> Moduli Grafico Lineare
            </div>
            <canvas id="chart"></canvas>
        </div>
    );
}

export default BarGraph;
