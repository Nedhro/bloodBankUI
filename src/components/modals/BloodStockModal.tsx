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

class BloodStockModal extends React.Component<TableModalProps, any> {
  tableData: any = [];
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      modalData: {},
      currentDateTime: Date().toLocaleString(),
    };
  }

  componentDidMount() {}

  printDiv() {
    window.print();
  }

  static getDerivedStateFromProps(props: any, state: any) {
    state.title = props.title;
    state.modalData = props.data;
    console.log(state);
    return state;
  }

  updateBloodStockStatus(bloodBagId: any) {
    BloodStockService.updateStockStatus(bloodBagId).then((res) => {
      if (res.status === 202) {
        this.setState({
          notification:
            "Blood bag has been approved for the patient and made unavailable from the stock",
        });
        history.push("/blood/stock/list");
        window.location.reload();
      }
      if (res.status === 226) {
        console.log(res);
        this.setState({
          notification: `Blood bag : ${res.data} is not availablle in the stock`,
        });
      }
    });
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
    const { title, modalData } = this.state;
    const { translate } = this.props;
    console.log(this.props.data);
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {translate("bloodStockId")} : {title}
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
            <h4 className="font-weight-bold text-center pb-4">
              {translate("collection")} ({translate("bagID")}: {modalData.bloodBagId})
            </h4>
            <p><span className="font-weight-bold">{translate("date")}</span> :{" "}
              {this.formatDate(this.state.currentDateTime)} </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodDonorId")}
              </span>{" "}
              : {modalData?.bloodDonorId || "N/A"}
            </p>
            <p>
              <span className="font-weight-bold">{translate("donorName")}</span>{" "}
              : {modalData?.donorName || "N/A"}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("donorMobileNo")}
              </span>{" "}
              : {modalData?.donorMobile || "N/A"}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodGroup")}
              </span>{" "}
              : {modalData.bloodGroup}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("sourceOfBlood")}
              </span>{" "}
              : {modalData.sourceOfBlood}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodBagId")}
              </span>{" "}
              : {modalData.bloodBagId}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("stockStatus")}
              </span>{" "}
              :{" "}
              <span
                className={
                  !modalData.stockStatus ? "text-danger" : "text-success"
                }
              >
                {modalData.stockStatus}
              </span>
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodStorage")}
              </span>{" "}
              :{" "}
              <span
                className={
                  !modalData.bloodStorage ? "text-danger" : "text-normal"
                }
              >
                {modalData.bloodStorage || "Not in Stock"}
              </span>
            </p>
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
            <Button variant="success" onClick={this.printDiv}>
              {translate("commonPrint")}
            </Button>
            <Button
              variant="info"
              onClick={() => {
                if (modalData.stockStatus === "Available") {
                  const bloodBagId = modalData.bloodBagId;
                  const donorId = modalData.bloodDonorId;
                  sessionStorage.setItem("bloodBagId", bloodBagId);
                  sessionStorage.setItem("donorId", donorId);
                  history.push(`/blood/compatibility/${bloodBagId}/test/add`);
                  window.location.reload();
                } else {
                  alert("Blood is not available");
                }
              }}
            >
              {translate("compatibilityWithPatient")}
            </Button>
            <Button
              variant="success"
              disabled={!modalData.bloodStorage || modalData.bloodStorage === "Discard-Fridge"? true : false}
              onClick={()=>{
                const bloodBagId = modalData.bloodBagId;
                this.updateBloodStockStatus(bloodBagId);
              }}
            >
              {translate("approveBlood")}
            </Button>
          </Modal.Footer>
        </div>
      </div>
    );
  }
}

export default BloodStockModal;
