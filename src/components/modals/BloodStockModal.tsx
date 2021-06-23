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
    const { translate } = this.props;
    return (
      <div>
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
            <h4 className="font-weight-bold">{translate("bloodSample")} ({modalData.bloodBagId})</h4>
            <p>{translate("bloodDonorId")} : {modalData.bloodDonorId}</p>
            <p>{translate("bloodGroup")} : {modalData.bloodGroup}</p>
            <p>{translate("sourceOfBlood")} : {modalData.sourceOfBlood}</p>
            <p>{translate("bloodBagId")} : {modalData.bloodBagId}</p>
            <p>{translate("bloodStorage")} : {modalData.bloodStorage}</p>
            <p>{translate("stockStatus")} : {modalData.stockStatus}</p>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <Button variant="success" onClick={this.printDiv}>
              {translate("commonPrint")}
            </Button>
            <Button variant="info" onClick={()=>{
              const bloodBagId = modalData.bloodBagId;
              const donorId = modalData.bloodDonorId;
              sessionStorage.setItem("bloodBagId", bloodBagId);
              sessionStorage.setItem("donorId", donorId);
              history.push(`/blood/compatibility/${bloodBagId}/test/add`);
              window.location.reload();
            }}>
              {translate("compatibilityWithPatient")}
            </Button>
          </Modal.Footer>
        </div>
      </div>
    );
  }
}

export default BloodStockModal;
