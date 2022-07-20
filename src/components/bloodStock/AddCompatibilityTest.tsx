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
class AddCompatibilityTest extends React.Component<CompatibilityProps, any> {
  dataConfig: any = {};
  currentUser: any;

  constructor(props: any) {
    super(props);
    this.state = {
      bloodCompatibilityId: "",
      bloodBagId: "",
      bloodBagGroup: "",
      bloodGroupRhesus: "",
      patient: "",
      patientBloodGroup: "",
      patientBloodGroupRhesus: "",
      bloodGrouping: "",
      atRoomTemp: "",
      at37ByICT: "Not Done",
      coombsTest: "Not Done",
      bloodHivTest: "",
      bloodHbvTest: "",
      bloodHcvTest: "",
      bloodSyphilisTest: "",
      bloodMalariaTest: "",
      createdBy: "",
      updatedBy: "",
      patientName: null,
      patientId: null,
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

    const donorId = sessionStorage.getItem("donorId");
    if (donorId) {
      DonorService.getBloodDonorById(parseInt(donorId)).then((res) => {
        if (res?.data?.patient) {
          BloodStockService.getPatientBloodGroupById(res.data.patientId).then((res) => {
            const result = res.data;
            this.setState({
              patientBloodGroup: result.patientBloodGroup,
              patientBloodGroupRhesus: result.patientBloodGroupRhesus,
            })
          });
          this.setState({ patientId: res.data.patientId, patientName: res.data.patient });
        }
      });
    }

    const id = sessionStorage.getItem("bloodCompatibilityId");
    if (id) {
      this.getCompatibilityTestById(parseInt(id));
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

    const bloodBagId = sessionStorage.getItem("bloodBagId");
    if (bloodBagId) {
      BloodStockService.getStockByBloodBagId(bloodBagId).then((res: any) => {
        this.setState({
          bloodBagGroup: res.data.bloodGroup,
          bloodGroupRhesus: res.data.bloodGroupRhesus,
          bloodBagId: bloodBagId,
        });
      });
    }
  }

  handleInputChange = (typedOption: any) => {
    DonorService.getAllActivePatients(typedOption).then((res) => {
      const result = res.data;

      if (result.length > 0) {
        const options = result?.map((d: any) => ({
          value: d.patient_id,
          label: d.name,
        }));
        this.setState({ selectOptions: options });
        this.setState(
          { showOptions: true, }
        )
      }
    });
  }
  handleChange(selectedOption: any) {
    if (selectedOption !== null) {
      BloodStockService.getPatientBloodGroupById(selectedOption.value).then((res) => {
        const result = res.data;
        if (res.data !== "") {
          this.setState({
            patientBloodGroup: result.patientBloodGroup,
            patientBloodGroupRhesus: result.patientBloodGroupRhesus,
          })
        }
        else {
          this.setState({
            patientBloodGroup: "",
            patientBloodGroupRhesus: "",
            showOptions: false
          })
        }
      });
      this.setState({ showOptions: false, patientId: selectedOption.value, patientName: selectedOption.label });
    }

  }

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "patientBloodGroup") {
      if (this.state.bloodBagGroup === event.target.value) {
        this.setState({
          bloodGrouping: "Compatible",
        });
      } else {
        this.setState({
          bloodGrouping: "Non-Compatible",
        });
      }
    }
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    if (this.state.bloodCompatibilityId) {
      this.dataConfig = {
        bloodCompatibilityId: this.state.bloodCompatibilityId,
        bloodBagId: this.state.bloodBagId,
        patientId: this.state.patientId,
        patient: this.state.patientName,
        patientBloodGroup: this.state.patientBloodGroup,
        patientBloodGroupRhesus: this.state.patientBloodGroupRhesus,
        bloodGrouping: this.state.bloodGrouping,
        atRoomTemp: this.state.atRoomTemp,
        at37ByICT: this.state.at37ByICT,
        coombsTest: this.state.coombsTest,
        bloodHivTest: this.state.bloodHivTest,
        bloodHbvTest: this.state.bloodHbvTest,
        bloodHcvTest: this.state.bloodHcvTest,
        bloodSyphilisTest: this.state.bloodSyphilisTest,
        bloodMalariaTest: this.state.bloodMalariaTest,
        updatedBy: this.state.updatedBy
      }
    } else {
      this.dataConfig = {
        bloodBagId: this.state.bloodBagId,
        patient: this.state.patientName,
        patientId: this.state.patientId,
        patientBloodGroup: this.state.patientBloodGroup,
        patientBloodGroupRhesus: this.state.patientBloodGroupRhesus,
        bloodGrouping: this.state.bloodGrouping,
        atRoomTemp: this.state.atRoomTemp,
        at37ByICT: this.state.at37ByICT,
        coombsTest: this.state.coombsTest,
        bloodHivTest: this.state.bloodHivTest,
        bloodHbvTest: this.state.bloodHbvTest,
        bloodHcvTest: this.state.bloodHcvTest,
        bloodSyphilisTest: this.state.bloodSyphilisTest,
        bloodMalariaTest: this.state.bloodMalariaTest,
        createdBy: this.state.createdBy
      }
    }
    this.saveCompatiabilityTest(this.dataConfig);
    sessionStorage.removeItem("bloodCompatibilityId");
    sessionStorage.removeItem("bloodBagId");
    sessionStorage.removeItem("donorId");
  };

  saveCompatiabilityTest(data: any) {
    BloodStockService.saveCompatibilityTest(data).then((res) => {
      if (res.status === 201) {
        toast.success("Blood Compatibility Test has been saved successfully", { position: toast.POSITION.BOTTOM_RIGHT });
        history.push("/blood/compatibility/test/list");
      } else if (res.status === 202) {
        toast.success("Blood Compatibility Test has been updated successfully", { position: toast.POSITION.BOTTOM_RIGHT });
        history.push("/blood/compatibility/test/list");
      } else {
        toast.error("Please enter valid data", { position: toast.POSITION.BOTTOM_RIGHT });
      }
    });
  }

  getCompatibilityTestById(id: number) {
    BloodStockService.getCompatibilityTestById(id).then((res) => {
      BloodStockService.getStockByBloodBagId(res.data.bloodBagId).then(
        (res: any) => {
          this.setState({
            bloodBagGroup: res.data.bloodGroup,
            bloodGroupRhesus: res.data.bloodGroupRhesus,
            bloodBagId: res.data.bloodBagId,
          });
        }
      );
      this.setState({
        bloodCompatibilityId: res.data.bloodCompatibilityId,
        bloodBagId: res.data.bloodBagId,
        patient: res.data.patient,
        patientBloodGroup: res.data.patientBloodGroup,
        patientBloodGroupRhesus: res.data.patientBloodGroupRhesus,
        bloodGrouping: res.data.bloodGrouping,
        atRoomTemp: res.data.atRoomTemp,
        at37ByICT: res.data.at37ByICT,
        coombsTest: res.data.coombsTest,
        bloodHivTest: res.data.bloodHivTest,
        bloodHbvTest: res.data.bloodHbvTest,
        bloodHcvTest: res.data.bloodHcvTest,
        bloodSyphilisTest: res.data.bloodSyphilisTest,
        bloodMalariaTest: res.data.bloodMalariaTest,
      });
      if (res?.data?.patient) {

        this.setState({
          patientName: res?.data?.patient,
          patientId: res?.data?.patientId,
        });
      }
    });
  }
  render() {
    const { translate } = this.props;
    const { patientName } = this.state;
    return (
      <div className="container-fluid m-1 p-1">
        <h2 className="text-info text-center">
          {sessionStorage.getItem("bloodCompatibilityId") ? (
            <>
              {" "}
              <h2 className="text-info text-center">
                {translate("editCompatibilityHeader")}
              </h2>
            </>
          ) : (
            <>
              <h2 className="text-info text-center">
                {translate("compatibilityTest")}
              </h2>
            </>
          )}
        </h2>
        <div className="container">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row form-group mb-3">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodBagId">
                  {translate("bloodBagId")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-4">
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

            <div className="row form-group mt-0 mb-0 pb-0">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodBagGroup">
                  {translate("bloodBagGroup")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  style={{ width: "200px" }}
                  className="form-control"
                  name="bloodBagGroup"
                  id="bloodBagGroup"
                  readOnly
                  required
                  defaultValue={this.state.bloodBagGroup}
                />
              </div>

              <div className="col-4">
                <div className="row form-group">
                  <div className="col-4 pl-2 pr-1">
                    <label className="font-weight-bold" htmlFor="bloodGroupRhesus">
                      {translate("bloodGroupRhesus")}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-8 pl-3 pr-3 mt-0">
                    <input
                      type="text"
                      style={{ width: "200px" }}
                      className="form-control"
                      name="bloodGroupRhesus"
                      id="bloodGroupRhesus"
                      readOnly
                      required
                      defaultValue={this.state.bloodGroupRhesus}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row form-group mt-0 mb-0 pb-0">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="patient">
                  {translate("patient")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-4">
                {!patientName && (
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
                {patientName && (
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

              <div className="col-4">
                <div className="row form-group">
                  <div className="col-4 pl-2 pr-1">
                    <label
                      className="font-weight-bold"
                      htmlFor="patientBloodGroup"
                    >
                      {translate("patientBloodGroup")}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-8 pl-3 pr-3 mt-0">
                    <select
                      style={{ width: "200px" }}
                      className="form-control pl-1"
                      name="patientBloodGroup"
                      id="patientBloodGroup"
                      value={this.state.patientBloodGroup}
                      required
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
                  <span className="text-danger">*</span>
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
                      required
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
                  <span className="text-danger">*</span>
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
                  <span className="text-danger">*</span>
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
                  <span className="text-danger">*</span>
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
                  <span className="text-danger">*</span>
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
                  <span className="text-danger">*</span>
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
                  <span className="text-danger">*</span>
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
                  <option value="Reactive">{translate("reactive")}</option>
                  <option value="Non-Reactive">
                    {translate("Non-Reactive")}
                  </option>
                </select>
              </div>
            </div>

            <div className="row form-group mt-5 mb-0">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="resultOfCrossMatching">
                  {translate("resultOfCrossMatching")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8 text-left">
                <p className="ml-0">(Combined result of the following tests)</p>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label
                  className="font-weight-bold"
                  htmlFor="atRoomTemp"
                >
                  {translate("atRoomTemp")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="atRoomTemp"
                  id="atRoomTemp"
                  value={this.state.atRoomTemp}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Compatible">{translate("compatible")}</option>
                  <option value="Non-Compatible">
                    {translate("Non-Compatible")}
                  </option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label
                  className="font-weight-bold"
                  htmlFor="at37ByICT"
                >
                  {translate("at37ByICT")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="at37ByICT"
                  id="at37ByICT"
                  value={this.state.at37ByICT}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Not Done">{translate("Not Done")}</option>
                  <option value="Compatible">{translate("compatible")}</option>
                  <option value="Non-Compatible">
                    {translate("Non-Compatible")}
                  </option>
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label
                  className="font-weight-bold"
                  htmlFor="coombsTest"
                >
                  {translate("coombsTest")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="coombsTest"
                  id="coombsTest"
                  value={this.state.coombsTest}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Not Done">{translate("Not Done")}</option>
                  <option value="Compatible">{translate("compatible")}</option>
                  <option value="Non-Compatible">
                    {translate("Non-Compatible")}
                  </option>
                </select>
              </div>
            </div>

            <div className="row pb-5 form-group">
              <div className="col-4 text-right"></div>
              <div className="col-8 float-right text-right ">
                {sessionStorage.getItem("bloodCompatibilityId") ? (
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
                        history.push("/blood/compatibility/test/list");

                        sessionStorage.removeItem("bloodCompatibilityId");
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

export default AddCompatibilityTest;
