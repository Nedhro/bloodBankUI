import React from 'react';

interface CompatibilityTestProps {
    translate: (key: string) => string;
}
class AddCompatibilityTest extends React.Component<CompatibilityTestProps, any> {
    dataConfig: any = {};
    render() {
        const { translate } = this.props;

        return (
            <div className="container-fluid m-1 p-1">
                <h2 className="text-info text-center">Compatibility Test</h2>
                <div className="container p-1">
                    <form className="form" >
                        
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodBagId">Blood Bag Id:</label>
                            </div>
                            <div className="col-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="bloodBagId"
                                    id="bloodBagId"
                                    // value={this.state.question}
                                    readOnly
                                    required
                                // onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="patient">Patient</label>
                            </div>
                            <div className="col-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="patient"
                                    id="patient"
                                    // value={this.state.question}
                                    readOnly
                                    required
                                // onChange={this.changeHandler}
                                />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodScreening">
                                    Blood Screening
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodScreening"
                                    id="bloodScreening"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Compatible">Compatible</option>
                                    <option value="NonCompatible">Non-Compatible</option>
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodGrouping">
                                    Blood Grouping
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodGrouping"
                                    id="bloodGrouping"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Compatible">Compatible</option>
                                    <option value="NonCompatible">Non-Compatible</option>
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodCrossMatching">
                                    Blood Cross Matching
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodCrossMatching"
                                    id="bloodCrossMatching"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Compatible">Compatible</option>
                                    <option value="NonCompatible">Non-Compatible</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodHivTest">
                                    Blood Hiv Test
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodHivTest"
                                    id="bloodHivTest"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Positive">Positive</option>
                                    <option value="Negative">Negative</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodHbvTest">
                                    Blood Hbv Test
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodHbvTest"
                                    id="bloodHbvTest"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Positive">Positive</option>
                                    <option value="Negative">Negative</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodHcvTest">
                                    Blood Hcv Test
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodHcvTest"
                                    id="bloodHcvTest"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Positive">Positive</option>
                                    <option value="Negative">Negative</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodSyphilisTest">
                                    Blood Syphilis Test
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodSyphilisTest"
                                    id="bloodSyphilisTest"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Positive">Positive</option>
                                    <option value="Negative">Negative</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodMalariaTest">
                                    Blood Malaria Test
                                </label>
                            </div>
                            <div className="col-8">
                                <select
                                    className="form-control"
                                    name="bloodMalariaTest"
                                    id="bloodMalariaTest"
                                    // value={this.state.donorBloodGroupRhesus}
                                    required
                                // onChange={this.changeHandler}
                                >
                                    <option value="">{translate("commonSelect")}</option>
                                    <option value="Positive">Positive</option>
                                    <option value="Negative">Negative</option>
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

export default AddCompatibilityTest;