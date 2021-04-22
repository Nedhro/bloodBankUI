import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import bloodDonorImage from "../../static/images/bloodDonor.png";
import bloodbilling from "../../static/images/billing.png";
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
              <img src={bloodDonorImage} height="150" width="100" className="card-img-top" alt="logo" />
              <div className="card-body">
                <h6 className="card-title">Donor Medical Assessment</h6>
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
              <img src={bloodbilling} height="150" width="100" className="card-img-top" alt="logo" />
              <div className="card-body">
                <h6 className="card-title">Blood Bank Billing</h6>
                {/* <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p> */}
                <a href="/bill/list" className="btn btn-primary">
                  <FontAwesomeIcon
                    color="white"
                    size="lg"
                    icon={faArrowRight}
                  />{" "}
                  Billing List
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
