import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../static/scss/print.scss";
import { history } from "../custom/history";


export interface TableModalProps {
  data: Object;
  title: any;
  translate: (key: string) => string;
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
    const { translate } = this.props;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {translate("testId")} : {title}
          </Modal.Title>
        </Modal.Header>
        <div id="printSection" className="print-container" style={{ margin: "0", padding: "0" }}>
        <div className="page-break" />
          <Modal.Body>
            <h4><span className="font-weight-bold">{translate("testResult")} ({translate("id")}</span>: {title})</h4>
            <p><span className="font-weight-bold">{translate("donorId")}</span> : {modalData.bloodDonorId}</p>
            <p><span className="font-weight-bold">{translate("hemoglobin")}</span> : {modalData.donorHemoglobin}</p>
            <p><span className="font-weight-bold">{translate("weight")}</span> : {modalData.donorWeight}</p>
            <p><span className="font-weight-bold">{translate("bloodPressure")}</span> : {modalData.donorBloodPressure}</p>
            <p><span className="font-weight-bold">{translate("pulse")}</span> : {modalData.donorPulseRate}</p>
            <p><span className="font-weight-bold">{translate("temp")} (<sup>o</sup>{translate("cel")})</span> : {modalData.donorTemperature}</p>
            <p><span className="font-weight-bold">{translate("bloodGroup")}</span> : {modalData.donorBloodGroup}</p>
            <p><span className="font-weight-bold">{translate("rh")}</span>  : {modalData.donorBloodGroupRhesus}</p>
            <p><span className="font-weight-bold">{translate("permission")}</span> : {modalData.donorSelection}</p>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <Button variant="success" onClick={this.printDiv}>
              {translate("commonPrint")}
            </Button>
            <Button variant="info" onClick={()=>{
              if(modalData.donorSelection === 'Selected'){
                const donorId = modalData.bloodDonorId;
                const bloodGroup = modalData.donorBloodGroup;
                sessionStorage.setItem("donorId", donorId);
                sessionStorage.setItem("bloodGroup", bloodGroup);
                history.push(`/blood/${donorId}/stock/add`);
                window.location.reload();
              }else{
                alert('Donor is not fit for donating blood');
              }
            }}>{translate("stockBlood")}</Button>
          </Modal.Footer>
        </div>
      </div>
    );
  }
}

export default SuitabilityTestModal;
