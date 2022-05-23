import React from "react";
import { Button, Modal } from "react-bootstrap";
import BloodStockService from "../../services/BloodStockService";
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import "../../static/scss/print.scss";
import { history } from "../helper/history";
import FormBanner from "../../static/images/hospitalBanner.png";
// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import { authenticationService } from "../../services/AuthenticationService";
// toast-configuration method, 
// it is compulsory method.
toast.configure();


export interface TableModalProps {
  data: Object;
  title: any;
  translate: (key: string) => string;
}

class BloodStockModal extends React.Component<TableModalProps, any> {
  tableData: any = [];
  currentUser: any = "";
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      modalData: {},
      currentDateTime: Date().toLocaleString(),
      open: false,
      alertMessage: '',
      bloodBagId: '',
    };
  }

  componentDidMount() {
    if (authenticationService.currentUserValue !== undefined
      || authenticationService.currentUserValue !== null) {
      this.currentUser = authenticationService.currentUserValue
    }
  }
  handleClickOpen = (bloodBagId: string) => {
    this.setState({
      open: true,
      bloodBagId: bloodBagId,
    })
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  printDiv() {
    window.print();
  }

  static getDerivedStateFromProps(props: any, state: any) {
    state.title = props.title;
    state.modalData = props.data;
    return state;
  }

  updateBloodStockStatus() {
    BloodStockService.updateStockStatus(this.state.bloodBagId, this.currentUser).then((res) => {
      if (res.status === 202) {
        toast.success("Blood bag has been approved for the patient and made unavailable from the stock", { position: toast.POSITION.BOTTOM_RIGHT });
        history.push("/blood/stock/list");
      }
      if (res.status === 226) {
        toast.error(`Blood bag : ${res.data} is not availablle in the stock`, { position: toast.POSITION.BOTTOM_RIGHT });
      }
    });
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
    const { title, modalData } = this.state;
    const { translate } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent >
            <div className="alert-message">
              <p style={{ fontSize: '16px' }} className="font-weight-bold py-3 px-4 text-dark">Are you sure?</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button className="btn btn-danger px-2 btn-sm  font-weight-bold mr-2" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button className="btn btn-primary px-3 btn-sm  font-weight-bold" onClick={() => this.updateBloodStockStatus()} color="primary">
              OK
            </Button>

          </DialogActions>
        </Dialog>
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
                {translate("bloodComponent")}
              </span>{" "}
              : {modalData.bloodComponent}
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
              style={{ display: modalData.stockStatus === "Available" ? "block" : "none" }}
              variant="info"
              onClick={() => {
                if (modalData.stockStatus === "Available") {
                  const bloodBagId = modalData.bloodBagId;
                  const donorId = modalData.bloodDonorId;
                  sessionStorage.setItem("bloodBagId", bloodBagId);
                  sessionStorage.setItem("donorId", donorId);
                  history.push(`/blood/compatibility/${bloodBagId}/test/add`);

                } else {
                  toast.warn("Blood Bag is not available", { position: toast.POSITION.BOTTOM_RIGHT });
                }
              }}
            >
              {translate("compatibilityWithPatient")}
            </Button>
            <Button
              style={{ display: modalData.stockStatus === "Available" ? "block" : "none" }}
              variant="success"
              disabled={!modalData.bloodStorage || modalData.bloodStorage === "Discard-Fridge" ? true : false}
              onClick={() => {
                const bloodBagId = modalData.bloodBagId;
                this.handleClickOpen(bloodBagId);
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
