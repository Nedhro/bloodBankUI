import React from "react";
import DonorService from "../../services/DonorService";
import { Checkbox } from "@material-ui/core";

interface DonorInfoProps{
  translate: (key: string) => string
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
    console.log(this.dataConfig);
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
      concernSet: [],
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
  }

  getQuestionList() {
    DonorService.getAllQuestionnaire().then((res) => {
      console.log(res);
      const questionList = res.data;
      this.setState({
        questionList: questionList,
      });
    });
  }

  submitDonorInfo(dataConfig: any) {
    DonorService.saveDonorInfo(dataConfig).then((res) => {
      console.log(res);
      if (res.status === 201) {
        this.setState({ notification: "Donor Info Added Successfully" });
        //this.props.history.push("/donor/list");
      }
      this.setState({
        notification: "Please add valid and non duplicate values",
      });
    });
  }

  render() {
    const { translate} =this.props;
    const { notification, questionList } = this.state;
    return (
      <div className="container-fluid m-1 p-1">
        <h2 className="text-info text-center"> {translate('addDonorPageHeader')}</h2>
        <div className="container p-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="donorName" className="font-weight-bold">
                      {translate('fullName')}
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      required
                      name="donorName"
                      id="donorName"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="patientId" className="font-weight-bold">
                      Blood For(Patient Id)
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="number"
                      className="form-control"
                      required
                      name="patientId"
                      id="patientId"
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
                      Guardian/Relative
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorGuardian"
                      id="donorGuardian"
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
                      Profession
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorProfession"
                      id="donorProfession"
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
                      Age
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="number"
                      className="form-control"
                      required
                      name="donorAge"
                      id="donorAge"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row form-group">
                  <div className="col-4 text-right">
                    <label htmlFor="donorMobileNo" className="font-weight-bold">
                      Mobile
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorMobileNo"
                      id="donorMobileNo"
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
                      Gender
                    </label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-control"
                      name="donorGender"
                      id="donorGender"
                      required
                      onChange={this.changeHandler}
                    >
                      <option value="">Select</option>
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
                      Marital Status
                    </label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-control"
                      name="donorMaritalStatus"
                      id="donorMaritalStatus"
                      required
                      onChange={this.changeHandler}
                    >
                      <option value="">Select</option>
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
                      Present Address
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorPresentAddress"
                      id="donorPresentAddress"
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
                      Permanent Address
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorPermanentAddress"
                      id="donorPermanentAddress"
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
                      Last Donated Date
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="date"
                      pattern="yyyy-MM-dd"
                      name="donorLastDonatedDate"
                      id="donorLastDonatedDate"
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
                      Last Donated Place
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      type="text"
                      name="donorLastDonatedPlace"
                      id="donorLastDonatedPlace"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="row form-group">
                  {questionList?.map((item: any, i: any) => (
                    <div className="col-8" key={i}>
                      {item.question}
                      <Checkbox
                        className="form-control p-0"
                        value={item.question}
                        id="concernName"
                        name="concernName"
                        onChange={this.changeHandler}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-2"></div>
              <div className="col-4 m-1 p-1 float-right text-right">
                <input
                  type="submit"
                  className="form-control btn btn-success m-1 p-1"
                  value="Save"
                />
              </div>
              <div className="col-4 m-1 p-1 float-right text-right">
                <input
                  type="reset"
                  className="form-control btn btn-danger m-1 p-1"
                  value="Reset"
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
export default AddDonorInfo;
