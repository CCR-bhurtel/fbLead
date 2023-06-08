import React, { useEffect, useState } from 'react';
import BarGraph from '../components/BarGraph';
import PieChart from '../components/PieChart';
import Table from '../components/Table';
import { Toaster, toast } from 'react-hot-toast';
import Loading from '../components/Loading';
import { DateRangePicker, createStaticRanges } from 'react-date-range';
import { oneWeekAgo } from '../server/utils/getDates';
import { it } from 'date-fns/locale';
import axios from 'axios';
import { format } from 'date-fns';
import {
    addDays,
    subDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
    startOfYear,
    endOfYear,
    addYears,
} from 'date-fns';

function Databoard() {
    const [loading, setLoading] = useState(true);
    const [chart, setChart] = useState(null);
    const [chart2, setChart2] = useState(null);

    const [pieChartData, setPieChartData] = useState([]);
    const [plotChartData, setPloatChartData] = useState({});

    const [tableData, setTableData] = useState([]);
    const [range, setRange] = useState({ startDate: oneWeekAgo(), endDate: new Date(), key: 'selection' });

    function onInit() {
        setChart(plotLineChart());
        setChart2(getPieChart());
    }

    function handleSelect(ranges) {
        setRange(ranges.selection);
    }

    function handleLoad() {
        setLoading(true);

        axios
            .get(`/api/data?startDate=${range.startDate}&endDate=${range.endDate}`)
            .then((res) => {
                const data = res.data;

                setPieChartData(data.pieChartAndTableData.pieChartData);
                setPloatChartData(data.barGraphData);
                setTableData(data.pieChartAndTableData.tableData);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                toast.error('Error loading data');
                console.log(err);
            });
    }

    useEffect(() => {
        handleLoad();
    }, []);

    useEffect(() => {
        console.log(loading);
    }, [loading]);

    useEffect(() => {
        onInit();
    }, [pieChartData, plotChartData, tableData]);

    function getPieChart() {
        let optionPie = {
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    return `${params.data.name}: ${params.data.value.toLocaleString('de-DE', {
                        style: 'decimal',
                        useGrouping: true,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })} $`;
                },
            },
            legend: {
                top: '5%',
                left: 'center',
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1,
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold',
                        },
                    },

                    labelLine: {
                        show: false,
                    },
                    data: pieChartData,
                },
            ],
        };
        if (pieChartData.length) {
            let chartCanvas = echarts.init(document.getElementById('chart-container'));
            chartCanvas.setOption(optionPie);
            return chartCanvas;
        }
    }

    function plotLineChart() {
        const data2 = {
            labels: plotChartData.labels,
            datasets: [
                {
                    label: 'deal won',
                    data: plotChartData.data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.4,
                },
            ],
        };

        const config = {
            type: 'line',
            data: data2,
            options: {
                scales: {
                    y: {
                        ticks: {
                            callback: function (value, index, ticks) {
                                return (
                                    value.toLocaleString('de-DE', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }) + ' $'
                                );
                            },
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label +=
                                    context.parsed.y.toLocaleString('de-DE', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }) + ' $';
                                return label;
                            },
                        },
                    },
                    legend: {
                        display: false,
                    },
                },
                maintainAspectRatio: false,
                aspectRatio: 0.8,
            },
        };
        if (plotChartData.data) {
            try {
                // ...

                // Destroy the existing chart

                return new Chart(document.getElementById('chart'), config);
            } catch (err) {}
        }
    }

    function getMaxValue(data) {
        let max = 0;

        // Iterate through the datasets and find the maximum value
        data.datasets.forEach((dataset) => {
            const datasetMax = Math.max(...dataset.data);
            if (datasetMax > max) {
                max = datasetMax;
            }
        });

        // Increase the maximum value by 5%
        return max + (max * 5) / 100;
    }

    const defineds = {
        startOfWeek: startOfWeek(new Date()),
        endOfWeek: endOfWeek(new Date()),
        startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
        endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
        startOfToday: startOfDay(new Date()),
        startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
        startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
        startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
        endOfToday: endOfDay(new Date()),
        startOfYesterday: startOfDay(addDays(new Date(), -1)),
        endOfYesterday: endOfDay(addDays(new Date(), -1)),
        startOfMonth: startOfMonth(new Date()),
        endOfMonth: endOfMonth(new Date()),
        startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
        endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
        startOfYear: startOfYear(new Date()),
        endOfYear: endOfYear(new Date()),
        startOflastYear: startOfYear(addYears(new Date(), -1)),
        endOflastYear: endOfYear(addYears(new Date(), -1)),
    };
    const sideBarOptions = () => {
        const customDateObjects = [
            {
                label: 'Oggi',
                range: () => ({
                    startDate: defineds.startOfToday,
                    endDate: defineds.endOfToday,
                }),
            },
            {
                label: 'Ieri',
                range: () => ({
                    startDate: defineds.startOfYesterday,
                    endDate: defineds.endOfYesterday,
                }),
            },

            {
                label: 'Questa settimana',
                range: () => ({
                    startDate: defineds.startOfWeek,
                    endDate: defineds.endOfWeek,
                }),
            },
            {
                label: 'La settimana scorsa',
                range: () => ({
                    startDate: defineds.startOfLastWeek,
                    endDate: defineds.endOfLastWeek,
                }),
            },
            {
                label: 'Questo mese',
                range: () => ({
                    startDate: defineds.startOfMonth,
                    endDate: defineds.endOfMonth,
                }),
            },
            {
                label: 'Lo scorso mese',
                range: () => ({
                    startDate: defineds.startOfLastMonth,
                    endDate: defineds.endOfLastMonth,
                }),
            },
            {
                label: "Quest'anno",
                range: () => ({
                    startDate: defineds.startOfYear,
                    endDate: defineds.endOfYear,
                }),
            },
            {
                label: "L'anno scorso",
                range: () => ({
                    startDate: defineds.startOflastYear,
                    endDate: defineds.endOflastYear,
                }),
            },
        ];

        return customDateObjects;
    };
    const sideBar = sideBarOptions();

    const staticRanges = [
        // ...defaultStaticRanges,
        ...createStaticRanges(sideBar),
    ];

    useEffect(() => {
        window.addEventListener('resize', function () {
            // Call the resize method on the chart object

            if (chart) chart.resize();

            if (chart2) chart2.resize();
        });
    }, [chart, chart2]);

    return (
        <>
            <Toaster />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div style={{ margin: '2rem' }}>
                        <div
                            style={{
                                display: 'flex',
                                minWidth: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <DateRangePicker
                                locale={it}
                                onChange={handleSelect}
                                ranges={[range]}
                                showPreview={false}
                                staticRanges={staticRanges}
                            
                                inputRanges={[]}
                                renderMonthText={(date) => format(date, 'MMMM yyyy', { locale: it })}
                            />
                            <button
                                style={{
                                    padding: '0.5rem',
                                    fontSize: '1.1rem',
                                    backgroundColor: 'blue',

                                    marginTop: '1rem',
                                    color: 'white',
                                    borderRadius: '10px',
                                }}
                                type="primary"
                                onClick={handleLoad}
                            >
                                Aggiorna Dati
                            </button>
                        </div>

                        <div className="section">
                            <PieChart />

                            <BarGraph />
                        </div>
                    </div>

                    <div style={{ margin: '60px', padding: '5px', backgroundColor: 'white', borderRadius: '5px' }}>
                        <Table data={tableData} />
                    </div>
                </>
            )}
        </>
    );
}

export default Databoard;
