import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Modal } from "react-bootstrap";
import DonorModal from "../modals/DonorModal";
import DonorService from "../../services/DonorService";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


interface DonorMedicalAssessmentProps {
  translate: (key: string) => string;
}
class DonorMedicalAssessment extends React.Component<DonorMedicalAssessmentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoaded: true,
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
    window.location.reload();
  };

 

 /* deleteDonorInfo(id: any) {
    DonorService.deleteBloodDonor(id).then((res) => {
      console.log(res);
      if (res.status === 202) {
        this.setState({
          notification: "The Donor Info is deleted successfully",
        });
        window.location.reload();
      }
    });
  }*/

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
    const { translate } = this.props;
    const columns = [
      {
        name: `${translate("id")}`,
        selector: "id",
        sortable: true,
      },
      {
        name: `${translate("donorName")}`,
        selector: "name",
        sortable: true,
      },
      {
        name: `${translate("donorAge")}`,
        selector: "age",
        sortable: true,
      },
      {
        name: `${translate("donorPresentAddress")}`,
        selector: "presentAddress",
        sortable: true,
      },
      {
        name: `${translate("donorMobileNo")}`,
        selector: "mobile",
        sortable: true,
      },
      {
        name: `${translate("status")}`,
        selector: "status",
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
                to={`/donor/${record.id}`}
                className="btn btn-info btn-sm m-1"
                onClick={() => {
                  sessionStorage.setItem("donorId", record.id);
                }}
              >
                <FontAwesomeIcon size="sm" icon={faEdit} />
              </Link>
              {/* <button
                className="btn btn-danger btn-sm m-1"
                onClick={() => {
                  console.log(record);
                  this.deleteDonorInfo(record.id);
                }}
              >
                <FontAwesomeIcon size="sm" icon={faTrash} />
              </button> */}
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
        <div className="mainlayout m-1">
          <div className="container bg-light p-2">
            <div className="form-inline">
              <a
                className="btn btn-info text-left float-left m-1 font-weight-bold"
                href="/donor/add"
              >
                {translate("addDonor")}
              </a>
              <a
                className="btn btn-info text-left float-left m-1 font-weight-bold"
                href="/questionnaire/list"
              >
                {translate("donorQues")}
              </a>
            </div>

            <div className="row">
              <div className="col-12 p-1 m-1">
                <h2>{translate("donorInfo")}</h2>
                <div className="container">
                  <form className="form-group">
                    <div className="row">
                      <div className="col-3 form-inline">
                        <label htmlFor="filter m-2 p-2"> {translate("commonFilter")}</label>
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
                    <DonorModal translate={translate} data={modalData} title={modalData.id} />
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

export default DonorMedicalAssessment;
