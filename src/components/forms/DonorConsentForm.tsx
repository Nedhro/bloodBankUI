import React, { Component } from "react";
import DonorService from "../../services/DonorService";
import FormBanner from "../../static/images/hospitalBanner.png";
import "../../static/scss/print.scss";

interface consentFormProps {
  translate: (key: string) => string;
}
class DonorConsentForm extends Component<consentFormProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      formData: []
    };
  }
  componentDidMount() {
    const donorId = sessionStorage.getItem("bloodDonorId");
    if (donorId) {
      this.getTestData(donorId);
    }
    console.log(this.state.formData);
  }

  getTestData(id: any) {
    DonorService.getPhysicalTestInfoById(parseInt(id)).then((res) => {
      console.log(res);
      const testData = [];
      testData.push(res.data);
      this.setState({
        formData: testData,
      });
    });
  }

  printDiv() {
    window.print();
  }
  render() {
    const { translate } = this.props;
    const { formData } = this.state;
    return (
      <div className="container p-1">
        <div className="row float-right">
          <button className="btn btn-success" onClick={this.printDiv}>
            {translate("commonPrint")}
          </button>
        </div>
        <div
          className="container-fluid print-container p-1"
          id="printSectionConsentForm"
        >
          <div className="formBanner">
            <img
              src={FormBanner}
              width="100%"
              height="220px"
              className="Form-Banner header"
              alt="Banner"
            />
          </div>
          <div className="formBody">
            <h3 className="text-info font-weight-bold text-center">
              Medical Assessment of Blood Donor
            </h3>
            <div className="formData">
              {formData.map((item: any, i: any) => (
                <div key={i}>{item.bloodDonor.donorName}</div>
              ))}
            </div>
          </div>
          <div className="formFooter">
            <h2 className="text-center font-weight-bold">
              {translate("donorConsentForm")}
            </h2>
            <div className="consentNote"></div>
            <div className="row">
              <div className=" col-6 float-left text-left">
                <p>Blood Donor's Name: </p>
                <p>Code: </p>
              </div>
              <div className="col-6 float-right text-right">
                <p className="pt-2 pb-2 mt-2 mb-2">
                  Signature of the Blood Donor :
                  ....................................
                </p>
                <p>Date: </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DonorConsentForm;
