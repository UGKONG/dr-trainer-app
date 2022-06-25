import axios from "axios";

export default axios.create({
  baseURL: 'http://drcareunion.com/admin',
  timeout: 5000
});
