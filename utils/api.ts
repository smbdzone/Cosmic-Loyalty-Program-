import axios from "axios";

export const API = axios.create({ baseURL: "http://192.168.1.2:5000/api" });
