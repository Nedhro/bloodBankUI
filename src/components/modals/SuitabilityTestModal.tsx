import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../static/scss/print.scss";


export interface TableModalProps {
  data: Object;
  title: any;
}

class SuitabilityTestModal extends React.Component<TableModalProps, any> {
  tableData: any = [];
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      modalData: {},
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

  render() {
    const { title, modalData } = this.state;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Test Id : {title}
          </Modal.Title>
        </Modal.Header>
        <div id="printSection" className="print-container" style={{ margin: "0", padding: "0" }}>
        <div className="page-break" />
          <Modal.Body>
            <h4>Test Result (Id: {title})</h4>
            <p>Donor Id: {modalData.bloodDonorId}</p>
            <p>Hemoglobin (g/dl) : {modalData.donorHemoglobin}</p>
            <p>Weight (kg) : {modalData.donorWeight}</p>
            <p>Blood Pressure (mmHg) : {modalData.donorBloodPressure}</p>
            <p>Pulse Rate (b/m) : {modalData.donorPulseRate}</p>
            <p>Temperature (<sup>o</sup>C) : {modalData.donorTemperature}</p>
            <p>Blood Group : {modalData.donorBloodGroup}</p>
            <p>Rh : {modalData.donorBloodGroupRhesus}</p>
            <p>Permission : {modalData.donorSelection}</p>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <Button variant="success" onClick={this.printDiv}>
              Print
            </Button>
            <Button variant="secondary">Edit</Button>
          </Modal.Footer>
        </div>
      </div>
    );
  }
}

export default SuitabilityTestModal;
