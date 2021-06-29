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
    let formattedDate = year + "-" + month + "-" + day;
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
                    <p className="font-weight-bold" >Blood Donor's Name: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorName}</span></p>
                    <p className="font-weight-bold" >Blood Donor's Gender: {" "}  <span className="font-weight-normal" >{item.bloodDonor.donorGender}</span></p>


                    <p className="font-weight-bold" >Blood Donor's Mobile No: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorMobileNo}</span></p>
                    <p className="font-weight-bold">Blood Donor's Guardian: {" "}  <span className="font-weight-normal" >{item.bloodDonor.donorGuardian}</span></p>
                    <p className="font-weight-bold">Present Address: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorPresentAddress}</span></p>
                    <p className="font-weight-bold">Permanent Address: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorPermanentAddress}</span></p>
                  </div>

                  <div className="col-6 text-left">
                    <p className="font-weight-bold" >Blood Donor's Age: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorAge}</span></p>
                    <p className="font-weight-bold" >Blood Donor's Martial Status: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorMaritalStatus}</span></p>
                    <p className="font-weight-bold" >Blood Donor's Profession: {" "}  <span className="font-weight-normal" >{item.bloodDonor.donorProfession}</span></p>
                    <p className="font-weight-bold" >Donor Last Donated date: {" "} <span className="font-weight-normal" >{this.formatDate(item.bloodDonor.donorLastDonatedDate)}</span></p>
                    <p className="font-weight-bold" >Donor Last Donated place: {" "} <span className="font-weight-normal" >{item.bloodDonor.donorLastDonatedPlace}</span></p>
                    <p ><span className="font-weight-bold">Type of Donor: {" "} </span><span className="font-weight-normal" >{item.bloodDonor.typeOfDonor}</span>&nbsp; &nbsp;<span className="font-weight-bold">Patient Id: {" "}  </span><span className="font-weight-normal" >{item.bloodDonor.patient}</span></p>
                  </div>
                  <div >
                    <div >

                    </div>



                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-6 text-left ">
                    <h3 className="text-info">Physical Suitability Test Result</h3>
                    <p className="font-weight-bold mt-3" >Donor Blood Group: {" "}  <span className="font-weight-normal" >{item.donorBloodGroup}</span></p>
                    <p className="font-weight-bold mt-3" >Donor Blood Pressure(high/low mmHg): {" "}  <span className="font-weight-normal" >{item.donorBloodPressure}</span></p>
                    <p className="font-weight-bold mt-3" >Donor Hemoglobin (g/dl): {" "}  <span className="font-weight-normal" >{item.donorHemoglobin}</span></p>
                    <p className="font-weight-bold mt-3" >Donor Pulse Rate (b/m): {" "}  <span className="font-weight-normal" >{item.donorPulseRate}</span></p>
                  </div>
                  <div className="col-6 text-left mt-4">
                    <p className="font-weight-bold mt-3" >Donor Rh: {" "}  <span className="font-weight-normal" >{item.donorBloodGroupRhesus}</span></p>
                    <p className="font-weight-bold mt-3" >Donor Weight (kg): {" "}  <span className="font-weight-normal" >{item.donorWeight}</span></p>
                    <p className="font-weight-bold mt-3" >Donor Temperature (oF): {" "}  <span className="font-weight-normal" >{item.donorTemperature}</span></p>
                    <p className="font-weight-bold mt-3" >Selection: {" "}  <span className="font-weight-normal" >{item.donorSelection}</span></p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6 text-left ">
                    <p className="pt-2 pb-2 mt-2 mb-2">
                      Date : {this.formatDate(this.state.currentDateTime)}
                    </p>
                  </div>
                  <div className="col-6 text-right ">
                    <p className="pt-2 pb-2 mt-2 mb-2">
                      Signature of the Doctor :
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
            <div className="consentNote">
              <p>{translate("donorConsentNote")}</p>
            </div>

            <div className="row mt-5">
              <div className=" col-6 float-left text-left">

                {formData.map((item: any, i: any) => (
                 <div>
                    <p className="font-weight-bold">Code: {" "}  <span className="font-weight-normal" key={i}>{item.bloodDonor.donorId}</span></p>
                    <p className="font-weight-bold">Name: {" "}  <span className="font-weight-normal" key={i}>{item.bloodDonor.donorName}</span></p>
                 </div>
                ))}
              </div>
              <div className="col-6 float-right text-right">
                <p className="pt-2 pb-2 mt-2 mb-2">
                  Signature of the Blood Donor :
                  ....................................
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
