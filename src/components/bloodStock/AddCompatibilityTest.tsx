import React from "react";
import BloodStockService from "../../services/BloodStockService";
import DonorService from "../../services/DonorService";
import { history } from "../custom/history";

interface CompatibilityProps {
  translate: (key: string) => string;
}
class AddCompatibilityTest extends React.Component<CompatibilityProps, any> {
  dataConfig: any = {};
  constructor(props: any) {
    super(props);
    this.state = {
      bloodCompatibilityId: "",
      bloodBagId: "",
      patient: "",
      bloodScreening: "",
      bloodGrouping: "",
      bloodCrossMatching: "",
      bloodHivTest: "",
      bloodHbvTest: "",
      bloodHcvTest: "",
      bloodSyphilisTest: "",
      bloodMalariaTest: "",
      notification: "",
      selectOptions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    const bloodBagId = sessionStorage.getItem("bloodBagId");
    const donorId = sessionStorage.getItem("donorId");
    if (donorId) {
      this.getPatientFromDonorId(donorId);
    }
    const id = sessionStorage.getItem("bloodCompatibilityId");
    if (id) {
      this.getCompatibilityTestById(id);
    }
    this.setState({
      bloodBagId: bloodBagId,
    });
    this.getPatientList();
  }

  async getPatientList() {
    DonorService.getAllActivePatients().then((res) => {
      const result = res.data;
      const options = result.map((d: any) => ({
        value: d.identifier,
        label: d.name + " (" + d.identifier + ")",
      }));
      this.setState({ selectOptions: options });
    });
  }

  getPatientFromDonorId(id: any) {
    DonorService.getBloodDonorById(parseInt(id)).then((res) => {
      if (res.data.patient !== "") {
        this.setState({ patient: res.data.patient });
      } else {
        this.setState({ patient: this.state.patient });
      }
    });
  }

  handleChange(e: any) {
    this.setState({ patient: e.target.value });
  }

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem("bloodCompatibilityId");
    if (id) {
      this.dataConfig = {
        bloodCompatibilityId: id,
        bloodBagId: this.state.bloodBagId,
        patient: this.state.patient,
        bloodScreening: this.state.bloodScreening,
        bloodGrouping: this.state.bloodGrouping,
        bloodCrossMatching: this.state.bloodCrossMatching,
        bloodHivTest: this.state.bloodHivTest,
        bloodHbvTest: this.state.bloodHbvTest,
        bloodHcvTest: this.state.bloodHcvTest,
        bloodSyphilisTest: this.state.bloodSyphilisTest,
        bloodMalariaTest: this.state.bloodMalariaTest,
      };
    } else {
      this.dataConfig = {
        bloodBagId: this.state.bloodBagId,
        patient: this.state.patient,
        bloodScreening: this.state.bloodScreening,
        bloodGrouping: this.state.bloodGrouping,
        bloodCrossMatching: this.state.bloodCrossMatching,
        bloodHivTest: this.state.bloodHivTest,
        bloodHbvTest: this.state.bloodHbvTest,
        bloodHcvTest: this.state.bloodHcvTest,
        bloodSyphilisTest: this.state.bloodSyphilisTest,
        bloodMalariaTest: this.state.bloodMalariaTest,
      };
    }
    this.saveCompatiabilityTest(this.dataConfig);
    sessionStorage.removeItem("bloodCompatibilityId");
    sessionStorage.removeItem("bloodBagId");
    sessionStorage.removeItem("donorId");
  };

  saveCompatiabilityTest(data: any) {
    BloodStockService.saveCompatibilityTest(data).then((res) => {
      console.log(res);
      if (res.status === 201) {
        this.setState({
          notification: "Blood Compatibility Test has been saved successfully",
        });
        history.push("/blood/compatibility/test/list");
        window.location.reload();
      } else if (res.status === 202) {
        this.setState({
          notification:
            "Blood Compatibility Test has been updated successfully",
        });
        history.push("/blood/compatibility/test/list");
        window.location.reload();
      } else {
        this.setState({
          notification: "Please enter valid data",
        });
      }
    });
  }

  getCompatibilityTestById(id: any) {
    BloodStockService.getCompatibilityTestById(parseInt(id)).then((res) => {
      console.log(res);
      this.setState({
        bloodBagId: res.data.bloodBagId,
        patient: res.data.patient,
        bloodScreening: res.data.bloodScreening,
        bloodGrouping: res.data.bloodGrouping,
        bloodCrossMatching: res.data.bloodCrossMatching,
        bloodHivTest: res.data.bloodHivTest,
        bloodHbvTest: res.data.bloodHbvTest,
        bloodHcvTest: res.data.bloodHcvTest,
        bloodSyphilisTest: res.data.bloodSyphilisTest,
        bloodMalariaTest: res.data.bloodMalariaTest,
      });
    });
  }
  render() {
    const { translate } = this.props;
    const { notification } = this.state;
    return (
      <div className="container-fluid m-1 p-1">
        <h2 className="text-info text-center">
          {
            sessionStorage.getItem("bloodCompatibilityId") ? <> <h2 className="text-info text-center">
              {translate("editCompatibilityHeader")}
            </h2>
            </>
              : <>
                <h2 className="text-info text-center">
                  {translate("compatibilityTest")}
                </h2>
              </>
          }
        </h2>
        <div className="container p-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodBagId">{translate("bloodBagId")}<span className="text-danger">*</span>:</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="bloodBagId"
                  id="bloodBagId"
                  value={this.state.bloodBagId}
                  readOnly
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="patient">{translate("patient")}</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="patient"
                  id="patient"
                  value={this.state.patient}
                  onChange={this.handleChange}
                >
                  <option value="" disabled>
                    {translate("commonSelect")}
                  </option>
                  {this.state.selectOptions.map((e: any, key: any) => {
                    return (
                      <option key={key} value={e.value}>
                        {e.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodScreening">
                  {translate("bloodScreening")}<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodScreening"
                  id="bloodScreening"
                  value={this.state.bloodScreening}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Compatible">{translate("compatible")}</option>
                  <option value="NonCompatible">
                    {translate("nonCompatible")}
                  </option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodGrouping">
                  {translate("bloodGrouping")}<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodGrouping"
                  id="bloodGrouping"
                  value={this.state.bloodGrouping}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Compatible">{translate("compatible")}</option>
                  <option value="NonCompatible">
                    {translate("nonCompatible")}
                  </option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodCrossMatching">
                  {translate("bloodCrossMatching")}<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodCrossMatching"
                  id="bloodCrossMatching"
                  value={this.state.bloodCrossMatching}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Compatible">{translate("compatible")}</option>
                  <option value="NonCompatible">
                    {translate("nonCompatible")}
                  </option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodHivTest">
                  {translate("bloodHivTest")}<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodHivTest"
                  id="bloodHivTest"
                  value={this.state.bloodHivTest}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Positive">{translate("positive")}</option>
                  <option value="Negative">{translate("negative")}</option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodHbvTest">
                  {translate("bloodHbvTest")}<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodHbvTest"
                  id="bloodHbvTest"
                  value={this.state.bloodHbvTest}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Positive">{translate("positive")}</option>
                  <option value="Negative">{translate("negative")}</option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodHcvTest">
                  {translate("bloodHcvTest")}<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodHcvTest"
                  id="bloodHcvTest"
                  value={this.state.bloodHcvTest}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Positive">{translate("positive")}</option>
                  <option value="Negative">{translate("negative")}</option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodSyphilisTest">
                  {translate("bloodSyphilisTest")}<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodSyphilisTest"
                  id="bloodSyphilisTest"
                  value={this.state.bloodSyphilisTest}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Positive">{translate("positive")}</option>
                  <option value="Negative">{translate("negative")}</option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodMalariaTest">
                  {translate("bloodMalariaTest")}<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodMalariaTest"
                  id="bloodMalariaTest"
                  value={this.state.bloodMalariaTest}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Positive">{translate("positive")}</option>
                  <option value="Negative">{translate("negative")}</option>
                </select>
              </div>
            </div>

            <div className="row pb-5 form-group">
              <div className="col-4 text-right"></div>
              <div className="col-8 float-right text-right ">
                {
                  sessionStorage.getItem("bloodCompatibilityId") ? <> <input
                    type="submit"
                    className="btn btn-success m-1"
                    value={translate("commonUpdate")}
                  />
                    <input
                      type="cancel"
                      className="btn btn-danger m-1"
                      onClick={() => {
                        history.push("/blood/compatibility/test/list");
                        window.location.reload();
                        sessionStorage.removeItem("bloodCompatibilityId");
                        sessionStorage.removeItem("bloodBagId");
                      }}
                      value={translate("commonCancel")}
                    />
                  </>
                    : <>
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
                }
              </div>
            </div>
          </form>
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

export default AddCompatibilityTest;
