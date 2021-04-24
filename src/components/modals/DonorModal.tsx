import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../static/scss/print.scss";

// import $ from "jquery";

export interface TableModalProps {
  data: Object;
  title: any;
}

class DonorModal extends React.Component<TableModalProps, any> {
  tableData: any = [];
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      modalData: {},
      donorId: ''
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
            Donor Id : {title}
          </Modal.Title>
        </Modal.Header>
        <div
          id="printSection"
          className="print-container"
          style={{ margin: "0", padding: "0" }}
        >
          <div className="page-break" />
          <Modal.Body>
            <h4>Donor Information</h4>
            <p>Name : {modalData.name}</p>
            <p>Age : {modalData.age}</p>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <a
              className="btn btn-info"
              href={`/donorPhysicalSuitability/test/add/${title}`}
            >
              Test Physical Suitability
            </a>
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

export default DonorModal;
