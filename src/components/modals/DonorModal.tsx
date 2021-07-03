import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../static/scss/print.scss";
import FormBanner from "../../static/images/hospitalBanner.png";


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
      donorId: '',
      currentDateTime: Date().toLocaleString(),
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
    let formattedDate = day + "-" + month + "-" +  year;
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
            <div className="formBanner">
              <img
                src={FormBanner}
                width="100%"
                height="200px"
                className="Form-Banner header"
                alt="Banner"
              />
            </div>
            <h4 className="text-center"><span className="font-weight-bold">{translate("donorInfoHeading")}
            </span> ({translate("id")}: {donorId}) </h4>
            <p><span className="font-weight-bold">{translate("date")}</span> :{" "}
              {this.formatDate(this.state.currentDateTime)} </p>
            
            <div className="row">
              <div className="col-6">
                <p><span className="font-weight-bold">{translate("name")}</span>  : {modalData.name} </p>
                <p className="font-weight-bold">
                  {translate("donorGender")}<span className="font-weight-normal">{" "}:{" "}{modalData.gender}</span>
                </p>

                <p className="font-weight-bold">{translate("typeOfDonor")} <span className="font-weight-normal">{" "}:{" "} {modalData.typeOfDonor}</span>
                </p>

                
              </div>
              <div className="col-6">
                <p className="font-weight-bold">
                  {translate("donorAge")}<span className="font-weight-normal">{" "}:{" "}{modalData.age}</span>
                </p>

                <p className="font-weight-bold">{translate("patient")} <span className="font-weight-normal">{" "}:{" "} {modalData.patient}</span>
                </p>

                <p className="font-weight-bold">{translate("donorProfession")} <span className="font-weight-normal">{" "}:{" "} {modalData.profession}</span>
                </p>
              </div>
            </div>
            <p className="font-weight-bold">{translate("donorMobileNo")} <span className="font-weight-normal">{" "}:{" "} {modalData.mobile}</span>
            </p>
            <p><span className="font-weight-bold">{translate("donorGuardian")}</span> : {modalData.guardian}</p>
            {/* <p><span className="font-weight-bold">{translate("donorGender")}</span> : {modalData.gender} &nbsp; &nbsp; <span className="font-weight-bold">{translate("donorAge")}</span> : {modalData.age} </p>
            <p><span className="font-weight-bold">{translate("typeOfDonor")}</span>  : {modalData.typeOfDonor} &nbsp; &nbsp;<span className="font-weight-bold">{translate("patient")}</span>  : {modalData.patient}</p>
            <p><span className="font-weight-bold">{translate("donorMobileNo")}</span> : {modalData.mobile} &nbsp; &nbsp; <span className="font-weight-bold">{translate("donorProfession")}</span> : {modalData.profession}</p> */}

            <p><span className="font-weight-bold">{translate("donorMaritalStatus")}</span> : {modalData.maritalStatus}</p>  
            <p><span className="font-weight-bold">{translate("donorPresentAddress")}</span> : {modalData.presentAddress}</p>
            <p><span className="font-weight-bold">{translate("donorPermanentAddress")}</span> : {modalData.permanentAddress}</p>
            <p><span className="font-weight-bold">{translate("donorLastDonatedDate")}</span> : {this.formatDate(modalData.lastDonatedDate)}  </p>
            <p><span className="font-weight-bold">{translate("donorLastDonatedPlace")}</span> : {modalData.lastDonatedPlace}</p>

            <div className="container px-5">
              <h3 className="text-dark font-weight-bold">{translate("donorQues")}:</h3>
              <div className="row">
                {modalData.concernSet.map((k: any, i: any) => (
                  <div className="col-4 form-inline" key={i}>
                    <li >{k.concernName} ({k.concernStatus})</li>
                  </div>
                  
                ))}
              </div>
              
            </div>
            <div className="row signature d-flex justify-content-end" id="signature">
              <div className="col-4 mt-5 pt-5"></div>
              <div className="col-4 mt-5 pt-5 p-1" >
                <p>
                  ........................................................
                </p>
                <p className="text-dark" style={{ width: "200px" }}>
                  {translate("MOSignature")}
                </p>
              </div>
              <div className="col-4 mt-5 pt-5 pl-1" style={{ marginLeft: "-10px" }}>
                <p>.........................................................</p>
                <p className="text-dark" style={{ width: "220px" }}>
                  {translate("MTSignature")}
                </p>
              </div>
            </div>
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
