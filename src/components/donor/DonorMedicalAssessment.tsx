import React from "react";
import { MDBDataTable } from "mdbreact";

class DonorMedicalAssessment extends React.Component<any, any> {
  data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Position",
        field: "position",
        sort: "asc",
        width: 270,
      },
      {
        label: "Office",
        field: "office",
        sort: "asc",
        width: 200,
      },
      {
        label: "Age",
        field: "age",
        sort: "asc",
        width: 100,
      },
      {
        label: "Start date",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Salary",
        field: "salary",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [
      {
        id: 1,
        name: "Tiger Nixon",
        position: "System Architect",
        office: "Edinburgh",
        age: "61",
        date: "2011/04/25",
        salary: "$320",
      },
      {
        id: 2,
        name: "Cedric Kelly",
        position: "Senior Javascript Developer",
        office: "Edinburgh",
        age: "22",
        date: "2012/03/29",
        salary: "$433",
      },
    ],
  };
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      show: false
    };
  }
  componentDidMount() {}

  render() {
    const { error, isLoaded=true } = this.state;
    if (error) {
      return (
        <div className="text-center font-weight-bold">
          Error: {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return <div className="text-center font-weight-bold">Loading...</div>;
    } else {
      return (
        <div className="container-fluid m-1">
          <div className="container bg-light p-2">
            <a
              className="btn btn-primary text-left float-left"
              href="/donor/add"
            >
              Add Donor Info
            </a>
            <br /> <br />
            <div className="row">
              <div className="col-12 p-1 m-1">
                <h2>Donor Medical Assessment Questionnaire</h2>
                <MDBDataTable
                  className="table table-stripped table-hover"
                  noBottomColumns
                  exportToCSV
                  striped
                  responsive
                  hover
                  onClick={(event: any) => {
                    console.log(event.target);
                    this.setState({show: true});
                  }}
                  data={this.data}
                />
              </div>
              <div className="p-2 m-2" aria-readonly></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DonorMedicalAssessment;
