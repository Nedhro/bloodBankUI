import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import bloodDonorImage from "../../static/images/bloodDonor.png";
import bloodStockImage from "../../static/images/BloodStock.png";
import "../../static/scss/donor.scss";


interface MainLayoutProps {
  translate: (key: string) => string;
}
class MainLayout extends React.Component<MainLayoutProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }

  render() {
    const { translate } = this.props;
    return (
      <div className="container mainlayout">
        <h2 className="text-center ">{translate("welcome")}</h2>
        <div className="row">
          <div className="col-4 cardcol m-2 p-2">
            <div className="card">
              <img
                src={bloodDonorImage}
                height="150px"
                width="100"
                className="card-img-top"
                alt="logo"
              />
              <div className="card-body ">
                <h6 className="card-title  font-weight-bold text-info">
                  {translate("donorAssessment")}
                </h6>
                <p style={{position: "relative",right:"25px"}} className="card-text ">
                  <FontAwesomeIcon
                    color="black"
                    size="sm"
                    icon={faArrowRight}
                  />
                  &nbsp;
                  <span>{translate("donorInformation")}</span>
                </p>
                <a href="/donor/list" className="btn btn-info font-weight-bold">
                  {translate("donorList")}
                </a>
              </div>
            </div>
          </div>

          <div className="col-4 cardcol m-2 p-2">
            <div className="card">
              <img
                src={bloodStockImage}
                height="150"
                width="100"
                className="card-img-top"
                alt="logo"
              />
              <div className="card-body">
                <h6 className="card-title font-weight-bold text-info">
                  {translate("bloodManagement")}
                </h6>
                <p style={{ position: "relative", right: "25px" }} className="card-text">
                  <FontAwesomeIcon
                    color="black"
                    size="sm"
                    icon={faArrowRight}
                  />
                  &nbsp;
                  <span>{translate("bloodManagementInfo")}</span>
                </p>
                <a href="/blood/stock/list" className="btn btn-info font-weight-bold">
                  {translate("bloodStock")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainLayout;
