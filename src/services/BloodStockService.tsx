import axios from "axios";

const urlPrefix = "https://192.168.1.184/openmrs/ws/rest/v1/bloodbank/";

class BloodStockService {
  //Blood Stock
  saveBloodStock(data: Object) {
    return axios.post(urlPrefix + "bloodStockTracing/add", data);
  }
  getBloodStockList() {
    return axios.get(urlPrefix + "bloodStockTracing/list");
  }
  getBloodStockById(id: any) {
    return axios.get(urlPrefix + "bloodStockTracing/" + id);
  }
  deleteBloodStock(id: any) {
    return axios.put(urlPrefix + "bloodStockTracing/delete/" + id);
  }
}

export default new BloodStockService();
