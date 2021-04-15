import React from "react";
import logo from "./govtlogo.png";
import "./App.scss";
import MainLayout from "./components/layout/MainLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DonorMedicalAssessment from "./components/donor/DonorMedicalAssessment";
import AssessmentQuestionnaire from "./components/donor/AssessmentQuestionnaire";
import PhysicalSuitability from "./components/donor/PhysicalSuitability";
import Header from "./components/layout/Header";
import AddQuestionnaire from "./components/donor/AddQuestionnaire";
import AddDonorInfo from "./components/donor/AddDonorInfo";
import AddPhysicalSuitabilityTest from "./components/donor/AddPhysicalSuitabilityTest";

function App() {
  return (
    <div className="App">
      <div className="row App-header p-2">
        <div className="col-1 float-left">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="col-4">
          <h2 className="text-left p-0 m-0">Blood Bank Module</h2>
        </div>
        <div className="col-7">
            <Header/>
        </div>
      </div>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainLayout />
          </Route>
          <Route exact path="/donor/add">
            <AddDonorInfo />
          </Route>
          <Route exact path="/donor/list">
            <DonorMedicalAssessment />
          </Route>
          <Route exact path="/questionnaire/add">
            <AddQuestionnaire />
          </Route>
          <Route exact path="/questionnaire/list">
            <AssessmentQuestionnaire />
          </Route>
          <Route exact path="/donorPhysicalSuitability/test/list">
            <PhysicalSuitability />
          </Route>
          <Route exact path="/donorPhysicalSuitability/test/add">
            <AddPhysicalSuitabilityTest />
          </Route>
        </Switch>
      </Router>
      <footer>
        <div className="container-fliud text-center footer pt-2 mb-0 pb-0">
          <p>
            &copy; {new Date().getFullYear()} Copyright || All right reserved ||
            Powered By :{" "}
            <a className="text-center navText" href="https://ctechbd.com/">
              Crystal Technology Bangladesh Ltd.
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
