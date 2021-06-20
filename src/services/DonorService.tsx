import axios from "axios";

const urlPrefix = "https://192.168.1.184/openmrs/ws/rest/v1/bloodbank/";

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

  getQuestionnnaireById(id: any) {
    return axios.get(urlPrefix + "questionnaire/" + id);
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
