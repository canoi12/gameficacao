import axios from 'axios';
// const site = "http://localhost:3333";
const site = "https://teste-gameficacao.herokuapp.com/";

const api = axios.create({
  baseURL: site
});

export default api;