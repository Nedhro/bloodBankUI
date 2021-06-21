import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import bloodDonorImage from "../../static/images/bloodDonor.png";
import bloodStockImage from "../../static/images/BloodStock.png";
import "../../static/scss/donor.scss";

class MainLayout extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }

  render() {
    return (
      <div className="container mainlayout">
        <h2 className="text-center">Welcome</h2>
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
              <div className="card-body">
                <h6 className="card-title font-weight-bold text-info">
                  Donor Medical Assessment
                </h6>
                <p className="card-text">
                  <FontAwesomeIcon
                    color="black"
                    size="sm"
                    icon={faArrowRight}
                  />
                  &nbsp;Donor Informations, Donor Suitability Tests,
                  Questionnaires
                </p>
                <a href="/donor/list" className="btn btn-info font-weight-bold">
                  Donor List
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
                  Blood Stock Management
                </h6>
                <p className="card-text">
                  <FontAwesomeIcon
                    color="black"
                    size="sm"
                    icon={faArrowRight}
                  />
                  &nbsp; Blood Stock, Blood Availability Check, Compatibility Test
                </p>
                <a href="/bloodStock" className="btn btn-info font-weight-bold">
                  Blood Stock
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
