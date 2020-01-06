import axios from "axios";
 
export default axios.create({
  // baseURL: "http://pms.pindad.co.id:4200/api",
  baseURL: "http://localhost:4200/api",
  headers: {
    "Content-type": "application/json",
  }
});