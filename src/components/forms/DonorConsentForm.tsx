import React, { Component } from "react";
import DonorService from "../../services/DonorService";
import FormBanner from "../../static/images/hospitalBanner.png";
import "../../static/scss/print.scss";

interface consentFormProps {
  translate: (key: string) => string;
}
class DonorConsentForm extends Component<consentFormProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      formData: [],
      currentDateTime: Date().toLocaleString()
    };
  }
  componentDidMount() {
    const donorId = sessionStorage.getItem("bloodDonorId");
    if (donorId) {
      this.getTestData(donorId);
    }
    console.log(this.state.formData);
  }
  formatDate(data: any) {
    let date = new Date(data);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 101).toString().substring(1);
    let day = (date.getDate() + 100).toString().substring(1);
    let formattedDate = day + "-" + month + "-" + year ;
    return formattedDate;
  }
  getTestData(id: any) {
    DonorService.getPhysicalTestInfoById(parseInt(id)).then((res) => {
      console.log(res);
      const testData = [];
      testData.push(res.data);
      this.setState({
        formData: testData,
      });
    });
  }

  printDiv() {
    window.print();
  }
  render() {
    const { translate } = this.props;
    const { formData } = this.state;
    console.log(formData);
    return (
      <div className="container p-1">
        <div className="row float-right">
          <button className="btn btn-success" onClick={this.printDiv}>
            {translate("commonPrint")}
          </button>
        </div>
        <div
          className="container-fluid print-container p-1"
          id="printSectionConsentForm"
        >
          <div className="formBanner">
            <img
              src={FormBanner}
              width="100%"
              height="220px"
              className="Form-Banner header"
              alt="Banner"
            />
          </div>
          <div className="formBody">
            <h3 className="text-info py-3 font-weight-bold text-center">
              {translate("medicalAssessment")}
            </h3>
            {formData.map((item: any, i: any) => (
              <div key={i}>
                <div className="row form-group">
                  <div className="col-6 text-left">
                    <p className="font-weight-bold" >{translate("donorName")}: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorName}</span></p>
                    <p className="font-weight-bold" >{translate("donorGender")}: {" "}  <span className="font-weight-normal" >{item.bloodDonor.donorGender}</span></p>


                    <p className="font-weight-bold" >{translate("donorMobileNo")}: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorMobileNo}</span></p>
                    <p className="font-weight-bold">{translate("donorGuardian")}: {" "}  <span className="font-weight-normal" >{item.bloodDonor.donorGuardian}</span></p>
                    <p className="font-weight-bold">{translate("donorPresentAddress")}: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorPresentAddress}</span></p>
                    <p className="font-weight-bold">{translate("donorPermanentAddress")}: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorPermanentAddress}</span></p>
                  </div>

                  <div className="col-6 text-left">
                    <p className="font-weight-bold" >{translate("donorAge")}: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorAge}</span></p>
                    <p className="font-weight-bold" >{translate("donorMaritalStatus")}: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorMaritalStatus}</span></p>
                    <p className="font-weight-bold" >{translate("donorProfession")}: {" "}  <span className="font-weight-normal" >{item.bloodDonor.donorProfession}</span></p>
                    <p className="font-weight-bold" >{translate("donorLastDonatedDate")}: {" "} <span className="font-weight-normal" >{this.formatDate(item.bloodDonor.donorLastDonatedDate)}</span></p>
                    <p className="font-weight-bold" >{translate("donorLastDonatedPlace")}: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorLastDonatedPlace}</span></p>
                    <p ><span className="font-weight-bold">{translate("typeOfDonor")}: {" "} </span><span className="font-weight-normal" >{item.bloodDonor.typeOfDonor}</span>&nbsp; &nbsp;<span className="font-weight-bold">{translate("patientIdNo")}: {" "}  </span><span className="font-weight-normal" >{item.bloodDonor.patient}</span></p>
                  </div>
                  <div >
                    <div >

                    </div>



                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-6 text-left ">
                    <h3 className="text-info">{translate("physicalTestResult")}</h3>
                    <p className="font-weight-bold mt-3" >{translate("bloodGroup")}: {" "}  <span className="font-weight-normal" >{item.donorBloodGroup}</span></p>
                    <p className="font-weight-bold mt-3" >{translate("bloodPressure")}: {" "}  <span className="font-weight-normal" >{item.donorBloodPressure}</span></p>
                    <p className="font-weight-bold mt-3" >{translate("hemoglobin")}: {" "}  <span className="font-weight-normal" >{item.donorHemoglobin}</span></p>
                    <p className="font-weight-bold mt-3" >{translate("pulse")}: {" "}  <span className="font-weight-normal" >{item.donorPulseRate}</span></p>
                  </div>
                  <div className="col-6 text-left ">
                    <br />
                    <p className="font-weight-bold mt-4 pt-1" >{translate("rh")}: {" "}  <span className="font-weight-normal" >{item.donorBloodGroupRhesus}</span></p>
                    <p className="font-weight-bold mt-3" >{translate("weight")}: {" "}  <span className="font-weight-normal" >{item.donorWeight}</span></p>
                    <p className="font-weight-bold mt-3" >{translate("temp")} (o{translate("cel")}): {" "}  <span className="font-weight-normal" >{item.donorTemperature}</span></p>
                    <p className="font-weight-bold mt-3" >{translate("selection")}: {" "}  <span className="font-weight-normal" >{item.donorSelection}</span></p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6 text-left ">
                    <p className="pt-2 pb-2 mt-2 mb-2">
                      {translate("date")} : {this.formatDate(this.state.currentDateTime)}
                    </p>
                  </div>
                  <div className="col-6 text-right ">
                    <p className="pt-2 pb-2 mt-2 mb-2">
                      {translate("signatureOfDoctor")} :
                      ....................................
                    </p>
                  </div>
                </div>
              </div>

            ))}
          </div>
          <div className="formFooter mt-2">
            <h2 className="text-center font-weight-bold">
              {translate("donorConsentForm")}
            </h2>
            <div className="consentNote text-justify">
              <p>{translate("donorConsentNote")}</p>
            </div>

            <div className="row mt-5">
              <div className=" col-6 float-left text-left">

                {formData.map((item: any, i: any) => (
                 <div>
                    <p className="font-weight-bold mt-3 pt-1">{translate("code")}: {" "}  <span className="font-weight-normal" key={i}>{item.bloodDonor.donorId}</span></p>
                    <p className="font-weight-bold">{translate("name")}: {" "}  <span className="font-weight-normal" key={i}>{item.bloodDonor.donorName}</span></p>
                 </div>
                ))}
              </div>
              <div className="col-6 float-right text-right">
                <p className="pt-2 pb-2 mt-2 mb-2">
                  {translate("signatureOfDonor")} :
                  ....................................
                </p>
                <p className="pt-2 pb-2 mt-2 mb-2">
                  {translate("date")} : {this.formatDate(this.state.currentDateTime)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DonorConsentForm;
