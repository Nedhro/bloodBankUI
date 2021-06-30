import React from "react";
import { Button, Modal } from "react-bootstrap";
import BloodStockService from "../../services/BloodStockService";
import "../../static/scss/print.scss";
import { history } from "../custom/history";
import FormBanner from "../../static/images/hospitalBanner.png";

export interface TableModalProps {
  data: Object;
  title: any;
  translate: (key: string) => string;
}

class CompatiabilityTestModal extends React.Component<TableModalProps, any> {
  tableData: any = [];
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      modalData: {},
      notification: "",
      disallowApprove: false,
      message: "",
      bloodBagGroup: "",
      currentDateTime: Date().toLocaleString(),
    };
  }

  componentDidMount() {
    const bloodBagId = this.state.modalData.bloodBagId;
    BloodStockService.getStockByBloodBagId(bloodBagId).then((res) => {
      this.setState({
        bloodBagGroup: res.data.bloodGroup,
      });
    });
    if (
      this.state.modalData.bloodGrouping === "NonCompatible" ||
      this.state.modalData.bloodCrossMatching === "NonCompatible" ||
      this.state.modalData.bloodHivTest === "Reactive" ||
      this.state.modalData.bloodHbvTest === "Reactive" ||
      this.state.modalData.bloodHcvTest === "Reactive" ||
      this.state.modalData.bloodSyphilisTest === "Reactive" ||
      this.state.modalData.bloodMalariaTest === "Reactive"
    ) {
      this.setState({
        disallowApprove: true,
        message: "This blood bag is incompatible for the patient",
      });
    } else {
      this.setState({
        disallowApprove: false,
        message: "This blood bag is compatible for the patient",
      });
    }
  }

  printDiv() {
    window.print();
  }

  static getDerivedStateFromProps(props: any, state: any) {
    state.title = props.title;
    state.modalData = props.data;
    console.log(state);
    return state;
  }

  formatDate(data: any) {
    console.log(data);
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

  render() {
    const { title, modalData, notification, disallowApprove, message } =
      this.state;
    const { translate } = this.props;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {translate("bloodCompatibilityId")} : {title}
          </Modal.Title>
        </Modal.Header>
        <div
          id="printSection"
          className="print-container"
          style={{ margin: "0", padding: "0" }}
        >
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
            <div className="text-left ml-1 pl-1">
              {" "}
              <h4 className="font-weight-bold text-center">
                {translate("compatibilityTest")} ({translate("id")} :
                {modalData.bloodCompatibilityId})
              </h4>
              <p className="pr-1">
                <span className="font-weight-bold">{translate("date")}</span> :{" "}
                {this.formatDate(this.state.currentDateTime)}
              </p>
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">
                    {translate("bloodBagId")}<span className="font-weight-normal">{" "}:{" "}{modalData.bloodBagId}</span>
                  </p>
                  <p className="font-weight-bold">{translate("patient")} <span className="font-weight-normal">{" "}:{" "} {modalData.patient}</span> </p>
                  
                </div>
                <div className="col-6">
                  <p className="font-weight-bold">
                    {translate("bloodBagGroup")} <span className="font-weight-normal">{" "}:{" "}
                      {this.state.bloodBagGroup}</span>
                  </p>
                  <p className="font-weight-bold" style={{ marginLeft: "50px" }}>
                    {translate("patientBloodGroup")}
                    <span className="font-weight-normal">{" "}:{" "}{modalData.patientBloodGroup}</span>
                  </p>
                </div>
              </div>
              {/* <p>
                <span className="font-weight-bold">
                  {translate("bloodBagId")}
                </span>{" "}
                : {modalData.bloodBagId} &nbsp; &nbsp;{" "}
                <span className="font-weight-bold">
                  {translate("bloodBagGroup")} 
                </span>:{" "}
                {this.state.bloodBagGroup}
              </p>
              <p>
                <span className="font-weight-bold">{translate("patient")}</span>{" "}
                : {modalData.patient}  &nbsp;{" "}
                <span className="font-weight-bold" style={{marginLeft:"50px"}}>
                  {translate("patientBloodGroup")} 
                </span>:{" "}
                <span>{modalData.patientBloodGroup}</span>
              </p> */}
              <p>
                <span className="font-weight-bold">
                  {translate("crossMatching")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.bloodCrossMatching === "NonCompatible"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {modalData.bloodCrossMatching}
                </span>
              </p>
              <p>
                <span className="font-weight-bolder text-info">
                  {translate("bloodScreening")}
                </span>{" "}
              </p>
              <p>
                <span className="font-weight-bold">
                  {translate("bloodHivTest")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.bloodHivTest === "Reactive"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {modalData.bloodHivTest}
                </span>
              </p>
              <p>
                <span className="font-weight-bold">
                  {translate("bloodHbvTest")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.bloodHbvTest === "Reactive"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {modalData.bloodHbvTest}
                </span>
              </p>
              <p>
                <span className="font-weight-bold">
                  {translate("bloodHcvTest")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.bloodHcvTest === "Reactive"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {modalData.bloodHcvTest}
                </span>
              </p>
              <p>
                <span className="font-weight-bold">
                  {translate("bloodSyphilisTest")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.bloodSyphilisTest === "Reactive"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {modalData.bloodSyphilisTest}
                </span>
              </p>
              <p>
                <span className="font-weight-bold">
                  {translate("bloodMalariaTest")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.bloodMalariaTest === "Reactive"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {modalData.bloodMalariaTest}
                </span>
              </p>
              <p>
                <span className="font-weight-bold">
                  {translate("compatibilityTestDecision")}
                </span>{" "}
                :{" "}
                <span
                  className={disallowApprove ? "text-danger" : "text-success"}
                >
                  {message}
                </span>
              </p>
              <div className="row signature" id="signature">
                <div className="col-4 mt-5 pt-5"></div>
                <div className="col-4 mt-5 pt-5 p-1">
                  <p>
                    ........................................................
                  </p>
                  <p className="text-dark" style={{ width: "200px" }}>
                    {translate("MOSignature")}
                  </p>
                </div>
                <div className="col-4 mt-5 pt-5 pl-1" style={{marginLeft:"-10px"}}>
                  <p>.........................................................</p>
                  <p className="text-dark" style={{ width: "200px" }}>
                    {translate("MTSignature")}
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <Button variant="success" onClick={this.printDiv}>
              {translate("commonPrint")}
            </Button>
            <Button
              variant="info"
              onClick={() => {
                const bloodBagID= modalData.bloodBagId;
                sessionStorage.setItem("bloodBagID",bloodBagID);
                history.push(`/blood/stock/add`);
                window.location.reload();
              }}
            >
              {translate("stockBlood")}
            </Button>
          </Modal.Footer>

          <div className="text-danger">
            <p className="text-center bg-info font-weight-bold">
              {notification}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CompatiabilityTestModal;
