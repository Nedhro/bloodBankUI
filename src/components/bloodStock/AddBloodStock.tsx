import React from 'react';
// import DonorService from "../../services/DonorService";
// import { history } from "../custom/history";

interface BloodStockProps {
    translate: (key: string) => string;
  }

class AddBloodStock extends React.Component<BloodStockProps, any> {
    dataConfig: any = {};
    // changeHandler = (event: any) => {
    //     this.setState({ [event.target.name]: event.target.value });
    // };
    // submitHandler = (event: any) => {
    //     event.preventDefault();
    //     const id = sessionStorage.getItem('id');
    //     if (id) {
    //         this.dataConfig = {
    //             qid: id,
    //             question: this.state.question,
    //             concernFor: this.state.concernFor,
    //         };
    //     } else {
    //         this.dataConfig = {
    //             question: this.state.question,
    //             concernFor: this.state.concernFor,
    //         };
    //     }
    //     console.log(this.dataConfig);
    //     this.submitQuestionnaire(this.dataConfig);
    // };

    // constructor(props: any) {
    //     super(props);
    //     this.state = {
    //         error: null,
    //         isLoaded: false,
    //         qid: "",
    //         question: "",
    //         concernFor: "",
    //         notification: "",
    //     };
    //     this.submitHandler = this.submitHandler.bind(this);
    //     this.changeHandler = this.changeHandler.bind(this);
    //     this.submitQuestionnaire = this.submitQuestionnaire.bind(this);
    // }
    // componentDidMount() {
    //     const id = sessionStorage.getItem('id');
    //     this.getQuestionnaireById(id);
    // }

    // getQuestionnaireById(id: any) {
    //     DonorService.getQuestionnaireById(id).then((res) => {
    //         const question = res.data.question;
    //         const concernFor = res.data.concernFor;
    //         this.setState({
    //             question: question,
    //             concernFor: concernFor,
    //         });
    //     });
    // }

    // submitQuestionnaire(dataConfig: any) {
    //     DonorService.saveQuestionnaire(dataConfig).then((res) => {
    //         console.log(res);
    //         if (res.status === 201) {
    //             this.setState({ notification: "Questionnaire Created Successfully" });
    //             history.push("/questionnaire/list");
    //             window.location.reload();
    //         }
    //         else if (res.status === 202) {
    //             this.setState({
    //                 notification: "Questionnaire Updated successfully",
    //             });
    //             history.push("/questionnaire/list");
    //             sessionStorage.removeItem('id');
    //             window.location.reload();
    //         }
    //         else {
    //             this.setState({
    //                 notification: "Please add valid and non duplicate question",
    //             });
    //         }
    //     });
    // }
    render() {
        // const { notification } = this.state;
        const { translate } = this.props;
        return (
            <div className="container-fluid m-1 p-1">
                <h2 className="text-info text-center">Add Blood Stock</h2>
                <div className="container p-1">
                    <form className="form" >
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
                                    // value={this.state.question}
                                    readOnly
                                    required
                                    // onChange={this.changeHandler}
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
                                    // value={this.state.question}
                                    readOnly
                                    required
                                // onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="sourceOfBlood">
                                    Source of Blood
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="sourceOfBlood"
                                    id="sourceOfBlood"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                    // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Voluntary">Voluntary</option>
                                    <option value="Directory">Directory</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodBagId">Blood Bag Id</label>
                            </div>
                            <div className="col-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="bloodBagId"
                                    id="bloodBagId"
                                    // value={this.state.question}
                                    required
                                // onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="stockStatus">
                                    Stock Status
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="stockStatus"
                                    id="stockStatus"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Available">Available</option>
                                    <option value="NotAvailable">Not Available</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodStorage">
                                    Blood Storage
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodStorage"
                                    id="bloodStorage"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Fridge-1">Fridge-1</option>
                                    <option value="Fridge-2">Fridge-2</option>
                                    <option value="Fridge-3">Fridge-3</option>
                                    <option value="Fridge-1=4">Fridge-4</option>

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
                            {/* {notification} */}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddBloodStock;
