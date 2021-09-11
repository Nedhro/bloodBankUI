import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { FC } from "react";
import { LangContext } from "../../context/lang";
import { authenticationService } from "../../services/AuthenticationService";
import "../../static/scss/custom.scss";
const openmrsUrl = process.env.REACT_APP_API_URL+"/bahmni/home";
interface HeaderProps {
  fixed?: boolean;
  transparent?: boolean;
  translate: (key: string) => string;
}

const Header: FC<HeaderProps> = ({ fixed, transparent }) => {

  const { state: { language }, dispatch: { setLanguage, translate } } = useContext(LangContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username] = useState(authenticationService.currentUserValue);
  const dropdownEl = useRef<HTMLUListElement>(null);

  const handleClickOutside = useCallback((e) => {
    if (showDropdown && e.target.closest('.dropdown') !== dropdownEl.current) {
      setShowDropdown(false);
    }
  }, [showDropdown, setShowDropdown, dropdownEl]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [handleClickOutside]);

  const chooseLanguageHandler = (value: string) => {
    setShowDropdown(false);
    setLanguage(value);
  }

  return (
    <div className="container">
      <nav className="navbar navbar-nav navbar-expand navbar-toggle">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item navText nav-link">
            <a className="nav-link navText" href="/">
              {translate("home")}
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
              {translate("donor")}
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li className="p-1 m-1">
                <a className="text-info" href="/donor/list">
                  {translate("commonDonors")}
                </a>
              </li>
              <li className="p-1 m-1">
                <a className="text-info" href="/questionnaire/list">
                  {translate("ques")}
                </a>
              </li>

            </ul>
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
              {translate("tests")}
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li className="p-1 m-1">
                <a
                  className="text-info"
                  href="/donorPhysicalSuitability/test/list"
                >
                  {translate("test")}
                </a>
              </li>
              <li className="p-1 m-1">
                <a className="text-info" href="/blood/compatibility/test/list">
                  {translate("compatibilityTest")}
                </a>
              </li>
            </ul>
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
              {translate("bloodStock")}
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li className="p-1 m-1">
                <a
                  className="text-info"
                  href="/blood/stock/list"
                >
                  {translate("bloodStockList")}
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
                <span className="text-secondary">{username}</span>
              </li>
              <li className="p-1">
                <a className="text-success" href={openmrsUrl}>
                  OpenMRS Home
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="header__nav_lang mt-4 p-2">
          <p className="selected" onClick={() => setShowDropdown(!showDropdown)}>{language === 'EN' ? 'Eng' : 'বাংলা'}</p>
          {showDropdown && <ul className="dropdown" ref={dropdownEl}>
            <li onClick={() => chooseLanguageHandler('EN')}>{translate('en')}</li>
            <li onClick={() => chooseLanguageHandler('BN')}>{translate('bn')}</li>
          </ul>
          }
        </div>
      </nav>
    </div>
  );
}

export default Header;


