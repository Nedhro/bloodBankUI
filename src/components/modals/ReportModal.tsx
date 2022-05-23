import React from "react";
import { Button, Modal } from "react-bootstrap";
// import BloodStockService from "../../services/BloodStockService";
import "../../static/scss/print.scss";
import FormBanner from "../../static/images/hospitalBanner.png";
// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import DonorService from "../../services/DonorService";
// toast-configuration method, 
// it is compulsory method.
toast.configure();

export interface TableModalProps {
    data: Object;
    translate: (key: string) => string;
}

class ReportModal extends React.Component<TableModalProps, any> {
    tableData: any = [];
    constructor(props: any) {
        super(props);
        this.state = {
            modalData: {},
            disallowApprove: false,
            message: "",
            currentDateTime: Date().toLocaleString(),
            patient: ""
        };
    }

    componentDidMount() {

        this.getPatientList();

    }
    getPatientList() {
        DonorService.getPatientInformation(this.state.modalData.patientId).then((res) => {
            const result = res.data;
            this.setState({ patient: result[0] });
        });
    }
    printDiv() {
        window.print();
    }

    static getDerivedStateFromProps(props: any, state: any) {
        
        state.modalData = props.data;
        return state;
    }

    formatDate(data: any) {
        if (data === -21600000) {
            return null;
        }
        let date = new Date(data);
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 101).toString().substring(1);
        let day = (date.getDate() + 100).toString().substring(1);
        let formattedDate = day + "-" + month + "-" + year;
        return formattedDate;
    }

    render() {
        const {  modalData } = this.state;
        const { translate } = this.props;
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {/* {translate("bloodCompatibilityId")} : {title} */}
                    </Modal.Title>
                </Modal.Header>
                <div
                    id="printSection"
                    className="print-container"
                    style={{ margin: "0", padding: "0" }}
                >
                    <Modal.Body>
                        <div className="formBanner">
                            <img
                                src={FormBanner}
                                className="Form-Banner-compatibility-modal"
                                alt="Banner"
                            />
                        </div>
                        <div className="text-left ml-1 pl-1">
                            {" "}
                            <h4 className="font-weight-bold text-center mt-4">
                                Serology report
                            </h4>
                            <div className="text-right mr-4">
                                <p >
                                    <span className="font-weight-bold">{translate("date")}</span> :{" "}
                                    {this.formatDate(this.state.currentDateTime)}
                                </p>
                            </div>

                            <div className="compatibility-table">
                                <table >
                                    <tr className="compatibility-first-tr">
                                        <td colSpan={3}> <span className="font-weight-bold">Patient Name: </span><span>{this.state.modalData?.patientName}</span></td>
                                        <td colSpan={1}> <span className="font-weight-bold">Age: </span><span>{this.state.patient?.age}</span></td>
                                        <td colSpan={1}> <span className="font-weight-bold">Sex: </span><span>{this.state.patient?.gender === "M" ? "Male" :
                                            this.state.patient?.gender === "F" ? "Female" : "Other"
                                        }</span></td>
                                    </tr>
                                    <tr className="compatibility-first-tr" >
                                        <td><b>Patient Lab No:</b> {this.state.modalData?.bloodSerologyId}</td>
                                        <td colSpan={2}><b>Cabin/Ward No:</b> <span>{this.state.patient?.ward}</span></td>
                                        <td><b>Bed No:</b> <span>{this.state.patient?.bed}</span></td>
                                        <td><b>Unit:</b> <span>{this.state.patient?.unit}</span></td>
                                    </tr>
                         
                                </table>
                            </div>
                            <div className="report-body">
                                {modalData.patientBloodGroup && <div className="row mx-2 mt-5 ">
                                    <div className="col-4 extra-label font-weight-bold">
                                        <span>Result of Blood Grouping Test:</span>
                                    </div>
                                    <div className="col-8 serology-table-two">
                                        <table>
                                            <tr>
                                                <td className="font-weight-bold">ABO:</td>
                                                <td><span
                                                    className="font-weight-bold"
                                                >
                                                    {modalData.patientBloodGroup}
                                                </span></td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold">Rh(D):</td>
                                                <td>   <span
                                                    className="font-weight-bold"
                                                >
                                                    {modalData.patientBloodGroupRhesus}
                                                </span></td>
                                            </tr>

                                        </table>
                                    </div>
                                </div>}

                                {
                                    modalData.bloodHbvTest || modalData.bloodHivTest || modalData.bloodHcvTest || modalData.bloodSyphilisTest || modalData.bloodMalariaTest ? <div className="row  mx-2 mt-5 ">
                                        <div className="col-4 extra-label font-weight-bold">
                                            <span>Result of Screening Test:</span>
                                        </div>
                                        <div className="col-8 serology-table-two">
                                            <table>
                                                {
                                                    modalData.bloodHbvTest && <tr>
                                                        <td className="font-weight-bold">HBsAg:</td>
                                                        <td><span
                                                            className={
                                                                modalData.bloodHbvTest === "Reactive"
                                                                    ? "text-danger"
                                                                    : "text-success"
                                                            }
                                                        >
                                                            {modalData.bloodHbvTest}
                                                        </span></td>
                                                    </tr>
                                                }
                                                {
                                                    modalData.bloodHivTest && <tr>
                                                        <td className="font-weight-bold">HIV 1&2:</td>
                                                        <td>   <span
                                                            className={
                                                                modalData.bloodHivTest === "Reactive"
                                                                    ? "text-danger"
                                                                    : "text-success"
                                                            }
                                                        >
                                                            {modalData.bloodHivTest}
                                                        </span></td>
                                                    </tr>
                                                }

                                                {
                                                    modalData.bloodHcvTest && <tr>
                                                        <td className="font-weight-bold">HCV:</td>
                                                        <td>  <span
                                                            className={
                                                                modalData.bloodHcvTest === "Reactive"
                                                                    ? "text-danger"
                                                                    : "text-success"
                                                            }
                                                        >
                                                            {modalData.bloodHcvTest}
                                                        </span></td>
                                                    </tr>
                                                }
                                                {modalData.bloodSyphilisTest && <tr>
                                                    <td className="font-weight-bold">SYPHILIS:</td>
                                                    <td>    <span
                                                        className={
                                                            modalData.bloodSyphilisTest === "Reactive"
                                                                ? "text-danger"
                                                                : "text-success"
                                                        }
                                                    >
                                                        {modalData.bloodSyphilisTest}
                                                    </span></td>
                                                </tr>}
                                                {modalData.bloodMalariaTest && <tr>
                                                    <td className="font-weight-bold">MP:</td>
                                                    <td><span
                                                        className={
                                                            modalData.bloodMalariaTest === "Reactive"
                                                                ? "text-danger"
                                                                : "text-success"
                                                        }
                                                    >
                                                        {modalData.bloodMalariaTest}
                                                    </span></td>
                                                </tr>}

                                            </table>
                                        </div>
                                    </div>
                                        : <></>
                                }
                            </div>
                         
                           
                     
                           
                       
                            <div className="row compatibility-footer text-center">
                                <div className="col-6">
                                    <p>
                                        ....................................................................................
                                    </p>
                                    <p className="text-dark compatibility-signature" >
                                        MT Signature
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p>.........................................................</p>
                                    <p className="text-dark compatibility-signature" >
                                        Lab In-Charge/Duty Doctor

                                    </p>
                                </div>
                            </div>
                          
                        </div>
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

export default ReportModal;
