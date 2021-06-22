import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../static/scss/print.scss";


export interface TableModalProps {
  data: Object;
  title: any;
  translate: (key: string) => string;
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
    const { translate } = this.props;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {translate("donorId")} : {title}
          </Modal.Title>
        </Modal.Header>
        <div
          id="printSection"
          className="print-container"
          style={{ margin: "0", padding: "0" }}
        >
          <div className="page-break" />
          <Modal.Body>
            <h4>{translate("donorId")}</h4>
            <p>{translate("name")}  : {modalData.name}</p>
            <p>{translate("donorAge")} : {modalData.age}</p>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <a
              className="btn btn-info"
              href={`/donorPhysicalSuitability/test/add/${title}`}
              onClick={() => {
                sessionStorage.setItem("donorId", title);
              }}
            >
              {translate("testPhysicalSuitability")}
            </a>
            <Button variant="success" onClick={this.printDiv}>
              {translate("commonPrint")}
            </Button>
          </Modal.Footer>
        </div>
      </div>
    );
  }
}

export default DonorModal;
