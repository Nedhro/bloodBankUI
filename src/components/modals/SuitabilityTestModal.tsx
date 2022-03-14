import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../static/scss/print.scss";
import { history } from "../helper/history";
import FormBanner from "../../static/images/hospitalBanner.png";
// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
// toast-configuration method, 
// it is compulsory method.
toast.configure();

export interface TableModalProps {
  data: Object;
  title: any;
  translate: (key: string) => string;
}

class SuitabilityTestModal extends React.Component<TableModalProps, any> {
  tableData: any = [];
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      modalData: {},
      currentDateTime: Date().toLocaleString(),
    };
  }

  componentDidMount() { }

  printDiv() {
    window.print();
  }

  static getDerivedStateFromProps(props: any, state: any) {
    state.title = props.title;
    state.modalData = props.data;
    return state;
  }
  formatDate(data: any) {
    if (data === -21600000 || data === null) {
      return null;
    }
    let date = new Date(data);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 101).toString().substring(1);
    let day = (date.getDate() + 100).toString().substring(1);
    let formattedDate = day + "-" + month + "-" + year;
    return formattedDate;
  }

  render() {
    const { title, modalData } = this.state;
    const { translate } = this.props;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {translate("testId")} : {title}
          </Modal.Title>
        </Modal.Header>
        <div
          id="printSection"
          className="print-container"
          style={{ margin: "0", padding: "0" }}
        >
          <div className="page-break" />
          <Modal.Body>
            <div className="formBanner">
              <img
                src={FormBanner}
                width="100%"
                height="200px"
                className="Form-Banner header"
                alt="Banner"
              />
            </div>
            <h4 className="text-center mb-3">
              <span className="font-weight-bold">
                {translate("physicalTestResult")} ({translate("id")}
              </span>
              : {title})
            </h4>
            <p><span className="font-weight-bold">{translate("date")}</span> :{" "}
              {this.formatDate(this.state.currentDateTime)} </p>
            <p>
              <span className="font-weight-bold">{translate("donorId")}</span> :{" "}
              {modalData.bloodDonor.donorId}
            </p>
            <p>
              <span className="font-weight-bold">{translate("donorName")}</span>{" "}
              : {modalData.bloodDonor.donorName}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("donorMobileNo")}
              </span>{" "}
              : {modalData.bloodDonor.donorMobileNo}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("hemoglobin")}
              </span>{" "}
              : {modalData.donorHemoglobin}
            </p>
            <p>
              <span className="font-weight-bold">{translate("weight")}</span> :{" "}
              {modalData.donorWeight}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodPressure")}
              </span>{" "}
              : {modalData.donorBloodPressure}
            </p>
            <p>
              <span className="font-weight-bold">{translate("pulse")}</span> :{" "}
              {modalData.donorPulseRate}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("temp")} (<sup>o</sup>
                {translate("cel")})
              </span>{" "}
              : {modalData.donorTemperature}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodGroup")}
              </span>{" "}
              : {modalData.donorBloodGroup}
            </p>
            <p>
              <span className="font-weight-bold">{translate("rh")}</span> :{" "}
              {modalData.donorBloodGroupRhesus}
            </p>
            {/* <p><span className="font-weight-bold">{translate("permission")}</span> : {modalData.donorSelection}</p> */}
            {/* <p>
              <span className="font-weight-bold">
                {translate("permission")}
              </span>{" "}
              :{" "}
              {modalData.donorSelection === "Selected" ? (
                <span className="text-success">{translate("selected")}</span>
              ) : (
                <span className="text-danger">{translate("rejected")}</span>
              )}
            </p> */}
            <div style={{ fontSize: "18px" }} className="d-flex justify-content-center text-center">
              <p style={{ border: "4px solid red", width: '300px', backgroundColor: '#fff3e6' }} className="font-weight-bold mt-3 p-4" >{translate("permission")}{" "}: {" "}  <span className="font-weight-normal" >
                {modalData.donorSelection === "Selected" ? (
                  <span className="text-success font-weight-bold">{translate("selected")}</span>
                ) : (
                  <span className="text-danger font-weight-bold">{translate("rejected")}</span>
                )}
              </span></p>
            </div>

            <div className="row signature d-flex justify-content-end" id="signature">
              <div className="col-4 mt-5 pt-5"></div>
              <div className="col-4 mt-5 pt-5 p-1" >
                <p>
                  ........................................................
                </p>
                <p className="text-dark" style={{ width: "200px" }}>
                  {translate("MOSignature")}
                </p>
              </div>
              <div className="col-4 mt-5 pt-5 pl-1" style={{ marginLeft: "-10px" }}>
                <p>.........................................................</p>
                <p className="text-dark" style={{ width: "220px" }}>
                  {translate("MTSignature")}
                </p>
              </div>
            </div>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <Button
              variant="info"
              
              onClick={() => {
                const donorPhysicalSuitabilityId = modalData?.donorPhysicalSuitabilityId;
                sessionStorage.setItem("donorPhysicalSuitabilityId", donorPhysicalSuitabilityId);
                history.push(`/donor/${donorPhysicalSuitabilityId}/consentForm`);

              }}
            >
              {modalData.donorSelection === "Selected" ? translate("donorConsentForm") : 'Donor Rejected Form'}
     
            </Button>
            <Button variant="success" onClick={this.printDiv}>
              {translate("commonPrint")}
            </Button>
            <Button
              variant="info"
              onClick={() => {
                if (modalData.donorSelection === "Selected") {
                  const donorId = modalData.bloodDonor.donorId;
                  const bloodGroup = modalData.donorBloodGroup;
                  const bloodGroupRhesus = modalData.donorBloodGroupRhesus;
                  sessionStorage.setItem("bloodDonorId", donorId);
                  sessionStorage.setItem("bloodGroup", bloodGroup);
                  sessionStorage.setItem("bloodGroupRhesus", bloodGroupRhesus);
                  history.push(`/blood/${donorId}/stock/add`);
                } else {
                  toast.warn("Donor is not fit for donating blood", { position: toast.POSITION.BOTTOM_RIGHT });
                }
              }}
            >
              {translate("collectBlood")}
            </Button>
          </Modal.Footer>
        </div>
      </div>
    );
  }
}

export default SuitabilityTestModal;
