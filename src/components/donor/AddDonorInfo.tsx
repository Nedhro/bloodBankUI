import React from "react";
import DonorService from "../../services/DonorService";
import { Checkbox } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "../../static/scss/donor.scss";
import { history } from "../custom/history";
import Select from "react-select";

interface DonorInfoProps {
  translate: (key: string) => string;
}

class AddDonorInfo extends React.Component<DonorInfoProps, any> {
  dataConfig: any = {};
  questionList: any = [];
  concernList: any = [];
  constructor(props: any) {
    super(props);
    this.state = {
      donorName: "",
      typeOfDonor: "",
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
      selectOptions: [],
      patientId: null,
      questionList: [],
      showPatient: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitDonorInfo = this.submitDonorInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }
  removeHandler = (event: any) => {
    this.setState({
      donorName: "",
      typeOfDonor: "",
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
      questionList: [],
    });
  };

  componentDidMount() {
    const id = sessionStorage.getItem("donorId");
    if (id) {
      this.getDonorInfoById(id);
    }
    this.getQuestionList();
    this.getPatientList();
  }

  handleCheckChange = (event: any) => {
    if (event.target.name === "concernName") {
      if (event.target.checked && event.target.id) {
        const concernSet = {
          concernName: event.target.value,
          concernStatus: "Yes",
        };
        this.questionList.push(concernSet);
      } else {
        for (let i = this.questionList.length - 1; i >= 0; i--) {
          if (this.questionList[i].concernName === event.target.value) {
            this.questionList.splice(i, 1);
          }
        }
      }
      // this.setState({
      //   questionList: this.questionList
      // });
    }
  };

  /* removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }*/

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "typeOfDonor") {
      if (event.target.value === "Directory") {
        this.setState({
          showPatient: true,
        });
      } else {
        this.setState({
          showPatient: false,
          patientId: "",
        });
      }
    }
  };

  handleChange = (selectedOption: any) => {
    this.setState({ patientId: selectedOption });
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem("donorId");
    if (id) {
      this.dataConfig = {
        donorId: id,
        donorName: this.state.donorName,
        donorAge: this.state.donorAge,
        typeOfDonor: this.state.typeOfDonor,
        patient: this.state?.patientId?.value,
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
    } else {
      this.dataConfig = {
        donorName: this.state.donorName,
        typeOfDonor: this.state.typeOfDonor,
        patient: this.state?.patientId?.value,
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
    console.log(this.dataConfig);
    this.submitDonorInfo(this.dataConfig);
  };

  getQuestionList() {
    DonorService.getAllQuestionnaire().then((res) => {
      const questionList = res.data;
      const questionArr: any = [];
      questionList.filter((key: any) => {
        let questionObj = {
          id: key.qid,
          value: key.question,
          label: key.question,
        };
        questionArr.push(questionObj);
        return key;
      });
      this.setState({
        questionList: questionArr,
      });
    });
  }

  formatDate(data: any) {
    let date = new Date(data);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 101).toString().substring(1);
    let day = (date.getDate() + 100).toString().substring(1);
    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
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

  getDonorInfoById(id: any) {
    DonorService.getBloodDonorById(id).then((res) => {
      const donorName = res.data.donorName;
      const patientId = res?.data?.patient;
      const typeOfDonor = res.data.typeOfDonor;
      const donorGuardian = res.data.donorGuardian;
      const donorProfession = res.data.donorProfession;
      const donorAge = res.data.donorAge;
      const donorMobileNo = res.data.donorMobileNo;
      const donorGender = res.data.donorGender;
      const donorMaritalStatus = res.data.donorMaritalStatus;
      const donorPresentAddress = res.data.donorPresentAddress;
      const donorPermanentAddress = res.data.donorPermanentAddress;
      const donorLastDonatedDate = this.formatDate(
        res.data.donorLastDonatedDate
      );
      const donorLastDonatedPlace = res.data.donorLastDonatedPlace;
      const concernSet = res.data.concernSet;
      const concern = concernSet.filter((key: any) => {
        this.concernList.push(key.concernName);
        return key;
      });
      console.log(concern);
      this.setState({
        donorName: donorName,
        patientId: patientId,
        typeOfDonor: typeOfDonor,
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
      });
      if (typeOfDonor === "Directory") {
        this.setState({
          showPatient: true,
        });
      } else {
        this.setState({
          showPatient: false,
        });
      }
    });
  }
  submitDonorInfo(dataConfig: any) {
    DonorService.saveDonorInfo(dataConfig).then((res) => {
      console.log(res);
      if (res.status === 201) {
        this.setState({ notification: "Donor Info Added Successfully" });
        history.push("/donor/list");
        window.location.reload();
      } else if (res.status === 202) {
        this.setState({ notification: "Donor Info Updated Successfully" });
        history.push("/donor/list");
        sessionStorage.removeItem("donorId");
        window.location.reload();
      } else {
        this.setState({
          notification: "Please add valid and non duplicate values",
        });
      }
    });
  }

  render() {
    const { translate } = this.props;
    const { notification, questionList, showPatient } = this.state;
    return (
      <div className="container-fluid">
        <h2 className="text-info text-center">
          {sessionStorage.getItem("donorId") ? (
            <>
              {" "}
              <h2 className="text-info text-center">
                {translate("editDonorPageHeader")}
              </h2>
            </>
          ) : (
            <>
              <h2 className="text-info text-center">
                {translate("addDonorPageHeader")}
              </h2>
            </>
          )}
        </h2>
        <div className="container p-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="donorName" className="font-weight-bold">
                      {translate("donorName")}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control text-uppercase"
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
                    <label htmlFor="typeOfDonor" className="font-weight-bold">
                      {translate("typeOfDonor")}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-8">
                    <select
                      required
                      className="form-control"
                      name="typeOfDonor"
                      id="typeOfDonor"
                      value={this.state.typeOfDonor}
                      onChange={this.changeHandler}
                    >
                      <option value="">{translate("commonSelect")}</option>
                      <option value="Voluntary">Voluntary</option>
                      <option value="Directory">Directory</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>

              {showPatient && (
                <div className="col-6">
                  <div className="row form-group">
                    <div className="col-4 text-right">
                      <label htmlFor="patientId" className="font-weight-bold">
                        {translate("patientId")}
                      </label>
                    </div>
                    <div className="col-8">
                      <Select
                        className="text-left"
                        name="patientId"
                        defaultInputValue={this.state.patientId}
                        onChange={this.handleChange}
                        options={this.state.selectOptions}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="donorGuardian" className="font-weight-bold">
                      {translate("donorGuardian")}
                      <span className="text-danger">*</span>
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
                      <span className="text-danger">*</span>
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
                      <span className="text-danger">*</span>
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
                      <span className="text-danger">*</span>
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
                      <span className="text-danger">*</span>
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
                      <Checkbox
                        className="form-control mr-0 pr-0"
                        value={item.value}
                        id={item.id}
                        name="concernName"
                        defaultChecked={this.concernList?.includes(item.value)}
                        onChange={this.handleCheckChange}
                      />
                    </div>
                    <div className="col-10 text-left mt-2 pt-1">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sessionStorage.getItem("donorId") ? (
              <div className="row form-group">
                <div className="col-8"></div>
                <div className="col-2 float-right text-right">
                  <input
                    type="submit"
                    className="form-control btn btn-success m-1"
                    value={translate("commonUpdate")}
                  />
                </div>
                <div className="col-2 float-right text-right">
                  <input
                    type="cancel"
                    className="btn btn-danger m-1"
                    onClick={() => {
                      history.push("/donor/list");
                      window.location.reload();
                      sessionStorage.removeItem("donorId");
                    }}
                    value={translate("commonCancel")}
                  />
                </div>
              </div>
            ) : (
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
                    onClick={this.removeHandler}
                    className="form-control btn btn-danger"
                    value={translate("commonReset")}
                  />
                </div>
              </div>
            )}
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
