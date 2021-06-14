import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Modal } from "react-bootstrap";
import DonorModal from "../modals/DonorModal";
import DonorService from "../../services/DonorService";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DonorMedicalAssessment extends React.Component<any, any> {
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
    this.getDonorList();
  }

  getDonorList() {
    DonorService.getAllBloodDonor().then((result) => {
      const resultData = result.data;
      const datafinal = resultData?.map((data: any) => {
        let config = {
          uuid: data.uuid,
          id: data.donorId,
          name: data.donorName,
          age: data.donorAge,
          guardian: data.donorGuardian,
          gender: data.donorGender,
          maritalStatus: data.donorMaritalStatus,
          profession: data.donorProfession,
          presentAddress: data.donorPresentAddress,
          permanentAddress: data.donorPermanentAddress,
          mobile: data.donorMobileNo,
          lastDonatedDate: data.donorLastDonatedDate,
          lastDonatedPlace: data.donorLastDonatedPlace,
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

  closeModal = () => {
    this.setState({
      show: false,
    });
  };

  columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Age",
      selector: "age",
      sortable: true,
    },
    {
      name: "Address",
      selector: "presentAddress",
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: "mobile",
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
            <button
              className="btn btn-info btn-sm m-1"
              onClick={() => {
                console.log(record);
              }}
            >
              <FontAwesomeIcon size="sm" icon={faEdit} />
            </button>
            <button
              className="btn btn-danger btn-sm m-1"
              onClick={() => {
                console.log(record);
              }}
            >
              <FontAwesomeIcon  size="sm" icon={faTrash} />
            </button>
          </Fragment>
        );
      },
    },
  ];

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
    const {
      error,
      isLoaded = true,
      items,
      show,
      modalData,
      query,
    } = this.state;
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
                href="/donor/add"
              >
                Add Donor Info
              </a>
              <a
                className="btn btn-primary text-left float-left m-1"
                href="/questionnaire/list"
              >
                Questionnaire
              </a>
            </div>

            <div className="row">
              <div className="col-12 p-1 m-1">
                <h2>Blood Donor Information</h2>
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
                    console.log(dataFinal.uuid);
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
                    <DonorModal data={modalData} title={modalData.id} />
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

export default DonorMedicalAssessment;
