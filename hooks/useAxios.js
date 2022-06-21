import axios from "axios";

export default axios.create({
  baseURL: 'https://drcareunion.com/admin',
  timeout: 10000
});
