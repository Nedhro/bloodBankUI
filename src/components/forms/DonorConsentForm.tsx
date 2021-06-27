import React, { Component } from "react";

interface consentFormProps {
  translate: (key: string) => string;
}
class DonorConsentForm extends Component<consentFormProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { translate } = this.props;
    return (
      <div className="container p-1">
        <div className="row float-right">
          <button className="btn btn-success">
            {translate("commonPrint")}
          </button>
        </div>
        <div className="formBanner">
        {/* <img src={formBanner} className="Form-Banner" alt="Banner" /> */}
        </div>
        <div className="formBody"></div>
        <div className="formFooter"></div>
      </div>
    );
  }
}
export default DonorConsentForm;
