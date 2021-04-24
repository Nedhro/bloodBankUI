import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../static/scss/print.scss";

// import $ from "jquery";

export interface TableModalProps {
  data: Object;
  title: any;
}

class QuestionnaireModal extends React.Component<TableModalProps, any> {
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
            Question Id : {title}
          </Modal.Title>
        </Modal.Header>
        <div id="printSection" className="print-container" style={{ margin: "0", padding: "0" }}>
        <div className="page-break" />
          <Modal.Body>
            <h4>Questionnnaire</h4>
            <p>Question : {modalData.question}</p>
            <p>Concern For : {modalData.concernFor}</p>
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

export default QuestionnaireModal;
