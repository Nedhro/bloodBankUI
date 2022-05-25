import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../static/scss/print.scss";
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

class QuestionnaireModal extends React.Component<TableModalProps, any> {
  tableData: any = [];
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      modalData: {},
    };
  }

  componentDidMount() { }

  printDiv() {
    window.print();
  }

  static getDerivedStateFromProps(props: any, state: any) {
    state.title = props.title;
    state.modalData = props.data;
    return state;
  }

  render() {
    const {  modalData } = this.state;
    const { translate } = this.props;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* {translate("quesId")} : {title} */}
          </Modal.Title>
        </Modal.Header>
        <div id="printSection" className="print-container" style={{ margin: "0", padding: "0" }}>
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
            <h4 className="text-center">{translate("questionnaire")}</h4>
            <p><span className="font-weight-bold">{translate("question")}</span> : {modalData.question}</p>
            <p><span className="font-weight-bold">{translate("concernFor")}</span> : {modalData.concernFor}</p>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <Button variant="success" onClick={this.printDiv}>
              {translate("commonPrint")}
            </Button>
          </Modal.Footer>
        </div>
      </div>
    );
  }
}

export default QuestionnaireModal;
