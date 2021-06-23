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
            <p>{translate("bloodBagId")} : {modalData.bloodBagId}</p>
            <p>{translate("patient")} : {modalData.patient}</p>
            <p>{translate("bloodScreening")} : {modalData.bloodScreening}</p>
            <p>{translate("bloodGrouping")} : {modalData.bloodGrouping}</p>
            <p>{translate("crossMatching")} : {modalData.bloodCrossMatching}</p>
            <p>{translate("bloodHivTest")} : {modalData.bloodHivTest}</p>
            <p>{translate("bloodHbvTest")} : {modalData.bloodHbvTest}</p>
            <p>{translate("bloodHcvTest")} : {modalData.bloodHcvTest}</p>
            <p>{translate("bloodSyphilisTest")} : {modalData.bloodSyphilisTest}</p>
            <p>{translate("bloodMalariaTest")} : {modalData.bloodMalariaTest}</p>
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
