import axios from "axios";
import { handleResponse } from "../components/helper/handleResponse";
const urlPrefix =
  process.env.REACT_APP_API_URL + "/openmrs/ws/rest/v1/bloodbank/";
class BloodStockService {
  //Blood Stock
  saveBloodStock(data: Object) {
    return axios.post(urlPrefix + "bloodStockTracing/add", data).then((response) => handleResponse(response));
  }
  getBloodStockList() {
    return axios.get(urlPrefix + "bloodStockTracing/list").then((response) => handleResponse(response));
  }
  getBloodStockById(id: number) {
    return axios.get(urlPrefix + "bloodStockTracing/" + id).then((response) => handleResponse(response));
  }
  getNextBloodBagId(bloodsource: any) {
    return axios.get(urlPrefix + "bloodStockTracing/nextBloodBagId/" + bloodsource).then((response) => handleResponse(response));
  }
  deleteBloodStock(id: number, user: any) {
    return axios.put(urlPrefix + "bloodStockTracing/delete/" + id + "/by/" + user).then((response) => handleResponse(response));
  }

  //CompatibilityTest
  saveCompatibilityTest(data: Object) {
    return axios.post(urlPrefix + "bloodCompatibilityTest/add", data).then((response) => handleResponse(response));
  }
  getCompatibilityTestList() {
    return axios.get(urlPrefix + "bloodCompatibilityTest/list").then((response) => handleResponse(response));
  }
  getCompatibilityTestById(id: number) {
    return axios.get(urlPrefix + "bloodCompatibilityTest/" + id).then((response) => handleResponse(response));
  }
  deleteCompatibilityTest(id: number, user: any) {
    return axios.put(urlPrefix + "bloodCompatibilityTest/delete/" + id + "/by/" + user).then((response) => handleResponse(response));
  }
  updateStockStatus(bloodBagId: any) {
    return axios.put(
      urlPrefix + "bloodStockTracing/updateStatus/" + bloodBagId
    ).then((response) => handleResponse(response));
  }

  getStockByBloodBagId(bloodBagId: any) {
    return axios.get(urlPrefix + "bloodStockTracing/bloodBag/" + bloodBagId).then((response) => handleResponse(response));
  }
}

export default new BloodStockService();
