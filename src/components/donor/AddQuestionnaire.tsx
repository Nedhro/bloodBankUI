import React from "react";
import DonorService from "../../services/DonorService";
import { history } from "../custom/history";


interface QuestionnaireProps {
  translate: (key: string) => string;
}
class AddQuestionnaire extends React.Component<QuestionnaireProps, any> {
  dataConfig: any = {};

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem('id');
    if (id) {
      this.dataConfig = {
        qid: id,
        question: this.state.question,
        concernFor: this.state.concernFor,
      };
    } else {
      this.dataConfig = {
        question: this.state.question,
        concernFor: this.state.concernFor,
      };
    }
    console.log(this.dataConfig);
    this.submitQuestionnaire(this.dataConfig);
  };

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      qid: "",
      question: "",
      concernFor: "",
      notification: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitQuestionnaire = this.submitQuestionnaire.bind(this);
  }

  componentDidMount() {
    const id = sessionStorage.getItem('id');
    this.getQuestionnaireById(id);
  }

  getQuestionnaireById(id: any) {
    DonorService.getQuestionnaireById(id).then((res) => {
      const question = res.data.question;
      const concernFor = res.data.concernFor;
      this.setState({
        question: question,
        concernFor: concernFor,
      });
    });
  }

  submitQuestionnaire(dataConfig: any) {
    DonorService.saveQuestionnaire(dataConfig).then((res) => {
      console.log(res);
      if (res.status === 201) {
        this.setState({ notification: "Questionnaire Created Successfully" });
        history.push("/questionnaire/list");
        window.location.reload();
      }
      else if (res.status === 202) {
        this.setState({
          notification: "Questionnaire Updated successfully",
        });
        history.push("/questionnaire/list");
        sessionStorage.removeItem('id');
        window.location.reload();
      }
      else{
        this.setState({
          notification: "Please add valid and non duplicate question",
        });
      }
    });
  }

  render() {
    const { notification } = this.state;
    const { translate } = this.props;
    return (
      <div className="container-fluid m-1 p-1">
        <h2 className="text-info text-center">{translate("commonAddQues")}</h2>
        <div className="container p-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label htmlFor="question">{translate("question")}</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="question"
                  id="question"
                  value={this.state.question}
                  required
                  onChange={this.changeHandler}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-4 text-right">
                <label htmlFor="concernFor">{translate("concernFor")}</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control"
                  name="concernFor"
                  id="concernFor"
                  value={this.state.concernFor}
                  required
                  onChange={this.changeHandler}
                >
                  <option value="">{translate("commonSelect")}</option>
                  <option value="Both">{translate("both")}</option>
                  <option value="Male">{translate("male")}</option>
                  <option value="Female">{translate("female")}</option>
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
export default AddQuestionnaire;
