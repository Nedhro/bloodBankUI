import React from "react";
import { Button, Modal } from "react-bootstrap";
import BloodStockService from "../../services/BloodStockService";
import "../../static/scss/print.scss";
import { history } from "../custom/history";

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
      message: ""
    };
  }

  updateBloodStockStatus(bloodBagId: any) {
    const testId = this.state.modalData.bloodCompatibilityId;
    BloodStockService.updateCompatibilityTestStatus(bloodBagId).then((res) => {
      console.log(res);
      if (res.status === 202) {
        this.setState({
          notification:
            "Blood has been approved for the patient and made unavailable from the stock",
        });
        BloodStockService.deleteCompatibilityTest(testId).then((res) => {
          if (res.status === 202) {
            this.setState({
              notification: "Compatibility test has been deleted",
            });
          }
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

  componentDidMount() {
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
        message: "The blood sample is not compatible for the patient"
      });
    }else{
      this.setState({
        disallowApprove: false,
        message: "The blood sample is compatible for the patient"
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

  render() {
    const { title, modalData, notification, disallowApprove, message } = this.state;
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
          <div className="page-break" />
          <Modal.Body>
            <h4 className="font-weight-bold">
              {translate("compatibilityTest")} ({modalData.bloodCompatibilityId}
              )
            </h4>
            <p>
              <span className="font-weight-bold">
                {translate("bloodBagId")}
              </span>{" "}
              : {modalData.bloodBagId}
            </p>
            <p>
              <span className="font-weight-bold">{translate("patient")}</span> :{" "}
              {modalData.patient}
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodGrouping")}
              </span>{" "}
              : <span className={modalData.bloodGrouping==="NonCompatible"?"text-danger":"text-success"}>{modalData.bloodGrouping}</span>
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("crossMatching")}
              </span>{" "}
              : <span className={modalData.bloodCrossMatching==="NonCompatible"?"text-danger":"text-success"}>{modalData.bloodCrossMatching}</span>
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
              : <span className={modalData.bloodHivTest==="Reactive"?"text-danger":"text-success"}>{modalData.bloodHivTest}</span>
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodHbvTest")}
              </span>{" "}
              : <span className={modalData.bloodHbvTest==="Reactive"?"text-danger":"text-success"}>{modalData.bloodHbvTest}</span>
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodHcvTest")}
              </span>{" "}
              : <span className={modalData.bloodHcvTest==="Reactive"?"text-danger":"text-success"}>{modalData.bloodHcvTest}</span>
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodSyphilisTest")}
              </span>{" "}
              : <span className={modalData.bloodSyphilisTest==="Reactive"?"text-danger":"text-success"}>{modalData.bloodSyphilisTest}</span>
            </p>
            <p>
              <span className="font-weight-bold">
                {translate("bloodMalariaTest")}
              </span>{" "}
              : <span className={modalData.bloodMalariaTest==="Reactive"?"text-danger":"text-success"}>{modalData.bloodMalariaTest}</span>
            </p>
            <p>
            <span className="font-weight-bold">
                {translate("compatibilityTestDecision")}
              </span>{" "}
              : <span className={disallowApprove?"text-danger":"text-success"}>{message}</span>
            </p>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <Button variant="success" onClick={this.printDiv}>
              {translate("commonPrint")}
            </Button>
            <Button
              variant="info"
              disabled={disallowApprove}
              onClick={() => {
                const bloodBagId = modalData.bloodBagId;
                this.updateBloodStockStatus(bloodBagId);
              }}
            >
              {translate("approveBlood")}
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
