import React, { FC, useContext } from "react";
import appLogo from "./govtlogo.png";
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
import { LangContext } from "./context/lang";
import Footer from "./components/layout/footer";

const App:FC = () =>{
    const { dispatch: { translate }} = useContext(LangContext);
  return (
    <div className="App">
      <div className="row App-header p-2">
        <div className="col-1 float-left">
          <img src={appLogo} className="App-logo" alt="logo" />
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
            <AddDonorInfo translate={translate} />
          </Route>
          <Route exact path="/donor/:id">
            <AddDonorInfo translate={translate} />
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
          <Route exact path="/questionnaire/:id">
            <AddQuestionnaire />
          </Route>
          <Route exact path="/donorPhysicalSuitability/test/list">
            <PhysicalSuitability />
          </Route>
          <Route exact path="/donorPhysicalSuitability/test/add/:donorId">
            <AddPhysicalSuitabilityTest />
          </Route>
          <Route exact path="/donorPhysicalSuitability/test/add/:donorId/:id">
            <AddPhysicalSuitabilityTest />
          </Route>
        </Switch>
      </Router>
      <footer>
        <Footer translate={translate}/>
      </footer>
    </div>
  );
}

export default App;
