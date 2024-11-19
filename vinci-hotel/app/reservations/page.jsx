"use client";

import React, {useEffect, useState} from "react";
import BarChart from "../../components/barChart";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {MdInsertChart} from "react-icons/md";
import ReservationsAPI from "../../services/api/reservations";
import DonutChart from "../../components/donutChart";
import {BsCalendar2CheckFill} from "react-icons/bs";
import PieChart from "../../components/Piechart";

export default function ReservationsPage() {

    const [rowData, setRowData] = useState([]);

    const handleCheckInChange = async (reservation, newValue) => {
        try {
            await ReservationsAPI.checkIn(reservation.reservation_id);
            console.log("Checked in:", reservation.reservation_id);

            setRowData((prevData) => {
                return prevData.map((item) =>
                    item.reservation_id === reservation.reservation_id
                        ? {...item, checked_in: newValue}
                        : item
                );
            });
        } catch (error) {
            console.error("Error during check-in API call:", error);
        }
    };

    const handleCheckOutChange = async (reservation, newValue) => {
        try {
            await ReservationsAPI.checkOut(reservation.reservation_id);
            console.log("Checked out:", reservation.reservation_id);

            setRowData((prevData) => {
                return prevData.map((item) =>
                    item.reservation_id === reservation.reservation_id
                        ? {...item, checked_out: newValue}
                        : item
                );
            });
        } catch (error) {
            console.error("Error during check-out API call:", error);
        }
    };

    const columnDefs = [
        {headerName: "ID", field: "reservation_id", sortable: true, filter: true, flex: 1.5},
        {headerName: "Nom", field: "client_last_name", sortable: true, filter: true, flex: 2},
        {headerName: "Prénom", field: "client_first_name", sortable: true, filter: true, flex: 2},
        {headerName: "Chambre", field: "room_name", sortable: true, filter: true, flex: 1.5},
        {headerName: "Arrivée", field: "arrival_date", sortable: true, filter: true, flex: 2},
        {headerName: "Départ", field: "departure_date", sortable: true, filter: true, flex: 2},
        {
            headerName: "In",
            field: "checked_in",
            flex: 1,
            sortable: true,
            filter: true,
            editable: true,
            valueGetter: (params) => params.data.checked_in,
            valueSetter: (params) => {
                const newValue = params.newValue;
                if (newValue !== params.data.checked_in) {
                    params.data.checked_in = newValue;
                    handleCheckInChange(params.data, newValue);
                    return true;
                }
                return false;
            },
            cellRenderer: 'agCheckboxCellRenderer',
            cellEditor: 'agCheckboxCellEditor',
        },
        {
            headerName: "Out",
            field: "checked_out",
            flex: 1,
            sortable: true,
            filter: true,
            editable: true,
            valueGetter: (params) => params.data.checked_out,
            valueSetter: (params) => {
                const newValue = params.newValue;
                if (newValue !== params.data.checked_out) {
                    params.data.checked_out = newValue;
                    handleCheckOutChange(params.data, newValue);
                    return true;
                }
                return false;
            },
            cellRenderer: 'agCheckboxCellRenderer',
            cellEditor: 'agCheckboxCellEditor',
        },
        {headerName: "Prix", field: "total_price", sortable: true, filter: true, flex: 1},
        {headerName: "Payé", field: "is_paid", sortable: true, filter: true, flex: 1},
    ];


    const colors = ["#044879", "#f7b200", "#2ebbce", "#025864", "#cb584e"];

    const [barChartData, setBarChartData] = useState([]);
    const [donutChartData, setDonutChartData] = useState({});
    const [pieChartData, setPieChartData] = useState([]);
    const [totalReservations, setTotalReservations] = useState(0);
    const [clients, setClients] = useState([]);

    const [selectedRange, setSelectedRange] = useState("7jours");
    const [nbrDays, setNbrDays] = useState(7);

    const transformBarChartData = (data) => {
        const uniqueDates = [...new Set(data.map(entry => entry.date))];

        return uniqueDates.map(date => {
            const entriesForDate = data.filter(entry => entry.date === date);

            const row = {date: new Date(date).toLocaleDateString()};
            entriesForDate.forEach(entry => {
                row[entry.partner_name] = parseInt(entry.count, 10);
            });

            const allPartners = ["Booking", "Expedia", "Hotel Beds", "Vinci Hotel", "AirBnb"];
            allPartners.forEach(partner => {
                if (!row[partner]) row[partner] = 0;
            });

            return row;
        });
    };

    useEffect(() => {
            const fetchData = async () => {
                const reservations = await ReservationsAPI.getAll();
                const stats = await ReservationsAPI.getStats();
                const partnersStats = await ReservationsAPI.getPartnersStats(nbrDays);

                const reservationsData = reservations.map((reservation) => ({
                    reservation_id: reservation.reservation_id,
                    client_last_name: reservation.client_last_name,
                    client_first_name: reservation.client_first_name,
                    room_name: reservation.room_name,
                    arrival_date: reservation.arrival_date.split("T")[0],
                    departure_date: reservation.departure_date.split("T")[0],
                    checked_in: Boolean(reservation.checked_in),
                    checked_out: Boolean(reservation.checked_out),
                    total_price: reservation.total_price + " €",
                    is_paid: reservation.is_paid,
                }));

                const clients = reservations.map((reservation) => ({
                    room_name: reservation.room_name,
                    client_last_name: reservation.client_last_name,
                    client_first_name: reservation.client_first_name,
                    client_email: reservation.client_email,
                    client_phone_number: reservation.client_phone_number,
                }));


                const donutData = [];
                if (stats.awaiting > 0) {
                    donutData.push({asset: "En attente", amount: parseInt(stats.awaiting)});
                }
                if (stats.in_home > 0) {
                    donutData.push({asset: "Séjour en cours", amount: parseInt(stats.in_home)});
                }
                if (stats.checked_out > 0) {
                    donutData.push({asset: "Séjour terminé", amount: parseInt(stats.checked_out)});
                }


                const pieData = partnersStats.stats.map((stat) => ({
                    asset: stat.partner_name,
                    amount: parseInt(stat.total, 10),
                }));

                const barChartData = transformBarChartData(partnersStats.count);

                const totalReservations = stats.total;

                setRowData(reservationsData);
                setDonutChartData(donutData);
                setPieChartData(pieData);
                setBarChartData(barChartData);
                setTotalReservations(totalReservations);
                setClients(clients);
            }

            fetchData();
        }, [nbrDays]
    );

    const filterData = (range) => {
        switch (range) {
            case "+7jours":
                setSelectedRange(range);
                setNbrDays(7);
                break;
            case "+14jours":
                setSelectedRange(range);
                setNbrDays(14);
                break;
            case "-7jours":
                setSelectedRange(range);
                setNbrDays(-7);
                break;
            case "-14jours":
                setSelectedRange(range);
                setNbrDays(-14);
                break;
            default:
                setSelectedRange("7jours");
                setNbrDays(7);
                break;
        }
    };

    const getTitle = (nbrDays) => {
        if (nbrDays > 0) {
            return `Réservations des ${nbrDays} prochains jours`;
        }
        if (nbrDays < 0) {
            return `Réservations des ${nbrDays * -1} derniers jours`;
        }
        return '';
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-grow p-4 md:p-8 bg-gray-100 overflow-y-auto">
                <div className="">
                    <h1 className="text-3xl text-left mb-8 text-[#5A5555]">
                        Tableau de Bord - Réservations{" "}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 ">
                    <div
                        className="bg-white p-6 shadow-lg rounded-lg bg-lighBackground-image bg-no-repeat bg-cover ">
                        <h2 className="text-xl text-white font-sans font-medium mb-4">
                            Réservations
                        </h2>
                        <DonutChart data={donutChartData} title={`Total : ${totalReservations}`} colors={colors}
                                    textColor={"#ffffff"}/>
                    </div>

                    <div
                        className="col-span-1 lg:col-span-2 bg-white p-6 shadow-lg rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-wrap">
                                <MdInsertChart size={45} color="#025864"/>
                                <h2 className="text-2xl mt-1 ml-3 font-medium text-[#5A5555]">
                                    Prévisions des Réservations
                                </h2>
                            </div>
                            <select
                                value={selectedRange}
                                onChange={(e) => filterData(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="+7jours">7 prochains jours</option>
                                <option value="+14jours">14 prochains jours</option>
                                <option value="-7jours">7 derniers jours</option>
                                <option value="-14jours">14 derniers jours</option>
                            </select>
                        </div>
                        <BarChart
                            data={barChartData}
                            title=""
                            xKey="date"
                            yKey={[
                                "Booking",
                                "Expedia",
                                "Hotel Beds",
                                "Vinci Hotel",
                                "AirBnb",
                            ]}
                            colors={colors}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 ">
                    <div
                        className="col-span-1 lg:col-span-2 bg-white p-6 shadow-lg rounded-lg">
                        <h2 className="text-xl font-medium mb-4 text-[#5A5555]">
                            Liste des Réservations
                        </h2>
                        <div
                            className="ag-theme-alpine"
                            style={{height: 520, width: "100%"}}
                        >
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
                                pagination={true}
                                paginationPageSize={10}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Left: Pie Chart */}
                        <div className="bg-white p-6 shadow-lg rounded-lg"
                             style={{display: 'flex', flexDirection: 'column'}}>
                            <div className="flex flex-wrap items-center mb-4">
                                <BsCalendar2CheckFill size={30} color="#025864"/>
                                <h2 className="text-2xl ml-3 font-medium text-[#5A5555]">
                                    Répartition par partenaire
                                </h2>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
                                <PieChart
                                    data={pieChartData}
                                    title={getTitle(nbrDays)}
                                    colors={colors}
                                    width={600}
                                    height={400}
                                    titleColor={"#025864"}
                                />
                            </div>
                        </div>

                        {/* Right: Client Grid */}
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h2 className="text-xl font-medium mb-4 text-[#5A5555]">
                                Liste des clients
                            </h2>
                            <div
                                className="ag-theme-alpine"
                                style={{height: 520, width: "100%"}}
                            >
                                <AgGridReact
                                    rowData={clients}
                                    columnDefs={[
                                        {
                                            headerName: "Chambre",
                                            field: "room_name",
                                            sortable: true,
                                            filter: true,
                                            flex: 1
                                        },
                                        {
                                            headerName: "Nom",
                                            field: "client_last_name",
                                            sortable: true,
                                            filter: true,
                                            flex: 1.5
                                        },
                                        {
                                            headerName: "Prénom",
                                            field: "client_first_name",
                                            sortable: true,
                                            filter: true,
                                            flex: 1.5
                                        },
                                        {
                                            headerName: "Email",
                                            field: "client_email",
                                            sortable: true,
                                            filter: true,
                                            flex: 2
                                        },
                                        {
                                            headerName: "Téléphone",
                                            field: "client_phone_number",
                                            sortable: true,
                                            filter: true,
                                            flex: 1.5,
                                        },
                                    ]}
                                    pagination={true}
                                    paginationPageSize={10}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
