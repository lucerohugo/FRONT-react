import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', //URL en el puerto 3000 en mi caso
});

export default instance;
