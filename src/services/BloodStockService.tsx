import axios from "axios";
const urlPrefix =
  process.env.REACT_APP_API_URL + "/openmrs/ws/rest/v1/bloodbank/";
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
  updateStockStatus(bloodBagId: any) {
    return axios.put(
      urlPrefix + "bloodStockTracing/updateStatus/" + bloodBagId
    );
  }

  getStockByBloodBagId(bloodBagId: any) {
    return axios.get(urlPrefix + "bloodStockTracing/bloodBag/" + bloodBagId);
  }
}

export default new BloodStockService();
