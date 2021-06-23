import React from "react";
import { Button, Modal } from "react-bootstrap";
import BloodStockService from "../../services/BloodStockService";
import "../../static/scss/print.scss";

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
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Blood Comatiability Test Id : {title}
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
              Compatiability Test ({modalData.bloodCompatibilityId})
            </h4>
            <p>Blood Bag Id : {modalData.bloodBagId}</p>
            <p>Patient : {modalData.patient}</p>
            <p>Blood Screening : {modalData.bloodScreening}</p>
            <p>Blood Grouping : {modalData.bloodGrouping}</p>
            <p>Blood Cross Matching : {modalData.bloodCrossMatching}</p>
            <p>HIV : {modalData.bloodHivTest}</p>
            <p>HBV : {modalData.bloodHbvTest}</p>
            <p>HCV : {modalData.bloodHcvTest}</p>
            <p>Syphilis : {modalData.bloodSyphilisTest}</p>
            <p>Malaria : {modalData.bloodMalariaTest}</p>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <Button variant="success" onClick={this.printDiv}>
              Print
            </Button>
            <Button
              variant="info"
              onClick={() => {
                const bloodBagId = modalData.bloodBagId;
                this.updateBloodStockStatus(bloodBagId);
              }}
            >
              Approve Blood For Patient
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
