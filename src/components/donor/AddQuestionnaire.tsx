import React from "react";
import DonorService from "../../services/DonorService";
import { history } from "../custom/history";
import { authenticationService } from "../../services/AuthenticationService";
// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
// toast-configuration method, 
// it is compulsory method.
toast.configure();

interface QuestionnaireProps {
  translate: (key: string) => string;
}
class AddQuestionnaire extends React.Component<QuestionnaireProps, any> {
  dataConfig: any = {};
  currentUser: any = "";

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  removeHandler = (event: any) => {
    this.setState({
      qid: "",
      question: "",
      concernFor: "",
    });
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const id = sessionStorage.getItem('quesId');
    if (id) {
      this.dataConfig = {
        qid: id,
        question: this.state.question,
        concernFor: this.state.concernFor,
        createdBy: this.state.createdBy,
        updatedBy: this.state.updatedBy
      };
    } else {
      this.dataConfig = {
        question: this.state.question,
        concernFor: this.state.concernFor,
        createdBy: this.state.createdBy,
        updatedBy: this.state.updatedBy
      };
    }
    this.submitQuestionnaire(this.dataConfig);
  };

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      qid: "",
      question: "",
      concernFor: "",
      createdBy: this.currentUser,
      updatedBy: this.currentUser,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitQuestionnaire = this.submitQuestionnaire.bind(this);
  }

  componentDidMount() {
    /*
    for tracking users who is creating or updating
    */
    if (authenticationService.currentUserValue !== undefined
      || authenticationService.currentUserValue !== null) {
      this.currentUser = authenticationService.currentUserValue
    }
    const id = sessionStorage.getItem('quesId');
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
      if (res.status === 201) {
        toast.success("Questionnaire Created Successfully", { position: toast.POSITION.BOTTOM_RIGHT });
        history.push("/questionnaire/list");
        window.location.reload();
      }
      else if (res.status === 202) {
        toast.success("Questionnaire Updated successfully", { position: toast.POSITION.BOTTOM_RIGHT });
        history.push("/questionnaire/list");
        sessionStorage.removeItem('quesId');
        window.location.reload();
      }
      else {
        toast.error("Please add valid and non duplicate question", { position: toast.POSITION.BOTTOM_RIGHT });
      }
    });
  }

  render() {
    const { translate } = this.props;
    return (
      <div className="container-fluid m-1 p-1">
        {
          sessionStorage.getItem("quesId") ? <> <h2 className="text-info text-center">
            {translate("editQuesHeader")}
          </h2>
          </>
            : <>
              <h2 className="text-info text-center">
                {translate("commonAddQues")}
              </h2>
            </>
        }
        <div className="container p-1">
          <form className="form" onSubmit={this.submitHandler}>
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold" htmlFor="question">{translate("question")}<span className="text-danger">*</span></label>
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
                <label className="font-weight-bold" htmlFor="concernFor">{translate("concernFor")}<span className="text-danger">*</span></label>
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
            {
              sessionStorage.getItem("quesId") ?

                <div className="row form-group">
                  <div className="col-4 text-right"></div>
                  <div className="col-8 float-right text-right ">
                    <input
                      type="submit"
                      className="btn btn-success m-1"
                      value={translate("commonUpdate")}
                    />
                    <input
                      type="cancel"
                      className="btn btn-danger m-1"
                      onClick={() => {
                        history.push("/questionnaire/list");
                        window.location.reload();
                        sessionStorage.removeItem('quesId');
                      }}
                      value={translate("commonCancel")}
                    />
                  </div>
                </div>
                : <div className="row form-group">
                  <div className="col-4 text-right"></div>
                  <div className="col-8 float-right text-right ">
                    <input
                      type="submit"
                      className="btn btn-success m-1"
                      value={translate("commonSave")}
                    />
                    <input
                      type="reset"
                      onClick={this.removeHandler}
                      className="btn btn-danger m-1"
                      value={translate("commonReset")}
                    />
                  </div>
                </div>
            }
          </form>
        </div>
      </div>
    );
  }
}
export default AddQuestionnaire;
