import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import bloodDonorImage from "../../static/images/bloodDonor.png";
import "../../static/scss/donor.scss";

class MainLayout extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="container-fluid">
        <h2 className="text-center">Welcome</h2>
        <div className="row">
          <div className="col-3 cardcol">
            <div className="card">
              <img src={bloodDonorImage} className="card-img-top" alt="logo" />
              <div className="card-body">
                <h6 className="card-title">Medical Assessment</h6>
                {/* <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p> */}
                <a href="/questionnaire/list" className="btn btn-primary">
                  <FontAwesomeIcon
                    color="white"
                    size="lg"
                    icon={faArrowRight}
                  />{" "}
                  Questionnaire List
                </a>
              </div>
            </div>
          </div>

          <div className="col-3 cardcol">
            <div className="card">
              <img src={bloodDonorImage} className="card-img-top" alt="logo" />
              <div className="card-body">
                <h6 className="card-title">Blood Donor Medical Assessment</h6>
                {/* <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p> */}
                <a href="/donor/list" className="btn btn-primary">
                  <FontAwesomeIcon
                    color="white"
                    size="lg"
                    icon={faArrowRight}
                  />{" "}
                  Donor List
                </a>
              </div>
            </div>
          </div>

          <div className="col-3 cardcol">
            <div className="card">
              <img src={bloodDonorImage} className="card-img-top" alt="logo" />
              <div className="card-body">
                <h6 className="card-title">Donor Physical Suitability</h6>
                {/* <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p> */}
                <a
                  href="/donorPhysicalSuitability/test/list"
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon
                    color="white"
                    size="lg"
                    icon={faArrowRight}
                  />{" "}
                  Suitability Test List
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
