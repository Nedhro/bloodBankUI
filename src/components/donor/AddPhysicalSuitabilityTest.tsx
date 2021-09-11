import React from "react";
import DonorService from "../../services/DonorService";
import { history } from "../helper/history";
import { authenticationService } from "../../services/AuthenticationService";
// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
// toast-configuration method, 
// it is compulsory method.
toast.configure();

interface PhysicalSuitabilityProps {
  translate: (key: string) => string;
}
class AddPhysicalSuitabilityTest extends React.Component<
  PhysicalSuitabilityProps,
  any
> {
  dataConfig: any = {};
  currentUser: any = "";
  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem("donorPhysicalSuitabilityId");
    if (id) {
      this.dataConfig = {
        donorPhysicalSuitabilityId: id,
        bloodDonor: {
          donorId: this.state.bloodDonorId,
        },
        donorHemoglobin: this.state.donorHemoglobin,
        donorWeight: this.state.donorWeight,
        donorBloodPressure: this.state.donorBloodPressure,
        donorPulseRate: this.state.donorPulseRate,
        donorTemperature: this.state.donorTemperature,
        donorBloodGroup: this.state.donorBloodGroup,
        donorBloodGroupRhesus: this.state.donorBloodGroupRhesus,
        donorSelection: this.state.donorSelection,
        updatedBy: this.state.updatedBy
      };
    } else {
      this.dataConfig = {
        bloodDonor: {
          donorId: this.state.bloodDonorId,
        },
        donorHemoglobin: this.state.donorHemoglobin,
        donorWeight: this.state.donorWeight,
        donorBloodPressure: this.state.donorBloodPressure,
        donorPulseRate: this.state.donorPulseRate,
        donorTemperature: this.state.donorTemperature,
        donorBloodGroup: this.state.donorBloodGroup,
        donorBloodGroupRhesus: this.state.donorBloodGroupRhesus,
        donorSelection: this.state.donorSelection,
        createdBy: this.state.createdBy
      };
    }
    this.submitPhysicalTestInfo(this.dataConfig);
  };
  constructor(props: any) {
    super(props);
    this.state = {
      bloodDonorId: "",
      donorHemoglobin: "",
      donorWeight: "",
      donorBloodPressure: "",
      donorPulseRate: "",
      donorTemperature: "",
      donorBloodGroup: "",
      donorBloodGroupRhesus: "",
      donorSelection: "",
      error: null,
      createdBy: "",
      updatedBy: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitPhysicalTestInfo = this.submitPhysicalTestInfo.bind(this);
  }

  componentDidMount() {
    /*
   for tracking users who is creating or updating
   */
    if (authenticationService.currentUserValue !== undefined
      || authenticationService.currentUserValue !== null) {
      this.currentUser = authenticationService.currentUserValue
    }
    const id = sessionStorage.getItem("donorPhysicalSuitabilityId");
    const donorId = sessionStorage.getItem("donorId");
    if (id) {
      this.getPhysicalTestInfoById(parseInt(id));
      this.setState({
        createdBy: null,
        updatedBy: this.currentUser
      });
    }else{
      this.setState({
        createdBy: this.currentUser,
        updatedBy: null
      });
    }
    if (donorId) {
      this.setState({
        bloodDonorId: donorId
      })
    }
  }
  getPhysicalTestInfoById(id: number) {
    DonorService.getPhysicalTestInfoById(id).then((res) => {
      this.setState({
        bloodDonorId: res.data.bloodDonor.donorId,
        donorHemoglobin: res.data.donorHemoglobin,
        donorWeight: res.data.donorWeight,
        donorBloodPressure: res.data.donorBloodPressure,
        donorPulseRate: res.data.donorPulseRate,
        donorTemperature: res.data.donorTemperature,
        donorBloodGroup: res.data.donorBloodGroup,
        donorBloodGroupRhesus: res.data.donorBloodGroupRhesus,
        donorSelection: res.data.donorSelection,
      });
    });
  }

  submitPhysicalTestInfo(dataConfig: any) {
    DonorService.savePhysicalSuitability(dataConfig).then((res) => {
      if (res.status === 201) {
        toast.success("Physical Suitability Test is added successfully", { position: toast.POSITION.BOTTOM_RIGHT });
        sessionStorage.removeItem("donorId");
        history.push("/donorPhysicalSuitability/test/list");
      } else if (res.status === 202) {
        toast.success("Physical Suitability Test is Updated successfully", { position: toast.POSITION.BOTTOM_RIGHT });
        sessionStorage.removeItem("bloodId");
        sessionStorage.removeItem("donorPhysicalSuitabilityId");
        history.push("/donorPhysicalSuitability/test/list");
      } else {
        toast.error("Please add valid and non duplicate values", { position: toast.POSITION.BOTTOM_RIGHT });
      }
    });
  }

  render() {
    const { translate } = this.props;
    return (
      <div className="container-fluid m-1 p-1">
        {sessionStorage.getItem("donorPhysicalSuitabilityId") ? (
          <>
            {" "}
            <h2 className="text-info text-center">
              {translate("editPhysicalTestHeader")}
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-info text-center">
              {translate("physicalTest")}
            </h2>
          </>
        )}
        <div className="container p-1 m-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodDonorId">
                  {translate("donorId")}
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="number"
                  name="bloodDonorId"
                  id="bloodDonorId"
                  readOnly
                  defaultValue={this.state.bloodDonorId}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="donorHemoglobin">
                  {translate("hemoglobin")}{" "}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="number"
                  name="donorHemoglobin"
                  id="donorHemoglobin"
                  value={this.state.donorHemoglobin}
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="donorWeight">
                  {translate("weight")}
                  <span className="text-danger">*</span>{" "}
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="number"
                  name="donorWeight"
                  id="donorWeight"
                  value={this.state.donorWeight}
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label
                  className="font-weight-bold"
                  htmlFor="donorBloodPressure"
                >
                  {translate("bloodPressure")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="donorBloodPressure"
                  id="donorBloodPressure"
                  placeholder="120/80"
                  value={this.state.donorBloodPressure}
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="donorPulseRate">
                  {translate("pulse")}
                  <span className="text-danger">*</span>{" "}
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="number"
                  name="donorPulseRate"
                  id="donorPulseRate"
                  value={this.state.donorPulseRate}
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="donorTemperature">
                  {translate("temp")} (<sup>o</sup>
                  {translate("cel")})<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="number"
                  name="donorTemperature"
                  id="donorTemperature"
                  value={this.state.donorTemperature}
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="donorBloodGroup">
                  {translate("bloodGroup")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="donorBloodGroup"
                  id="donorBloodGroup"
                  value={this.state.donorBloodGroup}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label
                  className="font-weight-bold"
                  htmlFor="donorBloodGroupRhesus"
                >
                  {translate("bloodGroup")} {translate("rhesus")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="donorBloodGroupRhesus"
                  id="donorBloodGroupRhesus"
                  value={this.state.donorBloodGroupRhesus}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Rh-Positive">{translate("rhPositive")}</option>
                  <option value="Rh-Negative">{translate("rhNegative")}</option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="donorSelection">
                  {translate("permission")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="donorSelection"
                  value={this.state.donorSelection}
                  id="donorSelection"
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Selected">{translate("selected")}</option>
                  <option value="Rejected">{translate("rejected")}</option>
                </select>
              </div>
            </div>
            {sessionStorage.getItem("donorPhysicalSuitabilityId") ? (
              <div className="row form-group">
                <div className="col-4"></div>
                <div className="col-3 m-1 p-1 float-right text-right">
                  <input
                    type="submit"
                    className="form-control btn btn-success m-1 p-1"
                    value={translate("commonUpdate")}
                  />
                </div>
                <div className="col-3 m-1 p-1 float-right text-right">
                  <input
                    type="cancel"
                    className="form-control btn btn-danger m-1"
                    onClick={() => {
                      history.push("/donorPhysicalSuitability/test/list");
                      
                      sessionStorage.removeItem("bloodId");
                      sessionStorage.removeItem("donorPhysicalSuitabilityId");
                    }}
                    value={translate("commonCancel")}
                  />
                </div>
              </div>
            ) : (
              <div className="row form-group">
                <div className="col-4"></div>
                <div className="col-3 m-1 p-1 float-right text-right">
                  <input
                    type="submit"
                    className="form-control btn btn-success m-1 p-1"
                    value={translate("commonSave")}
                  />
                </div>
                <div className="col-3 m-1 p-1 float-right text-right">
                  <input
                    type="reset"
                    className="form-control btn btn-danger m-1 p-1"
                    value={translate("commonReset")}
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default AddPhysicalSuitabilityTest;
