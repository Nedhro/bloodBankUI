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
    state.donorId =props.data.id;
    console.log(state);
    return state;
  }
  formatDate(data: any) {
    console.log(data);
    if(data === -21600000 || data === null){
      return null;
    }
    let date = new Date(data);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 101).toString().substring(1);
    let day = (date.getDate() + 100).toString().substring(1);
    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }

  render() {
    const { title, modalData, donorId } = this.state;
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
            <h4><span className="font-weight-bold">{translate("donorId")}</span> : {donorId}</h4>
            <p><span className="font-weight-bold">{translate("name")}</span>  : {modalData.name} </p>
            <p><span className="font-weight-bold">{translate("donorGuardian")}</span> : {modalData.guardian}</p>
            <p><span className="font-weight-bold">{translate("donorGender")}</span> : {modalData.gender} &nbsp; &nbsp; <span className="font-weight-bold">{translate("donorAge")}</span> : {modalData.age} &nbsp; &nbsp; <span className="font-weight-bold">{translate("donorProfession")}</span> : {modalData.profession}</p>
            <p><span className="font-weight-bold">{translate("typeOfDonor")}</span>  : {modalData.typeOfDonor} &nbsp; &nbsp;<span className="font-weight-bold">{translate("patient")}</span>  : {modalData.patient}</p>
            <p><span className="font-weight-bold">{translate("donorMobileNo")}</span> : {modalData.mobile} </p>
            <p><span className="font-weight-bold">{translate("donorMaritalStatus")}</span> : {modalData.maritalStatus}</p>  
            <p><span className="font-weight-bold">{translate("donorPresentAddress")}</span> : {modalData.presentAddress}</p>
            <p><span className="font-weight-bold">{translate("donorPermanentAddress")}</span> : {modalData.permanentAddress}</p>
            <p><span className="font-weight-bold">{translate("donorLastDonatedDate")}</span> : {this.formatDate(modalData.lastDonatedDate)}  </p>
            <p><span className="font-weight-bold">{translate("donorLastDonatedPlace")}</span> : {modalData.lastDonatedPlace}</p>

            <h3 className="text-info font-weight-bold">{translate("donorQues")}:</h3>
            <ol type="a">
              {modalData.concernSet.map((k: any, i: any)=>(
                <li key={i}>{k.concernName} ({k.concernStatus})</li>
              ))}
            </ol>
          </Modal.Body>
        </div>

        <div className="no-printme">
          <Modal.Footer>
            <a
              className="btn btn-info"
              href={`/donorPhysicalSuitability/test/add/${donorId}`}
              onClick={() => {
                sessionStorage.setItem("donorId", donorId);
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
