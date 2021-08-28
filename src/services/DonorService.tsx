import axios from "axios";
import { handleResponse } from "../components/helper/handleResponse";

const urlPrefix = process.env.REACT_APP_API_URL + "/openmrs/ws/rest/v1/bloodbank/";

class DonorService {
  //patients
  getAllActivePatients() {
    return axios.get(urlPrefix + "patients").then((response) => handleResponse(response));;
  }
  //DonorForm
  saveDonorInfo(data: Object) {
    return axios.post(urlPrefix + "donor/add", data).then((response) => handleResponse(response));;
  }

  getAllBloodDonor() {
    return axios.get(urlPrefix + "donor/list").then((response) => handleResponse(response));;
  }

  getBloodDonorById(id: number) {
    return axios.get(urlPrefix + "donor/" + id).then((response) => handleResponse(response));;
  }

  deleteBloodDonor(id: number, user: any) {
    return axios.put(urlPrefix + "donor/delete/" + id + "/by/" + user).then((response) => handleResponse(response));;
  }
  //Questionnaire
  saveQuestionnaire(data: Object) {
    return axios.post(urlPrefix + "questionnaire/add", data).then((response) => handleResponse(response));;
  }

  getAllQuestionnaire() {
    return axios.get(urlPrefix + "questionnaire/list").then((response) => handleResponse(response));;
  }

  getQuestionnaireById(id: number) {
    return axios.get(urlPrefix + "questionnaire/" + id).then((response) => handleResponse(response));;
  }

  deleteQuestionnaire(id: number, user: any) {
    return axios.put(urlPrefix + "questionnaire/delete/" + id + "/by/" + user).then((response) => handleResponse(response));;
  }

  //Physical Suitability
  savePhysicalSuitability(data: Object) {
    return axios.post(urlPrefix + "bloodDonorPhysicalSuitability/add", data).then((response) => handleResponse(response));;
  }
  getPhysicalSuitabilityResults() {
    return axios.get(urlPrefix + "bloodDonorPhysicalSuitability/list").then((response) => handleResponse(response));;
  }
  getPhysicalTestInfoById(id: number) {
    return axios.get(urlPrefix + "bloodDonorPhysicalSuitability/" + id).then((response) => handleResponse(response));;
  }
  deletePhysicalTest(id: number, user: any) {
    return axios.put(urlPrefix + "bloodDonorPhysicalSuitability/delete/" + id + "/by/" + user).then((response) => handleResponse(response));;
  }
}

export default new DonorService();
