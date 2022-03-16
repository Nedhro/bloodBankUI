import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import BloodStockService from "../../services/BloodStockService";
// Importing toastify module
import { toast } from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import { authenticationService } from "../../services/AuthenticationService";
import { history } from "../helper/history";
import ReportModal from "../modals/ReportModal";
// toast-configuration method, 
// it is compulsory method.
toast.configure();
interface CompatibilityListProps {
  translate: (key: string) => string;
}
class ReportList extends React.Component<CompatibilityListProps, any> {
  currentUser: any = "";
  constructor(props: any) {
    super(props);
    this.state = {
      isLoaded: true,
      error: null,
      items: [],
      show: false,
      modalData: "",
      query: "",
    };
  }

  componentDidMount() {
    /*
    for tracking users who is creating or updating
    */
    if (authenticationService.currentUserValue !== undefined
      || authenticationService.currentUserValue !== null) {
      this.currentUser = authenticationService.currentUserValue
    }
    this.getComtibilityList();
  }

  getComtibilityList() {
    BloodStockService.getCompatibilityTestList()
      .then((res) => {
        let keys = [
          "bloodCompatibilityId",
          "bloodScreening",
          "bloodGrouping",
          "bloodCrossMatching",
          "bloodHivTest",
          "bloodHbvTest",
          "bloodHcvTest",
          "bloodSyphilisTest",
          "bloodMalariaTest",
          "bloodBagId",
          "atRoomTemp",
          "at37ByICT",
          "coombsTest",
          "patient",
          "patientBloodGroup",
          "patientBloodGroupRhesus",
          "uuid",
          "status",
          "dateCreated",
          "dateChanged",
          "voided",
          "createdBy",
          "updatedBy",
        ];
        let dataFinal: any = [];
        let entries = this.filterData(res.data, keys);
        entries.map((entry: any) => {
          return dataFinal.push(entry)
        });
        this.setState({
          isLoaded: true,
          items: dataFinal,
        });
      })
      .catch((err: any) => console.log(err));
  }

  filterData(dataArr: any, keys: any) {
    let data = dataArr.map((entry: any) => {
      let filteredEntry: any = {};
      keys.forEach((key: any) => {
        if (key in entry) {
          filteredEntry[key] = entry[key];
        }
      });
      return filteredEntry;
    });
    return data;
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

  deleteComtibilityTest(id: number) {
    if (this.currentUser !== "undefined" && this.currentUser !== "") {
      BloodStockService.deleteCompatibilityTest(id, this.currentUser).then((res) => {
        if (res.status === 202) {
          toast.success("Blood Compatibility Test has been deleted successfully",
            { position: toast.POSITION.BOTTOM_RIGHT });
          history.push("/blood/compatibility/test/list");
        }
      })
        .catch((err) => {
          toast.warn("Deletion is not possible :: " + err.message, { position: toast.POSITION.BOTTOM_RIGHT });
        });
    } else {
      toast.warn("User doesn't have the privilege to delete", { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  closeModal = () => {
    this.setState({
      show: false,
    });

  };
  render() {
    const { error, isLoaded, items, show, modalData, query } =
      this.state;
    const { translate } = this.props;
    const columns: any = [
      {
        name: `${translate("patient")}`,
        selector: "patient",
        sortable: true,
      },
      {
        name: `${translate("patientBloodGroupRhesus")}`,
        selector: "patientBloodGroupRhesus",
        sortable: true,
      },
      {
        name: `${translate("bloodHivTest")}`,
        selector: "bloodHivTest",
        sortable: true,
      },
      {
        name: `${translate("bloodHbvTest")}`,
        selector: "bloodHbvTest",
        sortable: true,
      },
      {
        name: `${translate("bloodHcvTest")}`,
        selector: "bloodHcvTest",
        sortable: true,
      },
      {
        name: `${translate("bloodSyphilisTest")}`,
        selector: "bloodSyphilisTest",
        sortable: true,
      },
      {
        name: `${translate("bloodMalariaTest")}`,
        selector: "bloodMalariaTest",
        sortable: true,
      },
      {
        name: `${translate("action")}`,
        sortable: false,
        ignoreRowClick: true,
        allowOverflow: true,
        button: false,
        cell: (record: any) => {
          return (
            <Fragment>
              <Link
                to={`/report/add/`}
                className="btn btn-info btn-sm m-1"
                onClick={() => {
                  sessionStorage.setItem("bloodCompatibilityId", record.bloodCompatibilityId);
                }}
              >
                <FontAwesomeIcon size="sm" icon={faEdit} />
              </Link>
              <button
                className="btn btn-danger btn-sm m-1"
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Are you sure!!! \nDo you really want to delete this test?"
                  )
                  if (confirmBox) {
                    const id = record.bloodCompatibilityId;
                    this.deleteComtibilityTest(parseInt(id));
                  }
                }}
              >
                <FontAwesomeIcon size="sm" icon={faTrash} />
              </button>
            </Fragment>
          );
        },
      },
    ];
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
        <div className="m-1">
          <div className="container bg-light p-2">
            <div className="form-inline">
              <a
                className="btn btn-info text-left float-left m-1 font-weight-bold"
                href="/report/add"
                onClick={() => {
                  sessionStorage.clear()
                }}
              >
                Add Report
              </a>
            </div>
            <div className="row no-printme">
              <div className="col-12 p-1 m-1">
                <h2>Report List</h2>
                <div className="container">
                  <form className="form-group">
                    <div className="row">
                      <div className="col-3 form-inline">
                        <label htmlFor="filter m-2 p-2">
                          {translate("commonFilter")}
                        </label>
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
                  className="table table-stripped table-hover"
                  columns={columns}
                  data={this.search(items)}
                  pagination
                  pointerOnHover
                  highlightOnHover
                  paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                  striped={true}
                  responsive
                  noHeader
                  onRowClicked={(dataFinal: any) => {
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
                    <ReportModal
                      data={modalData}
                      title={modalData.bloodCompatibilityId}
                      translate={translate}
                    />
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

export default ReportList;

