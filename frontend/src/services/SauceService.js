import axios from "axios"

export default {
  async getSauces() {
    let res = await axios.get("http://localhost:8000/sauces");
    return res.data;
  },
  async getSauceSingle(_id) {
    let res = await axios.get("http://localhost:8000/sauces/" + _id);
    return res.data;
  }
}