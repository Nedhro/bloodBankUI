import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DonorService from "../../services/DonorService";
import QuestionnaireModal from "../modals/QuestionnaireModal";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { history } from "../custom/history";
import { Link } from "react-router-dom";


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
      sortable: true,
    },
    {
      name: "Action",
      sortable: false,
      ignoreRowClick: true,
      allowOverflow: true,
      button: false,
      cell: (record: any) => {
        return (
          <Fragment>

            <Link
              to={`/questionnaire/${record.id}`}
              className="btn btn-info btn-sm m-1"
              onClick={() => {
                sessionStorage.setItem("id", record.id);
              }}
            >
              <FontAwesomeIcon size="sm" icon={faEdit} />
            </Link>
            <button
              className="btn btn-danger btn-sm m-1"
              onClick={() => {

              }}
            >
              <FontAwesomeIcon size="sm" icon={faTrash} />
            </button>
          </Fragment>
        );
      },
    },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      items: [],
      notification: "",
      show: false,
      modalData: "",
      query: "",
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
          status: data.status === 1 ? "Active" : "Inactive",
        };
        return config;
      });
      this.setState({
        isLoaded: true,
        items: datafinal,
      });
    });
  }

  search = (rows: any) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows?.filter((row: any) =>
      columns?.some(
        (column: any) =>
          row[column]
            ?.toString()
            .toLowerCase()
            .indexOf(this.state.query.toLowerCase()) > -1
      )
    );
  };

  closeModal = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { error, isLoaded, items, show, modalData, query } = this.state;
    const data = this.search(items);
    const columns = this.columns;
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
            <div className="form-inline">
              <a
                className="btn btn-primary text-left float-left m-1"
                href="/questionnaire/add"
              >
                Add Questionnaire
              </a>
              <a
                className="btn btn-primary text-left float-left m-1"
                href="/donor/list"
              >
                Donors
              </a>
            </div>
            <div className="row">
              <div className="col-12 p-1 m-1">
                <h2>Donor Medical Assessment Questionnaire</h2>
                <div className="container">
                  <form className="form-group">
                    <div className="row">
                      <div className="col-3 form-inline">
                        <label htmlFor="filter m-2 p-2">Filter</label>
                        <input
                          className="form-control m-1 p-1"
                          type="text"
                          value={query}
                          onChange={(e) => {
                            this.setState({ query: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <DataTable
                  className="table table-hover table-sm"
                  columns={columns}
                  data={data}
                  noHeader
                  defaultSortAsc={true}
                  pagination
                  highlightOnHover
                  striped
                  paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                  onRowClicked={(dataFinal: any) => {
                    console.log(dataFinal);
                    const modalData = dataFinal;
                    this.setState({
                      modalData: modalData,
                      show: true,
                    });
                  }}
                />
                <Modal
                  show={show}
                  onHide={this.closeModal}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  {show ? (
                    <QuestionnaireModal data={modalData} title={modalData.id} />
                  ) : (
                    ""
                  )}
                </Modal>
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
