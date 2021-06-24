import React from "react";
import BloodStockService from "../../services/BloodStockService";
import { history } from "../custom/history";

interface BloodStockProps {
  translate: (key: string) => string;
}

class AddBloodStock extends React.Component<BloodStockProps, any> {
  dataConfig: any = {};

  constructor(props: any) {
    super(props);
    this.state = {
      bloodStockTracingId: "",
      bloodDonorId: "",
      bloodStorage: "",
      sourceOfBlood: "",
      bloodGroup: "",
      stockStatus: "",
      bloodBagId: "",
      notification: "",
      allowSave: false
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    const id = sessionStorage.getItem("bloodStockTracingId");
    const donorId = sessionStorage.getItem("donorId");
    const bloodGroup = sessionStorage.getItem("bloodGroup");
    console.log(donorId);
    this.setState({
      bloodDonorId: donorId,
      bloodGroup: bloodGroup,
    });
    if(id !== null){
      this.getBloodStockById(id);
    }
    console.log(this.state);
  }

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "sourceOfBlood") {
      const donorId = parseInt(this.state.bloodDonorId);
      const randomstring = Math.random().toString(10).slice(-4);
      console.log(randomstring);
      if (event.target.value === "NITOR") {
        if(donorId){
          this.setState({
            bloodBagId: "NITOR-" + donorId,
            stockStatus: "Available",
            allowSave: true
          });
        }else{
          alert("Donor Id is not available. Blood Source is not valid");
          this.setState({
            stockStatus: "NotAvailable",
            allowSave: false
          });
        }
      } else if (event.target.value === "OutdoorCampaign") {
        this.setState({
          bloodBagId: "Campaign-" + randomstring,
          stockStatus: "Available",
          allowSave: true
        });
      } else if (event.target.value === "Outsource") {
        this.setState({
          bloodBagId: "Outsource-" + randomstring,
          stockStatus: "Available",
          allowSave: true
        });
      } else {
        this.setState({
          bloodBagId: "",
          stockStatus: "NotAvailable",
          allowSave: false
        });
      }
    }
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem("bloodStockTracingId");
    if (id) {
      this.dataConfig = {
        bloodStockTracingId: id,
        bloodDonorId: parseInt(this.state.bloodDonorId),
        bloodStorage: this.state.bloodStorage,
        sourceOfBlood: this.state.sourceOfBlood,
        bloodGroup: this.state.bloodGroup,
        stockStatus: this.state.stockStatus,
        bloodBagId: this.state.bloodBagId,
      };
    } else {
      this.dataConfig = {
        bloodDonorId: parseInt(this.state.bloodDonorId),
        bloodStorage: this.state.bloodStorage,
        sourceOfBlood: this.state.sourceOfBlood,
        bloodGroup: this.state.bloodGroup,
        stockStatus: this.state.stockStatus,
        bloodBagId: this.state.bloodBagId,
      };
    }
    console.log(this.dataConfig);
    this.saveBloodStock(this.dataConfig);
    sessionStorage.removeItem("bloodStockTracingId");
    sessionStorage.removeItem("bloodDonorId");
    sessionStorage.removeItem("bloodGroup");
  };

  saveBloodStock(data: any) {
    BloodStockService.saveBloodStock(data).then((res) => {
      console.log(res);
      if (res.status === 201) {
        this.setState({
          notification: "Blood Stock has been saved successfully",
        });
        history.push("/blood/stock/list");
        window.location.reload();
      } else if (res.status === 202) {
        this.setState({
          notification: "Blood Stock has been updated successfully",
        });
        history.push("/blood/stock/list");
        window.location.reload();
      } else {
        this.setState({
          notification: "Please enter valid data",
        });
      }
    });
    sessionStorage.removeItem("bloodStockTracingId");
    sessionStorage.removeItem("bloodDonorId");
    sessionStorage.removeItem("bloodGroup");
    sessionStorage.removeItem("donorId");
    
  }

  getBloodStockById(id: any){
      BloodStockService.getBloodStockById(parseInt(id)).then(res=>{
          console.log(res);
          this.setState({
            bloodDonorId: res.data.bloodDonorId,
            bloodStorage: res.data.bloodStorage,
            sourceOfBlood: res.data.sourceOfBlood,
            bloodGroup: res.data.bloodGroup,
            stockStatus: res.data.stockStatus,
            bloodBagId: res.data.bloodBagId,
          })
      });
  }

  render() {
    const { notification, allowSave } = this.state;
    const { translate } = this.props;
    return (
      <div className="container-fluid m-1 p-1">
        {
          sessionStorage.getItem("bloodStockTracingId") ? <> <h2 className="text-info text-center">
            {translate("editBloodHeader")}
          </h2>
          </>
            : <>
              <h2 className="text-info text-center">
                {translate("stockBlood")}
              </h2>
            </>
        }
        <div className="container p-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodDonorId">{translate("donorId")}</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="bloodDonorId"
                  id="bloodDonorId"
                  value={this.state.bloodDonorId}
                  readOnly
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodGroup">{translate("bloodGroup")}<span className="text-danger">*</span></label>
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
                <label className="font-weight-bold" htmlFor="sourceOfBlood">{translate("sourceOfBlood")}<span className="text-danger">*</span></label>
              </div>
              <div className="col-8">
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
                  <option value="OutdoorCampaign">Outdoor Campaign</option>
                  <option value="Outsource">Outsource</option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodBagId">{translate("bloodBagId")}<span className="text-danger">*</span></label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="bloodBagId"
                  id="bloodBagId"
                  value={this.state.bloodBagId}
                  required
                  readOnly
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="stockStatus">{translate("stockStatus")}<span className="text-danger">*</span></label>
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
                  <option value="NotAvailable">{translate("notAvailable")}</option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="bloodStorage">{translate("bloodStorage")}<span className="text-danger">*</span></label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="bloodStorage"
                  id="bloodStorage"
                  value={this.state.bloodStorage}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Fridge-1">{translate("fridge1")}</option>
                  <option value="Fridge-2">{translate("fridge2")}</option>
                  <option value="Fridge-3">{translate("fridge3")}</option>
                  <option value="Fridge-4">{translate("fridge4")}</option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right"></div>
              <div className="col-8 float-right text-right ">
                {
                  sessionStorage.getItem("bloodStockTracingId") ?<> <input
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
                        window.location.reload();
                        sessionStorage.removeItem("bloodStockTracingId");
                        sessionStorage.removeItem("bloodDonorId");
                        sessionStorage.removeItem("bloodGroup");
                      }}
                      value={translate("commonCancel")}
                    />
                  </>
                    : <>
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

export default AddBloodStock;
