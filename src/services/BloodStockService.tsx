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

  //CompatibilityTest
  saveCompatibilityTest(data: Object) {
    return axios.post(urlPrefix + "bloodCompatibilityTest/add", data);
  }
  getCompatibilityTestList() {
    return axios.get(urlPrefix + "bloodCompatibilityTest/list");
  }
  getCompatibilityTestById(id: any) {
    return axios.get(urlPrefix + "bloodCompatibilityTest/" + id);
  }
  deleteCompatibilityTest(id: any) {
    return axios.put(urlPrefix + "bloodCompatibilityTest/delete/" + id);
  }
  updateCompatibilityTestStatus(bloodBagId: any) {
    return axios.put(urlPrefix + "bloodStockTracing/updateStatus/" + bloodBagId);
  }
}

export default new BloodStockService();
