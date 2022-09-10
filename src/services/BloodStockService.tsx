import axios from "axios";
import { handleResponse } from "../components/helper/handleResponse";
const urlPrefix =
  process.env.REACT_APP_API_URL + "/openmrs/ws/rest/v1/bloodbank/";
class BloodStockService {
  //Blood Stock
  saveBloodStock(data: Object) {
    return axios.post(urlPrefix + "bloodStockTracing/add", data)
      .then((response) => handleResponse(response));
  }
  getBloodStockList() {
    return axios.get(urlPrefix + "bloodStockTracing/list")
      .then((response) => handleResponse(response));
  }
  getApprovedBloodList() {
    return axios.get(urlPrefix + "bloodStockTracing/approvedList")
      .then((response) => handleResponse(response));
  }
  getBloodStockById(id: number) {
    return axios.get(urlPrefix + "bloodStockTracing/" + id)
      .then((response) => handleResponse(response));
  }
  getNextBloodBagId(bloodsource: any) {
    return axios.get(urlPrefix + "bloodStockTracing/nextBloodBagId/" + bloodsource)
      .then((response) => handleResponse(response));
  }
  deleteBloodStock(id: number, user: any) {
    return axios.put(urlPrefix + "bloodStockTracing/delete/" + id + "/by/" + user)
      .then((response) => handleResponse(response));
  }

  //Report
  saveReport(data: Object) {
    return axios.post(urlPrefix + "bloodSerologyTest/add", data)
      .then((response) => handleResponse(response));
  }
  getReportById(id: number) {
    return axios.get(urlPrefix + "bloodSerologyTest/" + id)
      .then((response) => handleResponse(response));
  }
  getReportList() {
    return axios.get(urlPrefix + "bloodSerologyTest/list")
      .then((response) => handleResponse(response));
  }
  deleteReport(id: number, user: string) {
    return axios.put(urlPrefix + "bloodSerologyTest/delete/" + id + "/by/" + user)
      .then((response) => handleResponse(response));
  }

  //CompatibilityTest
  getPatientBloodGroupById(id: number) {
    return axios.get(urlPrefix + "bloodSerologyTestByPatientId/" + id)
      .then((response) => handleResponse(response));
  }
  saveCompatibilityTest(data: Object) {
    return axios.post(urlPrefix + "bloodCompatibilityTest/add", data)
      .then((response) => handleResponse(response));
  }
  getCompatibilityTestList() {
    return axios.get(urlPrefix + "bloodCompatibilityTest/list")
      .then((response) => handleResponse(response));
  }
  getCompatibilityTestById(id: number) {
    return axios.get(urlPrefix + "bloodCompatibilityTest/" + id)
      .then((response) => handleResponse(response));
  }
  deleteCompatibilityTest(id: number, user: string) {
    return axios.put(urlPrefix + "bloodCompatibilityTest/delete/" + id + "/by/" + user)
      .then((response) => handleResponse(response));
  }
  updateStockStatus(bloodBagId: string, user: string) {
    return axios.put(urlPrefix + "bloodStockTracing/updateStatus/" + bloodBagId + "/by/" + user)
      .then((response) => handleResponse(response));
  }
  getStockByBloodBagId(bloodBagId: string) {
    return axios.get(urlPrefix + "bloodStockTracing/bloodBag/" + bloodBagId)
      .then((response) => handleResponse(response));
  }
}

export default new BloodStockService();
