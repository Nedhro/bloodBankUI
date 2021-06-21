import React from "react";
import DonorService from "../../services/DonorService";
import { Checkbox } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "../../static/scss/donor.scss";
import { history } from "../custom/history";

interface DonorInfoProps {
  translate: (key: string) => string;
}

class AddDonorInfo extends React.Component<DonorInfoProps, any> {
  dataConfig: any = {};
  questionList: any = [];

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
    if (event.target.name === "concernName") {
      const concernSet = {
        concernName: event.target.value,
        concernStatus: "Yes",
      };
      this.questionList.push(concernSet);
    }
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem('id');
    if (id) {
      this.dataConfig = {
        id: id,
        donorName: this.state.donorName,
        donorAge: this.state.donorAge,
        donorGuardian: this.state.donorGuardian,
        donorGender: this.state.donorGender,
        donorMaritalStatus: this.state.donorMaritalStatus,
        donorProfession: this.state.donorProfession,
        donorPresentAddress: this.state.donorPresentAddress,
        donorPermanentAddress: this.state.donorPermanentAddress,
        donorMobileNo: this.state.donorMobileNo,
        donorLastDonatedDate: this.state.donorLastDonatedDate,
        donorLastDonatedPlace: this.state.donorLastDonatedPlace,
        concernSet: this.questionList,
      };
    }
    else {
      this.dataConfig = {
        donorName: this.state.donorName,
        donorAge: this.state.donorAge,
        donorGuardian: this.state.donorGuardian,
        donorGender: this.state.donorGender,
        donorMaritalStatus: this.state.donorMaritalStatus,
        donorProfession: this.state.donorProfession,
        donorPresentAddress: this.state.donorPresentAddress,
        donorPermanentAddress: this.state.donorPermanentAddress,
        donorMobileNo: this.state.donorMobileNo,
        donorLastDonatedDate: this.state.donorLastDonatedDate,
        donorLastDonatedPlace: this.state.donorLastDonatedPlace,
        concernSet: this.questionList,
      };
    }

    this.submitDonorInfo(this.dataConfig);
  };

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      donorName: "",
      patientId: "",
      donorGuardian: "",
      donorProfession: "",
      donorAge: "",
      donorMobileNo: "",
      donorGender: "",
      donorMaritalStatus: "",
      donorPresentAddress: "",
      donorPermanentAddress: "",
      donorLastDonatedDate: "",
      donorLastDonatedPlace: "",
      concernName: "",
      concernStatus: "",
      notification: "",
      questionList: [],
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitDonorInfo = this.submitDonorInfo.bind(this);
  }

  componentDidMount() {
    this.getQuestionList();
    const id = sessionStorage.getItem('id');
    if (id !== null) {
      this.getDonorInfoById(id);
      sessionStorage.removeItem('id');
    }
  }

  getQuestionList() {
    DonorService.getAllQuestionnaire().then((res) => {
      const questionList = res.data;
      this.setState({
        questionList: questionList,
      });
    });
  }
  getDonorInfoById(id: any) {
    console.log('done');
    DonorService.getBloodDonorById(id).then((res) => {
      console.log(res.data);
      const donorName = res.data.donorName;
      const patientId = res.data.patientId;
      const donorGuardian = res.data.donorGuardian;
      const donorProfession = res.data.donorProfession;
      const donorAge = res.data.donorAge;
      const donorMobileNo = res.data.donorMobileNo;
      const donorGender = res.data.donorGender;
      const donorMaritalStatus = res.data.donorMaritalStatus;
      const donorPresentAddress = res.data.donorPresentAddress;
      const donorPermanentAddress = res.data.donorPermanentAddress;
      const donorLastDonatedDate = res.data.donorLastDonatedDate;
      const donorLastDonatedPlace = res.data.donorLastDonatedPlace;
      const concernSet = res.data.concernSet;
      this.setState({
        donorName: donorName,
        patientId: patientId,
        donorGuardian: donorGuardian,
        donorProfession: donorProfession,
        donorAge: donorAge,
        donorMobileNo: donorMobileNo,
        donorGender: donorGender,
        donorMaritalStatus: donorMaritalStatus,
        donorPresentAddress: donorPresentAddress,
        donorPermanentAddress: donorPermanentAddress,
        donorLastDonatedDate: donorLastDonatedDate,
        donorLastDonatedPlace: donorLastDonatedPlace,
        questionList: concernSet,
      });
    });
  }
  submitDonorInfo(dataConfig: any) {
    DonorService.saveDonorInfo(dataConfig).then((res) => {
      console.log(res);
      if (res.status === 201) {
        this.setState({ notification: "Donor Info Added Successfully" });
        history.push("/donor/list");
        window.location.reload();
      }
      if (res.status === 202) {
        this.setState({ notification: "Donor Info Updated Successfully" });
        history.push("/donor/list");
        sessionStorage.removeItem('id');
        window.location.reload();
      }
      this.setState({
        notification: "Please add valid and non duplicate values",
      });
    });
  }

  render() {
    const { translate } = this.props;
    const { notification, questionList } = this.state;
    return (
      <div className="container-fluid m-1 p-1">
        <h2 className="text-info text-center">
          {translate("addDonorPageHeader")}
        </h2>
        <div className="container p-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="donorName" className="font-weight-bold">
                      {translate("donorName")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      required
                      name="donorName"
                      id="donorName"
                      value={this.state.donorName}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="patientId" className="font-weight-bold">
                      {translate("patientId")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="number"
                      className="form-control"
                      required
                      name="patientId"
                      id="patientId"
                      value={this.state.patientId}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="donorGuardian" className="font-weight-bold">
                      {translate("donorGuardian")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorGuardian"
                      id="donorGuardian"
                      value={this.state.donorGuardian}
                      required
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label
                      htmlFor="donorProfession"
                      className="font-weight-bold"
                    >
                      {translate("donorProfession")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorProfession"
                      id="donorProfession"
                      value={this.state.donorProfession}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="donorAge" className="font-weight-bold">
                      {translate("donorAge")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="number"
                      className="form-control"
                      required
                      name="donorAge"
                      id="donorAge"
                      value={this.state.donorAge}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="donorMobileNo" className="font-weight-bold">
                      {translate("donorMobileNo")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorMobileNo"
                      id="donorMobileNo"
                      value={this.state.donorMobileNo}
                      required
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="donorGender" className="font-weight-bold">
                      {translate("donorGender")}
                    </label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-control"
                      name="donorGender"
                      id="donorGender"
                      value={this.state.donorGender}
                      required
                      onChange={this.changeHandler}
                    >
                      <option value="">{translate("commonSelect")}</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label
                      htmlFor="donorMaritalStatus"
                      className="font-weight-bold"
                    >
                      {translate("donorMaritalStatus")}
                    </label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-control"
                      name="donorMaritalStatus"
                      id="donorMaritalStatus"
                      value={this.state.donorMaritalStatus}
                      required
                      onChange={this.changeHandler}
                    >
                      <option value="">{translate("commonSelect")}</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label
                      htmlFor="donorPresentAddress"
                      className="font-weight-bold"
                    >
                      {translate("donorPresentAddress")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorPresentAddress"
                      id="donorPresentAddress"
                      value={this.state.donorPresentAddress}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label
                      htmlFor="donorPermanentAddress"
                      className="font-weight-bold"
                    >
                      {translate("donorPermanentAddress")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorPermanentAddress"
                      id="donorPermanentAddress"
                      value={this.state.donorPermanentAddress}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label
                      htmlFor="donorLastDonatedDate"
                      className="font-weight-bold"
                    >
                      {translate("donorLastDonatedDate")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="date"
                      pattern="yyyy-MM-dd"
                      name="donorLastDonatedDate"
                      id="donorLastDonatedDate"
                      value={this.state.donorLastDonatedDate}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label
                      htmlFor="donorLastDonatedPlace"
                      className="font-weight-bold"
                    >
                      {translate("donorLastDonatedPlace")}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorLastDonatedPlace"
                      id="donorLastDonatedPlace"
                      value={this.state.donorLastDonatedPlace}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row questionSection">
              <div className="col-12 ">
                <h4 className="text-info text-left">
                  <FontAwesomeIcon
                    className="p-1"
                    color="red"
                    size="lg"
                    icon={faQuestionCircle}
                  />
                  {translate("infoOfDonor")}
                </h4>
              </div>
              {questionList?.map((item: any, i: any) => (
                <div className="col-3 float-right">
                  <div className="row form-group mt-0 pt-0">
                    <div
                      className="col-2 text-right float-right mr-0 pr-0"
                      key={i}
                    >
                      {/* <input className=" mr-0 pr-0" type="checkbox" value={item.question} checked={this.state.chkbox} onChange={this.changeHandler} /> */}
                      <Checkbox
                        className="form-control mr-0 pr-0"
                        value={item.question}
                        id="concernName"
                        name="concernName"
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="col-10 text-left mt-2 pt-1">
                      {item.question}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row form-group">
              <div className="col-8"></div>
              <div className="col-2 float-right text-right">
                <input
                  type="submit"
                  className="form-control btn btn-success"
                  value={translate("commonSave")}
                />
              </div>
              <div className="col-2 float-right text-right">
                <input
                  type="reset"
                  className="form-control btn btn-danger"
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
export default AddDonorInfo;
