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
    const donorPhysicalSuitabilityId = sessionStorage.getItem("donorPhysicalSuitabilityId");
    if (donorPhysicalSuitabilityId) {
      this.getTestData(parseInt(donorPhysicalSuitabilityId));
      sessionStorage.removeItem("donorPhysicalSuitabilityId");
    }
  }

  formatDate(data: any) {
    if (data === -21600000) {
      return null;
    }
    let date = new Date(data);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 101).toString().substring(1);
    let day = (date.getDate() + 100).toString().substring(1);
    let formattedDate = day + "-" + month + "-" + year;
    return formattedDate;
  }
  getTestData(id: number) {
    DonorService.getPhysicalTestInfoById(id).then((res) => {
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
    return (
      <div className="container p-1">
        <div className="row float-right">
          <button className="btn btn-success" onClick={this.printDiv}>
            {translate("commonPrint")}
          </button>
        </div>
        <div
          className="container-fluid print-container "
          id="printSectionConsentForm"
        >
          <div className="formBanner">
            <img
              src={FormBanner}
              width="100%"
              height="250px"
              className="Form-Banner header"
              alt="Banner"
            />
          </div>
          <div className="formBody">
            <h3 className="text-dark py-3 font-weight-bold text-center">
              {translate("medicalAssessment")}
            </h3>
            {formData?.map((item: any, i: any) => (
              <div key={i}>
                <div className="row form-group">
                  <div className="col-6 text-left">
                    <p className="font-weight-bold" >{translate("donorName")}: {" "} <span className="font-weight-normal" >{item.bloodDonor?.donorName}</span></p>
                    <p className="font-weight-bold" >{translate("donorGender")}: {" "}  <span className="font-weight-normal" >{item.bloodDonor?.donorGender}</span></p>


                    <p className="font-weight-bold" >{translate("donorMobileNo")}: {" "} <span className="font-weight-normal" >{item.bloodDonor?.donorMobileNo}</span></p>
                    <p className="font-weight-bold">{translate("donorGuardian")}: {" "}  <span className="font-weight-normal" >{item.bloodDonor?.donorGuardian}</span></p>
                    <p className="font-weight-bold">{translate("donorPresentAddress")}: {" "} <span className="font-weight-normal" >{item.bloodDonor?.donorPresentAddress}</span></p>
                    <p className="font-weight-bold">{translate("donorPermanentAddress")}: {" "} <span className="font-weight-normal" >{item.bloodDonor?.donorPermanentAddress}</span></p>
                  </div>

                  <div className="col-6 text-left">
                    <p className="font-weight-bold" >{translate("donorAge")}: {" "} <span className="font-weight-normal" >{item.bloodDonor?.donorAge}</span></p>
                    <p className="font-weight-bold" >{translate("donorMaritalStatus")}: {" "} <span className="font-weight-normal" >{item.bloodDonor?.donorMaritalStatus}</span></p>
                    <p className="font-weight-bold" >{translate("donorProfession")}: {" "}  <span className="font-weight-normal" >{item.bloodDonor?.donorProfession}</span></p>
                    <p className="font-weight-bold" >{translate("donorLastDonatedDate")}: {" "} <span className="font-weight-normal" >{this.formatDate(item.bloodDonor?.donorLastDonatedDate)}</span></p>
                    <p className="font-weight-bold" >{translate("donorLastDonatedPlace")}: {" "} <span className="font-weight-normal" >{item.bloodDonor?.donorLastDonatedPlace}</span></p>
                    <p ><span className="font-weight-bold">{translate("typeOfDonor")}: {" "} </span><span className="font-weight-normal" >{item.bloodDonor?.typeOfDonor}</span>&nbsp; &nbsp;
                      {item?.bloodDonor?.patient && <><span className="font-weight-bold">{translate("patientIdNo")}: {" "}  </span>
                        <span className="font-weight-normal" >{item.bloodDonor?.patient}</span></>}</p>
                  </div>

                  {item.bloodDonor.concernSet.length > 0 && <div style={{ display: formData[0]?.donorSelection === 'Selected' ? '' : 'none' }}  className="container ml-5">
                    <div className="text-left">
                      <h4 className="mt-1 font-weight-bold text-dark">{translate("questionnaire")} </h4>
                    </div>
                    <div className="row">
                      {item?.bloodDonor?.concernSet.map((data: any, j: any) => (
                        <div className="col-4 form-inline" key={j}>
                          <li >{data?.concernName}{" "}<span className="font-weight-bold">({data?.concernStatus})</span></li>
                        </div>
                      ))}
                    </div>
                  </div>}
                </div>
                <div style={{ display: formData[0]?.donorSelection === 'Selected' ? '' : 'none' }} className="row">
                  <div className="col-6 text-left">
                    <h3 className="font-weight-bold text-dark py-3 ml-5">{translate("physicalTestResult")}</h3>
                    <p className="font-weight-bold mt-2" >{translate("bloodGroup")}: {" "}  <span className="font-weight-normal" >{item?.donorBloodGroup}</span></p>
                    <p className="font-weight-bold mt-2" >{translate("bloodPressure")}: {" "}  <span className="font-weight-normal" >{item?.donorBloodPressure}</span></p>
                    <p className="font-weight-bold mt-2" >{translate("hemoglobin")}: {" "}  <span className="font-weight-normal" >{item?.donorHemoglobin}</span></p>
                    <p className="font-weight-bold mt-2" >{translate("pulse")}: {" "}  <span className="font-weight-normal" >{item?.donorPulseRate}</span></p>
                  </div>
                  <div className="col-6 text-left">
                    <br />
                    <p style={{ paddingTop: '60px' }} className="font-weight-bold " >{translate("rh")}: {" "}  <span className="font-weight-normal" >{item?.donorBloodGroupRhesus}</span></p>
                    <p className="font-weight-bold mt-2" >{translate("weight")}: {" "}  <span className="font-weight-normal" >{item?.donorWeight}</span></p>
                    <p className="font-weight-bold mt-2" >{translate("temp")} (<sup>o</sup>{translate("cel")}): {" "}  <span className="font-weight-normal" >{item?.donorTemperature}</span></p>
                  </div>
                </div>
                <div style={{ fontSize: "20px" }} className="d-flex justify-content-center mt-2">
                  <p style={{ border: "4px solid red", width: '300px', backgroundColor: '#fff3e6' }} className="font-weight-bold mt-2 p-4" ><span className="font-weight-normal" >
                    {item.donorSelection === "Selected" ?
                      <span className="text-success font-weight-bold">{translate("selected")}</span> : <span className="text-danger font-weight-bold">{translate("rejected")}</span> }
                  </span></p>
                </div>
                <div>
                   {formData?.map((item: any, i: any) => (
              <div key={i}>
                       {item.bloodDonor.concernSet.length > 0 && <div style={{ display: formData[0]?.donorSelection === 'Rejected' ? '' : 'none' }} className="container ml-5">
                         <div className="text-left">
                           <h4 className="mt-1 font-weight-bold text-dark">Reason for rejection</h4>
                         </div>
                         <div className="text-left">
                           {item?.bloodDonor?.concernSet
                           .filter((item: any)=> item?.concernStatus === 'Yes')
                           .map((data: any, j: any) => (
                             <div className="" key={j}>
                             
                               <li >{data?.concernName}{" "}<span className="font-weight-bold">({data?.concernStatus})</span></li>
                               
                             </div>
                           ))}
                         </div>
                       </div>}
                 </div>
                 ))}
                </div>
                <div className="row mt-2">
                  <div className="col-6 text-left ">
                    <p className="pt-2 pb-2 mt-2 mb-2">
                      <span className="font-weight-bold">{translate("date")}</span> : {this.formatDate(this.state.currentDateTime)}
                    </p>
                  </div>
                  <div className="col-6 text-right ">
                    <p className="pt-2 pb-2 mt-2 mb-2 font-weight-bold">
                      {translate("signatureOfDoctor")} : {" "}
                      <span className="font-weight-normal">....................................</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: formData[0]?.donorSelection === 'Selected' ? '' : 'none' }}  className="formFooter ">
            <h2 className="text-center font-weight-bold">
              {translate("donorConsentForm")}
            </h2>
            <div className="consentNote text-justify">
              <p className="p-2">{translate("donorConsentNote")}</p>
            </div>
            <div className="row ">
              <div className=" col-6 float-left text-left">
                {formData.map((item: any, i: any) => (
                  <div>
                    <p className="font-weight-bold mt-2 pt-1">{translate("code")}: {" "}  <span className="font-weight-normal" key={i}>{item.bloodDonor?.donorId}</span></p>
                    <p className="font-weight-bold">{translate("name")}: {" "}  <span className="font-weight-normal" key={i}>{item.bloodDonor?.donorName}</span></p>
                  </div>
                ))}
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div className="text-left">
                  <p className="pt-2 pb-2 mt-2 mb-2 font-weight-bold">
                    {translate("signatureOfDonor")} :
                    {" "}
                    <span className="font-weight-normal">....................................</span>
                  </p>
                  <p className="pt-1 pb-2 mt-2 mb-2">
                    <span className="font-weight-bold">{translate("date")}</span> : {this.formatDate(this.state.currentDateTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DonorConsentForm;
