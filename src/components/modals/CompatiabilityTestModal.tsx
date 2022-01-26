import React from "react";
import { Button, Modal } from "react-bootstrap";
import BloodStockService from "../../services/BloodStockService";
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

class CompatiabilityTestModal extends React.Component<TableModalProps, any> {
  tableData: any = [];
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      modalData: {},
      disallowApprove: false,
      message: "",
      bloodBagGroup: "",
      donorName: "",
      bloodComponent: "",
      typeOfDonor: "",
      currentDateTime: Date().toLocaleString(),
    };
  }

  componentDidMount() {
    const bloodBagId = this.state.modalData.bloodBagId;
    BloodStockService.getStockByBloodBagId(bloodBagId).then((res) => {
      this.setState({
        bloodBagGroup: res.data.bloodGroup,
        donorName: res?.data?.bloodDonor?.donorName,
        bloodComponent: res.data.bloodComponent,
        typeOfDonor: res?.data?.bloodDonor?.typeOfDonor,
      });
    });
    if (
      this.state.modalData.bloodGrouping === "Non-Compatible" ||
      this.state.modalData.bloodCrossMatching === "Non-Compatible" ||
      this.state.modalData.bloodHivTest === "Reactive" ||
      this.state.modalData.bloodHbvTest === "Reactive" ||
      this.state.modalData.bloodHcvTest === "Reactive" ||
      this.state.modalData.bloodSyphilisTest === "Reactive" ||
      this.state.modalData.bloodMalariaTest === "Reactive"
    ) {
      this.setState({
        disallowApprove: true,
        message: "This blood bag is non-compatible for the patient",
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
    return state;
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

  render() {
    const { title, modalData,
      // disallowApprove, message 
    } =
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
                {translate("crossMatchingReport")}
                {/* ({translate("id")} :
                {modalData.bloodCompatibilityId}) */}
              </h4>
              <div className="text-right">
                <p >
                  <span className="font-weight-bold">{translate("date")}</span> :{" "}
                  {this.formatDate(this.state.currentDateTime)}
                </p>
              </div>
              <div className="compatibility-table">
                <table >
                  <tr className="compatibility-first-tr" >
                    <td>Patient Lab No:</td>
                    <td>Cabin No:</td>
                    <td>Bed No:</td>
                    <td>Ward:</td>
                    <td>Unit:</td>
                  </tr>
                  <tr >
                    <td colSpan={1}> <span className="pl-2">Patient Blood Group:</span></td>
                    <td colSpan={1}> ABO: {modalData.patientBloodGroup}</td>
                    <td colSpan={3}> <span className="pl-2">Rh(D): {modalData.patientBloodGroupRhesus}</span></td>
                  </tr>
                  <tr >
                    <td colSpan={1}> <span className="pl-2">Donor Blood Group:</span></td>
                    <td colSpan={1}> ABO: {this.state.bloodBagGroup}</td>
                    <td colSpan={3}> <span className="pl-2">Rh(D):</span></td>
                  </tr>
                  <tr >
                    <td colSpan={3}> <span className="pl-2">Donor Name: {this.state.donorName}</span></td>

                    <td colSpan={2}> <span className="pl-2">Donor Bag No: {modalData.bloodBagId}</span></td>
                  </tr>
                </table>
              </div>
              <div className="row mx-2 mt-4">
                <div className="col-4 ">
                  <span>Result of Screening Test:</span>
                </div>
                <div className="col-8 compatibility-table-two">
                  <table>
                    <tr>
                      <td >HBsAg:</td>
                      <td><span
                        className={
                          modalData.bloodHbvTest === "Reactive"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {modalData.bloodHbvTest}
                      </span></td>
                    </tr>
                    <tr>
                      <td >HIV 1&2:</td>
                      <td>   <span
                        className={
                          modalData.bloodHivTest === "Reactive"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {modalData.bloodHivTest}
                      </span></td>
                    </tr>
                    <tr>
                      <td >HCV:</td>
                      <td>  <span
                        className={
                          modalData.bloodHcvTest === "Reactive"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {modalData.bloodHcvTest}
                      </span></td>
                    </tr>
                    <tr>
                      <td >SYPHILIS:</td>
                      <td>    <span
                        className={
                          modalData.bloodSyphilisTest === "Reactive"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {modalData.bloodSyphilisTest}
                      </span></td>
                    </tr>
                    <tr>
                      <td >MP:</td>
                      <td><span
                        className={
                          modalData.bloodMalariaTest === "Reactive"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {modalData.bloodMalariaTest}
                      </span></td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="row mx-2 mt-4">
                <div className="col-4 ">
                  <span>Result of Cross-Matching:</span>
                </div>
                <div className="col-8 compatibility-table-three">
                  <table>
                    <tr>
                      <td >At Room Temperature</td>
                      <td> <span
                        className={
                          modalData.atRoomTemp === "Non-Compatible"
                            ? "text-danger" : "text-success"

                        }
                      >
                        {modalData.atRoomTemp}
                      </span></td>
                    </tr>
                    <tr>
                      <td >At 37°C by ICT</td>
                      <td>  <span
                        className={
                          modalData.at37ByICT === "Compatible"
                            ? "text-success" : "text-danger"

                        }
                      >
                        {modalData.at37ByICT}
                      </span></td>
                    </tr>
                    <tr>
                      <td >By Indirect Coomb's Test</td>
                      <td>    <span
                        className={
                          modalData.coombsTest === "Compatible"
                            ? "text-success" : "text-danger"

                        }
                      >
                        {modalData.coombsTest}
                      </span></td>
                    </tr>

                  </table>
                </div>
              </div>
              <div className="row mx-2 mt-4">
                <div className="col-4 mt-2">
                  <span className="">Blood Component:</span>
                </div>
                <div className="col-8 compatibility-table-four">
                  <table>
                    <tr>
                      <td >{this.state.bloodComponent}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="row mx-2 mt-4">
                <div className="col-4 mt-2">
                  <span className="">Donation Type:</span>
                </div>
                <div className="col-8 compatibility-table-four">
                  <table>
                    <tr>
                      <td>{this.state.typeOfDonor}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="row mt-4 text-center">
                <div className="col-6">
                  <p>
                    ........................................................
                  </p>
                  <p className="text-dark" >
                    {translate("MTSignature")}
                  </p>
                </div>
                <div className="col-6">
                  <p>.........................................................</p>
                  <p className="text-dark" >
                    {translate("dutyDoctor")}

                  </p>
                </div>
              </div>
              <div className="text-center">
                <span><b>বিঃ দ্রঃ ১০ (দশ) দিনের মধ্যে রক্তের ব্যাগ ব্যবহার/গ্রহণ না করিলে অন্য রোগীকে বরাদ্দ করা হবে।</b></span>
              </div>
              {/* 
              <p>
                <span className="font-weight-bold">
                  {translate("crossMatching")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.bloodCrossMatching === "Non-Compatible"
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
                  {translate("atRoomTemp")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.atRoomTemp === "Non-Compatible"
                      ? "text-danger" : "text-success"

                  }
                >
                  {modalData.atRoomTemp}
                </span>
              </p>
              <p>
                <span className="font-weight-bold">
                  {translate("at37ByICT")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.at37ByICT === "Compatible"
                      ? "text-success" : "text-danger"

                  }
                >
                  {modalData.at37ByICT}
                </span>
              </p>
              <p>
                <span className="font-weight-bold">
                  {translate("coombsTest")}
                </span>{" "}
                :{" "}
                <span
                  className={
                    modalData.coombsTest === "Compatible"
                      ? "text-success" : "text-danger"

                  }
                >
                  {modalData.coombsTest}
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

              </div> */}
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
                const bloodBagID = modalData.bloodBagId;
                sessionStorage.setItem("bloodBagID", bloodBagID);
                history.push(`/blood/stock/add`);

              }}
            >
              {translate("stockBlood")}
            </Button>
          </Modal.Footer>
        </div>
      </div>
    );
  }
}

export default CompatiabilityTestModal;
