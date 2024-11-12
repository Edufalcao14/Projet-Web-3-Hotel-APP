import axios from "axios";
import {roomsUrl} from "./routes";

const getAll = () => axios.get(roomsUrl).then(response => response.data);

const getStats = (date) => {
  const url = date === new Date().toISOString().split("T")[0]
      ? `${roomsUrl}/stats`
      : `${roomsUrl}/stats/${date}`;
  return axios.get(url).then(response => response.data);
};

const RoomsAPI = {
  getAll,
  getStats,
};

export default RoomsAPI;
