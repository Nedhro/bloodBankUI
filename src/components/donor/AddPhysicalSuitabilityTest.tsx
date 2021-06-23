import React from "react";
import DonorService from "../../services/DonorService";
import { history } from "../custom/history";

interface PhysicalSuitabilityProps {
  translate: (key: string) => string;
}
class AddPhysicalSuitabilityTest extends React.Component<
  PhysicalSuitabilityProps,
  any
> {
  dataConfig: any = {};
  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem("id");
    if (id) {
      this.dataConfig = {
        donorPhysicalSuitabilityId: id,
        bloodDonorId: this.state.bloodDonorId,
        donorHemoglobin: this.state.donorHemoglobin,
        donorWeight: this.state.donorWeight,
        donorBloodPressure: this.state.donorBloodPressure,
        donorPulseRate: this.state.donorPulseRate,
        donorTemperature: this.state.donorTemperature,
        donorBloodGroup: this.state.donorBloodGroup,
        donorBloodGroupRhesus: this.state.donorBloodGroupRhesus,
        donorSelection: this.state.donorSelection,
      };
    } else {
      this.dataConfig = {
        bloodDonorId: this.state.bloodDonorId,
        donorHemoglobin: this.state.donorHemoglobin,
        donorWeight: this.state.donorWeight,
        donorBloodPressure: this.state.donorBloodPressure,
        donorPulseRate: this.state.donorPulseRate,
        donorTemperature: this.state.donorTemperature,
        donorBloodGroup: this.state.donorBloodGroup,
        donorBloodGroupRhesus: this.state.donorBloodGroupRhesus,
        donorSelection: this.state.donorSelection,
      };
    }
    console.log(this.dataConfig);
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
      notification: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitPhysicalTestInfo = this.submitPhysicalTestInfo.bind(this);
  }

  componentDidMount() {
    const donorId = sessionStorage.getItem("donorId");
    this.setState({
      bloodDonorId: donorId,
    });
    const id = sessionStorage.getItem("id");
    this.getPhysicalTestInfoById(id);
  }
  getPhysicalTestInfoById(id: any) {
    DonorService.getPhysicalTestInfoById(id).then((res) => {
      const donorHemoglobin = res.data.donorHemoglobin;
      const donorWeight = res.data.donorWeight;
      const donorBloodPressure = res.data.donorBloodPressure;
      const donorPulseRate = res.data.donorPulseRate;
      const donorTemperature = res.data.donorTemperature;
      const donorBloodGroup = res.data.donorBloodGroup;
      const donorBloodGroupRhesus = res.data.donorBloodGroupRhesus;
      const donorSelection = res.data.donorSelection;
      this.setState({
        donorHemoglobin: donorHemoglobin,
        donorWeight: donorWeight,
        donorBloodPressure: donorBloodPressure,
        donorPulseRate: donorPulseRate,
        donorTemperature: donorTemperature,
        donorBloodGroup: donorBloodGroup,
        donorBloodGroupRhesus: donorBloodGroupRhesus,
        donorSelection: donorSelection,
      });
    });
  }

  submitPhysicalTestInfo(dataConfig: any) {
    DonorService.savePhysicalSuitability(dataConfig).then((res) => {
      console.log(res);
      if (res.status === 201) {
        this.setState({
          notification: "Physical Suitability Test is added successfully",
        });
        sessionStorage.removeItem("donorId");
        history.push("/donorPhysicalSuitability/test/list");
        window.location.reload();
      } else if (res.status === 202) {
        this.setState({
          notification: "Physical Suitability Test is Updated successfully",
        });
        sessionStorage.removeItem("donorId");
        sessionStorage.removeItem("id");
        history.push("/donorPhysicalSuitability/test/list");
        window.location.reload();
      } else {
        this.setState({
          notification: "Please add valid and non duplicate values",
        });
      }
    });
  }

  render() {
    const { notification, bloodDonorId } = this.state;
    const { translate } = this.props;
    return (
      <div className="container-fluid m-1 p-1">
        <h2 className="text-info text-center">{translate("physicalTest")}</h2>
        <div className="container p-1 m-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label htmlFor="bloodDonorId">{translate("donorId")}</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="number"
                  name="bloodDonorId"
                  id="bloodDonorId"
                  defaultValue={bloodDonorId}
                  readOnly
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label htmlFor="donorHemoglobin">
                  {translate("hemoglobin")}{" "}
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
                <label htmlFor="donorWeight">{translate("weight")} </label>
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
                <label htmlFor="donorBloodPressure">
                  {translate("bloodPressure")}
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="donorBloodPressure"
                  id="donorBloodPressure"
                  value={this.state.donorBloodPressure}
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label htmlFor="donorPulseRate">{translate("pulse")} </label>
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
                <label htmlFor="donorTemperature">
                  {translate("temp")} (<sup>o</sup>
                  {translate("cel")})
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
                <label htmlFor="donorBloodGroup">
                  {translate("bloodGroup")}
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodGroup"
                  id="bloodGroup"
                  value={this.state.bloodGroup}
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
                <label htmlFor="donorBloodGroupRhesus">
                  {translate("bloodGroup")} {translate("rhesus")}
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
                <label htmlFor="donorSelection">
                  {translate("permission")}
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
          </form>
          <div className="text-danger m-1 p-1">
            <p className="text-center bg-info font-weight-bold">
              {notification}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPhysicalSuitabilityTest;
