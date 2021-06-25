import axios from "axios";

const urlPrefix = process.env.REACT_APP_API_URL+"/openmrs/ws/rest/v1/bloodbank/";

class DonorService {
  //patients
  getAllActivePatients(){
    return axios.get(urlPrefix + "patients");
  }
  //DonorForm
  saveDonorInfo(data: Object) {
    return axios.post(urlPrefix + "donor/add", data);
  }

  getAllBloodDonor() {
    return axios.get(urlPrefix + "donor/list");
  }

  getBloodDonorById(id: any) {
    return axios.get(urlPrefix + "donor/" + id);
  }

  deleteBloodDonor(id: any) {
    return axios.put(urlPrefix + "donor/delete/" + id);
  }
  //Questionnaire
  saveQuestionnaire(data: Object) {
    return axios.post(urlPrefix + "questionnaire/add", data);
  }

  getAllQuestionnaire() {
    return axios.get(urlPrefix + "questionnaire/list");
  }

  getQuestionnaireById(id: any) {
    return axios.get(urlPrefix + "questionnaire/" + id);
  }

  deleteQuestionnaire(id: any) {
    return axios.put(urlPrefix + "questionnaire/delete/" + id);
  }

  //Physical Suitability
  savePhysicalSuitability(data: Object) {
    return axios.post(urlPrefix + "bloodDonorPhysicalSuitability/add", data);
  }
  getPhysicalSuitabilityResults() {
    return axios.get(urlPrefix + "bloodDonorPhysicalSuitability/list");
  }
  getPhysicalTestInfoById(id: any) {
    return axios.get(urlPrefix + "bloodDonorPhysicalSuitability/" + id);
  }
  deletePhysicalTest(id: any) {
    return axios.put(urlPrefix + "bloodDonorPhysicalSuitability/delete/" + id);
  }
}

export default new DonorService();
