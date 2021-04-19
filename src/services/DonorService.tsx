import axios from "axios";

const urlPrefix = "https://192.168.0.184/openmrs/ws/rest/v1/bloodbank/";

class DonorService {
  //DonorForm
  saveDonorInfo(data: Object) {
    return axios.post(urlPrefix + "donorForm", data);
  }

  getAllBloodDonor() {
    return axios.get(urlPrefix + "donors");
  }
  //Questionnaire
  saveQuestionnaire(data: Object) {
    return axios.post(urlPrefix + "questionnaire/add", data);
  }

  getAllQuestionnaire() {
    return axios.get(urlPrefix + "questionnaire/list");
  }
  //Physical Suitability
  savePhysicalSuitability(data: Object) {
    return axios.post(urlPrefix + "bloodDonorPhysicalSuitability/add", data);
  }
  getPhysicalSuitabilityResults() {
    return axios.get(urlPrefix + "bloodDonorPhysicalSuitability/list");
  }
}

export default new DonorService();
