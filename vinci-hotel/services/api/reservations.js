import axios from 'axios';
import {reservationsUrl} from "./routes";

const getAll = () => axios.get(reservationsUrl).then(response => response.data);
const getStats = () => axios.get(`${reservationsUrl}/stats`).then(response => response.data);
const getPartnersStats = (nbrDays) =>
    axios.get(`${reservationsUrl}/partners/stats/${nbrDays}`)
        .then(response => response.data);
const checkIn = (id) => axios.post(`${reservationsUrl}/${id}/check-in`).then(response => response.data);
const checkOut = (id) => axios.post(`${reservationsUrl}/${id}/check-out`).then(response => response.data);


const ReservationsAPI = {
    getAll,
    getStats,
    getPartnersStats,
    checkIn,
    checkOut
}
export default ReservationsAPI;