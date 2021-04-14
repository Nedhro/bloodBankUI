import React from "react";
import DataTable from "react-data-table-component";
import DonorService from "../../services/DonorService";

class AssessmentQuestionnaire extends React.Component<any, any> {
 
  columns = [
    {
      name: "Question",
      selector: "question",
      sortable: true,
    },
    {
      name: "Concern For",
      selector: "concernFor",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true
    }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  componentDidMount() {
    this.getQuestionnaireList();
  }

  getQuestionnaireList() {
    DonorService.getAllQuestionnaire().then((result) => {
      const resultData = result.data;
      const datafinal = resultData?.map((data: any) => {
        let config = {
          uuid: data.uuid,
          id: data.qid,
          question: data.question,
          concernFor: data.concernFor,
          status: data.status === 1? 'Active':'Inactive' 
        };
        return config;
      });
      this.setState({
        isLoaded: true,
        items: datafinal,
      });
    });
  };

  render() {
    const { error, isLoaded, items } = this.state;
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
            <a className="btn btn-primary text-left float-left" href="/questionnaire/add">
              Add Questionnaire
            </a>
            <br /> <br />
            <div className="row">
              <div className="col-12 p-1 m-1">
                <h2>Donor Medical Assessment Questionnaire</h2>
                <DataTable
                  className="table table-stripped table-hover"
                  columns={this.columns}
                  data={items}
                  pagination
                  pointerOnHover
                  highlightOnHover
                  paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                  striped={true}
                  responsive
                  noHeader
                  onRowClicked={(data: any) => {
                    console.log(data);
                  }}
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

export default AssessmentQuestionnaire;
