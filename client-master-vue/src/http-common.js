import axios from "axios";
 
export default axios.create({
  baseURL: "http://pms.pindad.co.id:4202/api",
  // baseURL: "http://localhost:4202/api",
  headers: {
    "Content-type": "application/json",
  }
});