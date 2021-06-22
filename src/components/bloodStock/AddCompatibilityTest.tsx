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
                <h2 className="text-info text-center">{translate("compatibilityTest")}</h2>
                <div className="container p-1">
                    <form className="form" >
                        
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodBagId">{translate("bloodBagId")}:</label>
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
                                <label htmlFor="patient">{translate("patient")}</label>
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
                                    {translate("bloodScreening")}
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
                                    <option value="Compatible">{translate("compatible")}</option>
                                    <option value="NonCompatible">{translate("nonCompatible")}</option>
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodGrouping">
                                    {translate("bloodGrouping")}
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
                                    <option value="Compatible">{translate("compatible")}</option>
                                    <option value="NonCompatible">{translate("nonCompatible")}</option>
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodCrossMatching">
                                    {translate("bloodCrossMatching")}
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
                                    <option value="Compatible">{translate("compatible")}</option>
                                    <option value="NonCompatible">{translate("nonCompatible")}</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodHivTest">
                                    {translate("bloodHivTest")}
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
                                    <option value="Positive">{translate("positive")}</option>
                                    <option value="Negative">{translate("negative")}</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodHbvTest">
                                    {translate("bloodHbvTest")}
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
                                    <option value="Positive">{translate("positive")}</option>
                                    <option value="Negative">{translate("negative")}</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodHcvTest">
                                    {translate("bloodHcvTest")}
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
                                    <option value="Positive">{translate("positive")}</option>
                                    <option value="Negative">{translate("negative")}</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodSyphilisTest">
                                    {translate("bloodSyphilisTest")}
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
                                    <option value="Positive">{translate("positive")}</option>
                                    <option value="Negative">{translate("negative")}</option>
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="bloodMalariaTest">
                                    {translate("bloodMalariaTest")}
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
                                    <option value="Positive">{translate("positive")}</option>
                                    <option value="Negative">{translate("negative")}</option>
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