import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DonorService from "../../services/DonorService";
import SuitabilityTestModal from "../modals/SuitabilityTestModal";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class PhysicalSuitability extends React.Component<any, any> {
  columns: any = [
    {
      name: "Donor Id",
      selector: "bloodDonorId",
      sortable: true,
    },
    {
      name: "Hemoglobin (g/dl)",
      selector: "donorHemoglobin",
      sortable: true,
    },
    {
      name: "Weight (kg)",
      selector: "donorWeight",
      sortable: true,
    },
    {
      name: "Blood Pressure (mmHg)",
      selector: "donorBloodPressure",
      sortable: true,
    },
    {
      name: "Pulse Rate (b/m)",
      selector: "donorPulseRate",
      sortable: true,
    },
    {
      name: "Temperature (oC)",
      selector: "donorTemperature",
      sortable: true,
    },
    {
      name: "Blood Group",
      selector: "donorBloodGroup",
      sortable: true,
    },
    {
      name: "Blood Group Rhesus",
      selector: "donorBloodGroupRhesus",
      sortable: true,
    },
    {
      name: "Permission",
      selector: "donorSelection",
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
              to={`/donorPhysicalSuitability/test/${record.bloodDonorId}/${record.donorPhysicalSuitabilityId}`}
              className="btn btn-info btn-sm m-1"
              onClick={() => {
                sessionStorage.setItem("id", record.donorPhysicalSuitabilityId);
                // console.log(record);
                // const id = record.donorPhysicalSuitabilityId;
                // const donorID = record.bloodDonorId;
                // history.push(`/donorPhysicalSuitability/test/${donorID}/${id}`);
                // window.location.reload();
              }}
            >
              <FontAwesomeIcon size="sm" icon={faEdit} />
            </Link>
            <button
              className="btn btn-danger btn-sm m-1"
              onClick={() => {
                const id = record.donorPhysicalSuitabilityId;
                this.deleteSuitabilityTest(parseInt(id));
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

  deleteSuitabilityTest(id: any) {
    DonorService.deletePhysicalTest(id).then((res) => {
      console.log(res);
      if (res.status === 202) {
        this.setState({
          notification: "The test is deleted successfully",
        });
        window.location.reload();
      }
    });
  }

  closeModal = () => {
    this.setState({
      show: false,
    });
  };

  componentDidMount() {
    this.loadTests();
  }

  loadTests() {
    DonorService.getPhysicalSuitabilityResults()
      .then((res: any) => {
        console.log(res);
        let keys = [
          "donorPhysicalSuitabilityId",
          "donorHemoglobin",
          "donorWeight",
          "donorBloodPressure",
          "donorPulseRate",
          "donorTemperature",
          "donorBloodGroup",
          "donorBloodGroupRhesus",
          "donorSelection",
          "bloodDonorId",
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
        //rows
        entries.map((entry: any) => dataFinal.push(entry));
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

  render() {
    const { error, isLoaded, items, show, modalData, query, notification } =
      this.state;
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
                href="/donor/list"
              >
                Donors
              </a>
            </div>
            <div className="row no-printme">
              <div className="col-12 p-1 m-1">
                <h2>Donor Physical Suitability Tests</h2>
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
                  className="table table-stripped table-hover"
                  columns={this.columns}
                  data={this.search(items)}
                  pagination
                  pointerOnHover
                  highlightOnHover
                  paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                  striped={true}
                  responsive
                  noHeader
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
                    <SuitabilityTestModal
                      data={modalData}
                      title={modalData.donorPhysicalSuitabilityId}
                    />
                  ) : (
                    ""
                  )}
                </Modal>
              </div>
              <div className="text-danger m-1 p-1">
                <p className="text-center bg-info font-weight-bold">
                  {notification}
                </p>
              </div>
              <div className="p-2 m-2" aria-readonly></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default PhysicalSuitability;
