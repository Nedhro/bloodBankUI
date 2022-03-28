import React from "react";
import Select from "react-select";
import { authenticationService } from "../../services/AuthenticationService";
import BloodStockService from "../../services/BloodStockService";
import DonorService from "../../services/DonorService";
import { history } from "../helper/history";
// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
// toast-configuration method, 
// it is compulsory method.
toast.configure();

interface CompatibilityProps {
    translate: (key: string) => string;
}
class AddReport extends React.Component<CompatibilityProps, any> {
    dataConfig: any = {};
    currentUser: any;

    constructor(props: any) {
        super(props);
        this.state = {
            bloodSerologyId: "",
            patientBloodGroup: "",
            patientBloodGroupRhesus: "",
            bloodHivTest: "",
            bloodHbvTest: "",
            bloodHcvTest: "",
            bloodSyphilisTest: "",
            bloodMalariaTest: "",
            createdBy: "",
            updatedBy: "",
            patientId: null,
            patientName: null,
            selectOptions: [],
            showOptions: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        /*
        for tracking users who is creating or updating
        */
        if (authenticationService.currentUserValue !== undefined
            || authenticationService.currentUserValue !== null) {
            this.currentUser = authenticationService.currentUserValue
        }

        const id = sessionStorage.getItem("bloodSerologyId");
        if (id) {
            this.getSerologyTestById(parseInt(id));
            this.setState({
                createdBy: null,
                updatedBy: this.currentUser
            });
        } else {
            this.setState({
                createdBy: this.currentUser,
                updatedBy: null
            });
        }

    }

    handleInputChange = (typedOption: any) => {
        if (typedOption.length > 3) {
            DonorService.getAllActivePatients(typedOption).then((res) => {
                const result = res.data;
                const options = result?.map((d: any) => ({
                    value: d.patient_id,
                    label: d.name,
                }));
                this.setState({ selectOptions: options });
            });
            this.setState(
                { showOptions: true, }
            )
        }
        else {
            this.setState(
                { showOptions: false }
            )
        }
    }
    handleChange(selectedOption: any) {
        if(selectedOption !== null){
            this.setState({ 
                patientName: selectedOption.label,
                patientId: selectedOption.value });
        }
        
    }

    changeHandler = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    submitHandler = (event: any) => {
        event.preventDefault();
        if (this.state.bloodSerologyId) {
            this.dataConfig = {
                bloodSerologyId: this.state.bloodSerologyId,
                patientName: this.state.patientName,
                patientId: this.state.patientId,
                patientBloodGroup: this.state.patientBloodGroup,
                patientBloodGroupRhesus: this.state.patientBloodGroupRhesus,

               
                bloodHivTest: this.state.bloodHivTest,
                bloodHbvTest: this.state.bloodHbvTest,
                bloodHcvTest: this.state.bloodHcvTest,
                bloodSyphilisTest: this.state.bloodSyphilisTest,
                bloodMalariaTest: this.state.bloodMalariaTest,
                updatedBy: this.state.updatedBy
            }
        } else {
            this.dataConfig = {
                patientName: this.state.patientName,
                patientId: this.state.patientId,
                patientBloodGroup: this.state.patientBloodGroup,
                patientBloodGroupRhesus: this.state.patientBloodGroupRhesus,

               
                bloodHivTest: this.state.bloodHivTest,
                bloodHbvTest: this.state.bloodHbvTest,
                bloodHcvTest: this.state.bloodHcvTest,
                bloodSyphilisTest: this.state.bloodSyphilisTest,
                bloodMalariaTest: this.state.bloodMalariaTest,
                createdBy: this.state.createdBy
            }
        }
        this.saveSerologyTest(this.dataConfig);
     
    };

    saveSerologyTest(data: any) {
        BloodStockService.saveReport(data).then((res) => {
            if (res.status === 201) {
                toast.success("Blood Serology Test has been saved successfully", { position: toast.POSITION.BOTTOM_RIGHT });
                history.push("/report/list");
            } else if (res.status === 202) {
                toast.success("Blood Serology Test has been updated successfully", { position: toast.POSITION.BOTTOM_RIGHT });
                history.push("/report/list");
            } else {
                toast.error("Please enter valid data", { position: toast.POSITION.BOTTOM_RIGHT });
            }
        });
    }

    getSerologyTestById(id: number) {
        BloodStockService.getReportById(id).then((res) => {
            this.setState({
                bloodSerologyId: res.data.bloodSerologyId,
              
                patientName: res.data.patientName,
                patientId: res.data.patientId,
                patientBloodGroup: res.data.patientBloodGroup,
                patientBloodGroupRhesus: res.data.patientBloodGroupRhesus,
              
               
                bloodHivTest: res.data.bloodHivTest,
                bloodHbvTest: res.data.bloodHbvTest,
                bloodHcvTest: res.data.bloodHcvTest,
                bloodSyphilisTest: res.data.bloodSyphilisTest,
                bloodMalariaTest: res.data.bloodMalariaTest,
            });
            if (res?.data?.patient) {
                this.setState({
                    patientId: res?.data?.patient,
                });
            }
        });
    }
    render() {
        const { translate } = this.props;
        const { patientId, patientName } = this.state;
        return (
            <div className="container-fluid m-1 p-1">
                <h2 className="text-info text-center">
                    {sessionStorage.getItem("bloodSerologyId") ? (
                        <>
                            {" "}
                            <h2 className="text-info text-center">
                                Edit Report
                            </h2>
                        </>
                    ) : (
                        <>
                            <h2 className="text-info text-center">
                                Add Report
                            </h2>
                        </>
                    )}
                </h2>
                <div className="container">
                    <form className="form" onSubmit={this.submitHandler}>
                        <div className="row form-group mt-0 mb-4 pb-0">
                            <div className="col-4 text-right">
                                <label className="font-weight-bold" htmlFor="patient">
                                    {translate("patient")}
                                    <span className="text-danger">*</span>
                                </label>
                            </div>
                            <div className="col-4">
                                {!patientId && (
                                    <Select
                                        className="text-left"
                                        name="patient"
                                        isSearchable={true}
                                        isClearable={true}
                                        value={patientName}
                                        onChange={this.handleChange}
                                        // options={this.state.selectOptions}
                                        options={this.state.showOptions ? this.state.selectOptions : []}
                                        onInputChange={this.handleInputChange}
                                        menuIsOpen={this.state.showOptions}
                                    />
                                )}
                                {patientId && (
                                    <Select
                                        className="text-left"
                                        name="patient"
                                        isSearchable={true}
                                        defaultInputValue={patientName}
                                        onChange={this.handleChange}
                                        // options={this.state.selectOptions}
                                        options={this.state.showOptions ? this.state.selectOptions : []}
                                        onInputChange={this.handleInputChange}
                                        menuIsOpen={this.state.showOptions}
                                    />
                                )}
                            </div>

                           
                        </div>
                        <div className="row form-group mt-0 mb-2 pb-0">
                            <div className="col-4 text-right pl-2 pr-1">
                                <label
                                    className="font-weight-bold"
                                    htmlFor="patientBloodGroup"
                                >
                                    {translate("patientBloodGroup")}
                                    
                                </label>
                            </div>
                            <div className="col-8">
                                <div className="row form-group">
                                    <div className="col-12 pl-3 pr-3 mt-0">
                                        <select
                                            style={{ width: "200px" }}
                                            className="form-control pl-1"
                                            name="patientBloodGroup"
                                            id="patientBloodGroup"
                                            value={this.state.patientBloodGroup}
                
                                            onChange={this.changeHandler}
                                        >
                                            <option value="">{translate("commonSelect")}</option>
                                            <option value="A">A</option>
                                            <option value="AB">AB</option>
                                            <option value="B">B</option>
                                            <option value="O">O</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row form-group mt-0 mb-2 pb-0">
                            <div className="col-4 text-right pl-2 pr-1">
                                <label
                                    className="font-weight-bold"
                                    htmlFor="patientBloodGroupRhesus"
                                >
                                    {translate("patientBloodGroupRhesus")}
                                    
                                </label>
                            </div>
                            <div className="col-8">
                                <div className="row form-group">
                                    <div className="col-12 pl-3 pr-3 mt-0">
                                        <select
                                            style={{ width: "200px" }}
                                            className="form-control pl-1"
                                            name="patientBloodGroupRhesus"
                                            id="patientBloodGroupRhesus"
                                            value={this.state.patientBloodGroupRhesus}
                
                                            onChange={this.changeHandler}
                                        >
                                            <option value="">{translate("commonSelect")}</option>
                                            <option value="+Ve(Positive)">{translate("rhPositive")}</option>
                                            <option value="-Ve(Negative)">{translate("rhNegative")}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row form-group mt-0 mb-0">
                            <div className="col-4 text-right">
                                <label className="font-weight-bold" htmlFor="bloodScreening">
                                    {translate("bloodScreening")}
                                    
                                </label>
                            </div>
                            <div className="col-8 text-left">
                                <p className="ml-0">(Combined result of the following tests)</p>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label className="font-weight-bold" htmlFor="bloodHivTest">
                                    {translate("bloodHivTest")}
                                    
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodHivTest"
                                    id="bloodHivTest"
                                    value={this.state.bloodHivTest}
        
                                    onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Reactive">{translate("reactive")}</option>
                                    <option value="Non-Reactive">
                                        {translate("Non-Reactive")}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label className="font-weight-bold" htmlFor="bloodHbvTest">
                                    {translate("bloodHbvTest")}
                                    
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodHbvTest"
                                    id="bloodHbvTest"
                                    value={this.state.bloodHbvTest}
        
                                    onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Reactive">{translate("reactive")}</option>
                                    <option value="Non-Reactive">
                                        {translate("Non-Reactive")}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label className="font-weight-bold" htmlFor="bloodHcvTest">
                                    {translate("bloodHcvTest")}
                                    
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodHcvTest"
                                    id="bloodHcvTest"
                                    value={this.state.bloodHcvTest}
        
                                    onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Reactive">{translate("reactive")}</option>
                                    <option value="Non-Reactive">
                                        {translate("Non-Reactive")}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label className="font-weight-bold" htmlFor="bloodSyphilisTest">
                                    {translate("bloodSyphilisTest")}
                                    
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodSyphilisTest"
                                    id="bloodSyphilisTest"
                                    value={this.state.bloodSyphilisTest}
        
                                    onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Reactive">{translate("reactive")}</option>
                                    <option value="Non-Reactive">
                                        {translate("Non-Reactive")}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label className="font-weight-bold" htmlFor="bloodMalariaTest">
                                    {translate("bloodMalariaTest")}
                                    
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodMalariaTest"
                                    id="bloodMalariaTest"
                                    value={this.state.bloodMalariaTest}
        
                                    onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Reactive">{translate("reactive")}</option>
                                    <option value="Non-Reactive">
                                        {translate("Non-Reactive")}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="row pb-5 form-group">
                            <div className="col-4 text-right"></div>
                            <div className="col-8 float-right text-right ">
                                {sessionStorage.getItem("bloodSerologyId") ? (
                                    <>
                                        {" "}
                                        <input
                                            type="submit"
                                            className="btn btn-success m-1"
                                            value={translate("commonUpdate")}
                                        />
                                        <input
                                            type="cancel"
                                            className="btn btn-danger m-1"
                                            onClick={() => {
                                                history.push("/report/list");

                                                sessionStorage.removeItem("bloodSerologyId");
                                                sessionStorage.removeItem("bloodBagId");
                                            }}
                                            value={translate("commonCancel")}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="submit"
                                            className="btn btn-success m-1"
                                            value={translate("commonSave")}
                                        />
                                        <input
                                            type="reset"
                                            className="btn btn-danger m-1"
                                            value={translate("commonReset")}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddReport;
