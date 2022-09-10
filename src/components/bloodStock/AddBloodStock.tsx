import React from "react";
import BloodStockService from "../../services/BloodStockService";
import { history } from "../helper/history";
import { authenticationService } from "../../services/AuthenticationService";
// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import DonorService from "../../services/DonorService";
// toast-configuration method, 
// it is compulsory method.
toast.configure();

interface BloodStockProps {
  translate: (key: string) => string;
}

class AddBloodStock extends React.Component<BloodStockProps, any> {
  dataConfig: any = {};
  currentUser: any = "";

  constructor(props: any) {
    super(props);
    this.state = {
      donorName: "",
      patientName: "",
      bloodStockTracingId: "",
      bloodDonorId: "",
      bloodStorage: "Fridge-1",
      bloodComponent: "Whole Blood",
      sourceOfBlood: "",
      bloodGroup: "",
      bloodGroupRhesus: "",
      stockStatus: "Available",
      bloodBagId: "",
      allowSave: false,
      createdBy: "",
      updatedBy: "",
      inputReadOnly: true
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.resetFormFields = this.resetFormFields.bind(this);
  }

  componentDidMount() {
    /*
    for tracking users who is creating or updating
    */
    if (authenticationService.currentUserValue !== undefined
      || authenticationService.currentUserValue !== null) {
      this.currentUser = authenticationService.currentUserValue
    }


    const id = sessionStorage.getItem("bloodStockTracingId");
    const bloodGroup = sessionStorage.getItem("bloodGroup");
    const bloodGroupRhesus = sessionStorage.getItem("bloodGroupRhesus");
    const donorId = sessionStorage.getItem("bloodDonorId");
    if (donorId) {
      DonorService.getBloodDonorById(parseInt(donorId)).then(res => {
        this.setState({
          donorName: res?.data?.donorName,
          patientName: res?.data?.patient,
        })
      });
    }
    this.setState({
      bloodGroup: bloodGroup,
      bloodGroupRhesus: bloodGroupRhesus
    });
    if (id) {
      this.getBloodStockById(parseInt(id));
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
    //if gets blood donor
    if (donorId) {
      this.setState({
        bloodDonorId: donorId,
        updatedBy: this.currentUser
      });
    }
    const bloodBagID = sessionStorage.getItem("bloodBagID");
    if (bloodBagID) {
      sessionStorage.removeItem("bloodGroup");
      sessionStorage.removeItem("bloodGroupRhesus");
      sessionStorage.removeItem("bloodDonorId");
      
      BloodStockService.getStockByBloodBagId(bloodBagID).then(res => {
        this.setState({
          bloodStockTracingId: res.data.bloodStockTracingId,
          bloodDonorId: res?.data?.bloodDonor?.donorId,
          bloodStorage: res.data.bloodStorage,
          bloodComponent: res.data.bloodComponent,
          sourceOfBlood: res.data.sourceOfBlood,
          bloodGroup: res.data.bloodGroup,
          bloodGroupRhesus: res.data.bloodGroupRhesus,
          stockStatus: res.data.stockStatus,
          bloodBagId: res.data.bloodBagId,
          allowSave: true,
        })
      });
    }
  }

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "sourceOfBlood") {
      const donorId = parseInt(this.state.bloodDonorId);
      if (event.target.value === "NITOR") {
        if (donorId) {
          BloodStockService.getNextBloodBagId(event.target.value).then(res => {
            const nextBloodBagId = res.data;
            this.setState({
              bloodBagId: nextBloodBagId,
              stockStatus: "Available",
              allowSave: true,
              inputReadOnly: true
            });
          });
        } else {
          toast.warn("Donor Id is not available. Blood Source is not valid", { position: toast.POSITION.BOTTOM_RIGHT });
          this.setState({
            sourceOfBlood: "",
            stockStatus: "Not Available",
            bloodBagId: "",
            allowSave: false,
            inputReadOnly: true
          });
        }
      } else if (event.target.value === "Outdoor Campaign") {
        BloodStockService.getNextBloodBagId(event.target.value).then(res => {
          const nextBloodBagId = res.data;
          this.setState({
            bloodBagId: nextBloodBagId,
            stockStatus: "Available",
            allowSave: true,
            inputReadOnly: true
          });
        });
      } else if (event.target.value === "Outsource" || "Private Blood Bank" || "Voluntary Organization" || "Other Govt. Hospital") {
        this.setState({
          bloodBagId: "",
          stockStatus: "Available",
          allowSave: true,
          inputReadOnly: false
        });
      } else {
        this.setState({
          bloodBagId: "",
          stockStatus: "Not Available",
          allowSave: false,
        });
      }

    }
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem("bloodStockTracingId") || this.state.bloodStockTracingId;
    const donorId = parseInt(this.state?.bloodDonorId);
    const user = this.currentUser;
    if (id) {
      this.dataConfig = {
        bloodStockTracingId: parseInt(id),
        bloodDonor: {
          donorId: donorId,
        },
        bloodStorage: this.state.bloodStorage,
        bloodComponent: this.state.bloodComponent,
        sourceOfBlood: this.state.sourceOfBlood,
        bloodGroup: this.state.bloodGroup,
        bloodGroupRhesus: this.state.bloodGroupRhesus,
        stockStatus: this.state.stockStatus,
        bloodBagId: this.state.bloodBagId,
        createdBy: user,
        updatedBy: user
      };
    } else if (donorId) {
      this.dataConfig = {
        bloodDonor: {
          donorId: donorId,
        },
        bloodStorage: this.state.bloodStorage,
        bloodComponent: this.state.bloodComponent,
        sourceOfBlood: this.state.sourceOfBlood,
        bloodGroup: this.state.bloodGroup,
        bloodGroupRhesus: this.state.bloodGroupRhesus,
        stockStatus: this.state.stockStatus,
        bloodBagId: this.state.bloodBagId,
        createdBy: user,
        updatedBy: user
      };
    } else {
      this.dataConfig = {
        bloodStorage: this.state.bloodStorage,
        bloodComponent: this.state.bloodComponent,
        sourceOfBlood: this.state.sourceOfBlood,
        bloodGroup: this.state.bloodGroup,
        bloodGroupRhesus: this.state.bloodGroupRhesus,
        stockStatus: this.state.stockStatus,
        bloodBagId: this.state.bloodBagId,
        createdBy: user,
        updatedBy: user
      };
    }
    this.saveBloodStock(this.dataConfig);
    sessionStorage.removeItem("bloodStockTracingId");
    sessionStorage.removeItem("bloodGroup");
    sessionStorage.removeItem("bloodGroupRhesus");
    sessionStorage.removeItem("bloodDonorId");
    sessionStorage.removeItem("bloodBagID");
    //target value reset
    event.target.reset();
  };

  resetFormFields = () => {
    this.setState({
      bloodStockTracingId: "",
      bloodDonorId: "",
      bloodStorage: "",
      bloodComponent: "",
      sourceOfBlood: "",
      bloodGroup: "",
      bloodGroupRhesus: "",
      stockStatus: "",
      bloodBagId: "",
      allowSave: false,
      inputReadOnly: true
    });
  }

  saveBloodStock(data: any) {
    BloodStockService.saveBloodStock(data).then((res) => {
      if (res.status === 201) {
        toast.success("Blood Stock has been saved successfully", { position: toast.POSITION.BOTTOM_RIGHT });
        history.push("/blood/stock/list");

      } else if (res.status === 202) {
        toast.success("Blood Stock has been updated successfully", { position: toast.POSITION.BOTTOM_RIGHT });
        history.push("/blood/stock/list");

      } else {
        toast.error("Please enter valid data", { position: toast.POSITION.BOTTOM_RIGHT });
      }
    });
  }

  getBloodStockById(id: number) {
    BloodStockService.getBloodStockById(id).then((res) => {
      if (res.data.stockStatus === "Available") {
        this.setState({
          allowSave: true,
        });
      }
      this.setState({
        bloodDonorId: res?.data?.bloodDonor?.donorId,
        bloodStorage: res.data.bloodStorage,
        bloodComponent: res.data.bloodComponent,
        sourceOfBlood: res.data.sourceOfBlood,
        bloodGroup: res.data.bloodGroup,
        bloodGroupRhesus: res.data.bloodGroupRhesus,
        stockStatus: res.data.stockStatus,
        bloodBagId: res.data.bloodBagId,
      });
      DonorService.getBloodDonorById(parseInt(res?.data?.bloodDonor?.donorId,)).then(res => {
        this.setState({
          donorName: res?.data?.donorName,
          patientName: res?.data?.patient,
        })
      });
    });
  }

  render() {
    const { allowSave } = this.state;
    const { translate } = this.props;
    return (
      <div className="container-fluid m-1 p-1">
        <h2 className="text-info text-center">
          {sessionStorage.getItem("bloodStockTracingId")
            ? translate("editBloodHeader")
            : translate("collectBlood")}
        </h2>
        <div className="container p-1">
          <form
            className="form"
            onSubmit={this.submitHandler}
            onReset={this.resetFormFields}
          >
            {/* <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodDonorId">
                  {translate("donorId")}
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="bloodDonorId"
                  id="bloodDonorId"
                  value={this.state?.bloodDonorId}
                  readOnly
                  onChange={this.changeHandler}
                />
              </div>
            </div> */}
            <div style={{ display: this.state?.donorName === '' ? 'none' : '' }}  className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="donorName">
                 Donor Name
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  value={this.state?.donorName}
                  readOnly
                />
              </div>
            </div>
            <div style={{ display: this.state?.patientName === '' ? 'none' : '' }} className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="patientName">
                  Patient Name
                </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  value={this.state?.patientName}
                  readOnly
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodGroup">
                  {translate("bloodGroup")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodGroup"
                  id="bloodGroup"
                  value={this.state.bloodGroup || ""}
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
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodGroupRhesus">
                  {translate("bloodGroupRhesus")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodGroupRhesus"
                  id="bloodGroupRhesus"
                  value={this.state.bloodGroupRhesus || ""}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="+ve(Positive)">
                    {translate("rhPositive")}
                  </option>
                  <option value="-ve(Negative)">
                    {translate("rhNegative")}
                  </option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="sourceOfBlood">
                  {translate("sourceOfBlood")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-4">
                <select
                  className="form-control"
                  name="sourceOfBlood"
                  id="sourceOfBlood"
                  value={this.state.sourceOfBlood}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="NITOR">NITOR</option>
                  <option value="Outdoor Campaign">Outdoor Campaign</option>
                  <option value="Outsource">Outsource</option>
                  <option value="Private Blood Bank">Private Blood Bank</option>
                  <option value="Voluntary Organization">Voluntary Organization</option>
                  <option value="Other Govt. Hospital">Other Govt. Hospital</option>
                </select>
              </div>
              <div className="col-4">
                <input
                  className="form-control"
                  type="text"
                  name="bloodBagId"
                  id="bloodBagId"
                  placeholder={translate("bloodBagId")}
                  value={this.state?.bloodBagId}
                  required
                  readOnly={this.state.inputReadOnly}
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="stockStatus">
                  {translate("stockStatus")}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="stockStatus"
                  id="stockStatus"
                  value={this.state.stockStatus}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Available">{translate("available")}</option>
                  <option value="Not Available">
                    {translate("Not Available")}
                  </option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodStorage">
                  {translate("bloodStorage")}
                </label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodStorage"
                  id="bloodStorage"
                  value={this.state.bloodStorage}
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Fridge-1">{translate("fridge1")}</option>
                  <option value="Fridge-2">{translate("fridge2")}</option>
                  <option value="Fridge-3">{translate("fridge3")}</option>
                  <option value="Fridge-4">{translate("fridge4")}</option>
                  <option value="Discard-Fridge">
                    {translate("discardFridge")}
                  </option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodComponent">
                  {translate("bloodComponent")}
                </label>
              </div>

              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodComponent"
                  id="bloodComponent"
                  value={this.state.bloodComponent}
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Whole Blood">Whole Blood</option>
                  <option value="RCC">RCC</option>
                  <option value="FFP">FFP</option>
                  <option value="Platelet">Platelet</option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right"></div>
              <div className="col-8 float-right text-right ">
                {sessionStorage.getItem("bloodStockTracingId") ? (
                  <>
                    {" "}
                    <input
                      type="submit"
                      disabled={!allowSave}
                      className="btn btn-success m-1"
                      value={translate("commonUpdate")}
                    />
                    <input
                      type="cancel"
                      className="btn btn-danger m-1"
                      onClick={() => {
                        history.push("/blood/stock/list");

                        sessionStorage.removeItem("bloodStockTracingId");
                        sessionStorage.removeItem("bloodDonorId");
                        sessionStorage.removeItem("bloodGroup");
                      }}
                      value={translate("commonCancel")}
                    />
                  </>
                ) : (
                  <>
                    <div className="mb-5">
                        <input
                          type="submit"
                          disabled={!allowSave}
                          className="btn btn-success m-1"
                          value={translate("commonSave")}
                        />
                        <input
                          type="reset"
                          className="btn btn-danger m-1"
                          value={translate("commonReset")}
                        />
                    </div>
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

export default AddBloodStock;
