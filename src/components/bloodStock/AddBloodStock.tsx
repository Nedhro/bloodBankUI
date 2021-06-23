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
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    const id = sessionStorage.getItem("id");
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
      if (event.target.value === "NITOR") {
        this.setState({
          bloodBagId: "NITOR-" + donorId,
          stockStatus: "Available"
        });
      } else if (event.target.value === "OutdoorCampaign") {
        this.setState({
          bloodBagId: "Campaign-" + donorId,
          stockStatus: "Available"
        });
      } else if (event.target.value === "Outsource") {
        this.setState({
          bloodBagId: "Outsource-" + donorId,
          stockStatus: "Available"
        });
      } else {
        this.setState({
          bloodBagId: "",
          stockStatus: "NotAvailable"
        });
      }
    }
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem("id");
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
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("donorId");
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
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("donorId");
    sessionStorage.removeItem("bloodGroup");
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
    const { notification } = this.state;
    const { translate } = this.props;
    return (
      <div className="container-fluid m-1 p-1">
        <h2 className="text-info text-center">{translate("addBloodStock")}</h2>
        <div className="container p-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label htmlFor="bloodDonorId">{translate("donorId")}</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="bloodDonorId"
                  id="bloodDonorId"
                  value={this.state.bloodDonorId}
                  readOnly
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label htmlFor="bloodGroup">{translate("bloodGroup")}</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="bloodGroup"
                  id="bloodGroup"
                  value={this.state.bloodGroup}
                  readOnly
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label htmlFor="sourceOfBlood">{translate("sourceOfBlood")}</label>
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
                <label htmlFor="bloodBagId">{translate("bloodBagId")}</label>
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
                <label htmlFor="stockStatus">{translate("stockStatus")}</label>
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
                <label htmlFor="bloodStorage">{translate("bloodStorage")}</label>
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
              <div className="col-8 float-left text-left ">
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
