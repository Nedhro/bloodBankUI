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
    };
  }

  updateBloodStockStatus(bloodBagId: any) {
    console.log(bloodBagId);
    BloodStockService.updateCompatibilityTestStatus(bloodBagId).then((res) => {
      console.log(res);
      if (res.status === 202) {
        this.setState({
          notification:
            "Blood has been approved for the patient and made unavailable from the stock",
        });
      }
    });
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

  render() {
    const { title, modalData, notification } = this.state;
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
              {translate("compatibilityTest")} ({modalData.bloodCompatibilityId})
            </h4>
            <p><span className="font-weight-bold">{translate("bloodBagId")}</span> : {modalData.bloodBagId}</p>
            <p><span className="font-weight-bold">{translate("patient")}</span> : {modalData.patient}</p>
            <p><span className="font-weight-bold">{translate("bloodScreening")}</span> : {modalData.bloodScreening}</p>
            <p><span className="font-weight-bold">{translate("bloodGrouping")}</span> : {modalData.bloodGrouping}</p>
            <p><span className="font-weight-bold">{translate("crossMatching")}</span> : {modalData.bloodCrossMatching}</p>
            <p><span className="font-weight-bold">{translate("bloodHivTest")}</span> : {modalData.bloodHivTest}</p>
            <p><span className="font-weight-bold">{translate("bloodHbvTest")}</span> : {modalData.bloodHbvTest}</p>
            <p><span className="font-weight-bold">{translate("bloodHcvTest")}</span> : {modalData.bloodHcvTest}</p>
            <p><span className="font-weight-bold">{translate("bloodSyphilisTest")}</span> : {modalData.bloodSyphilisTest}</p>
            <p><span className="font-weight-bold">{translate("bloodMalariaTest")}</span> : {modalData.bloodMalariaTest}</p>
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
                const bloodBagId = modalData.bloodBagId;
                this.updateBloodStockStatus(bloodBagId);
                history.push("/blood/stock/list");
                window.location.reload();
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
