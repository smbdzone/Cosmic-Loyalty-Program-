import axios from "axios";

// https://api-loyalty.smbdigitalzone.com/api
export const API = axios.create({
  baseURL: "https://api-loyalty.smbdigitalzone.com/api",
});
