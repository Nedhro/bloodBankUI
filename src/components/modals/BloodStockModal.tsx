import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../static/scss/print.scss";
import { history } from "../custom/history";

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
            Blood Stock Id : {title}
          </Modal.Title>
        </Modal.Header>
        <div
          id="printSection"
          className="print-container"
          style={{ margin: "0", padding: "0" }}
        >
          <div className="page-break" />
          <Modal.Body>
            <h4 className="font-weight-bold">Blood Sample ({modalData.bloodBagId})</h4>
            <p>Blood Donor Id : {modalData.bloodDonorId}</p>
            <p>Blood Group : {modalData.bloodGroup}</p>
            <p>Source Of Blood : {modalData.sourceOfBlood}</p>
            <p>Blood Bag Id : {modalData.bloodBagId}</p>
            <p>Blood Storage : {modalData.bloodStorage}</p>
            <p>Stock Status : {modalData.stockStatus}</p>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <Button variant="success" onClick={this.printDiv}>
              Print
            </Button>
            <Button variant="info" onClick={()=>{
              const bloodBagId = modalData.bloodBagId;
              const donorId = modalData.bloodDonorId;
              sessionStorage.setItem("bloodBagId", bloodBagId);
              sessionStorage.setItem("donorId", donorId);
              history.push(`/blood/compatibility/${bloodBagId}/test/add`);
              window.location.reload();
            }}>
              Compatibility Test with Patient
            </Button>
          </Modal.Footer>
        </div>
      </div>
    );
  }
}

export default BloodStockModal;
