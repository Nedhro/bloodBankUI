import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-nav navbar-expand navbar-toggle">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item navText nav-link">
              <a className="nav-link navText" href="/">
                Home
              </a>
            </li>
            <li className="dropdown navText nav-link">
              <a
                href="#/#"
                className="dropdown-toggle nav-link navText"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Donor
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li className="p-1 m-1">
                  <a className="text-info" href="/donor/list">
                    Donors
                  </a>
                </li>
                <li className="p-1 m-1">
                  <a className="text-info" href="/questionnaire/list">
                    Questionnaires
                  </a>
                </li>
                <li className="p-1 m-1">
                  <a
                    className="text-info"
                    href="/donorPhysicalSuitability/test/list"
                  >
                    Suitability Test
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="nav navbar-nav navbar-default">
            <li className="dropdown navText nav-link">
              <a
                href="#/#"
                className="dropdown-toggle nav-link navText"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FontAwesomeIcon color="white" size="lg" icon={faUser} />
              </a>
              <ul className="dropdown-menu">
                <li className="p-1">
                  <span className="text-secondary">Username</span>
                </li>
                <li className="p-1">
                  <a className="text-success" href="/">
                    Openmrs
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
