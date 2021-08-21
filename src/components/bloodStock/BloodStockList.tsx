import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import BloodStockService from "../../services/BloodStockService";
import { Modal } from "react-bootstrap";
import BloodStockModal from "../modals/BloodStockModal";
import { history } from "../custom/history";
// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
// toast-configuration method, 
// it is compulsory method.
toast.configure();


interface BloodStockProps {
  translate: (key: string) => string;
}
class BloodStock extends React.Component<BloodStockProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoaded: true,
      error: null,
      items: [],
      show: false,
      modalData: "",
      query: "",
      showReturnField: false,
      bloodBagId: "",
    };
  }

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    const bloodBagId = this.state.bloodBagId;
    BloodStockService.getStockByBloodBagId(bloodBagId).then((res) => {
      if (res.data.stockStatus === "Available") {
        toast.warn("Blood bag is already available in the list", { position: toast.POSITION.BOTTOM_RIGHT });
      } else {
        BloodStockService.updateStockStatus(bloodBagId)
          .then((res) => {
            if (res.status === 202) {
              toast.success("Blood bag has been restored", { position: toast.POSITION.BOTTOM_RIGHT });
              history.push("/blood/stock/list");
              window.location.reload();
            } else {
              toast.warn("Invalid Input", { position: toast.POSITION.BOTTOM_RIGHT });
            }
          })
          .catch((err: any) => {
            toast.error(err.message, { position: toast.POSITION.BOTTOM_RIGHT });
          });
      }
    });
  };

  deleteBloodStock(id: any) {
    BloodStockService.deleteBloodStock(id).then((res) => {
      if (res.status === 202) {
        toast.success("The blood stock has been deleted successfully", { position: toast.POSITION.BOTTOM_RIGHT });
        window.location.reload();
      }
    });
  }

  closeModal = () => {
    this.setState({
      show: false,
    });
    window.location.reload();
  };

  componentDidMount() {
    this.loadBloodStockList();
  }

  loadBloodStockList() {
    BloodStockService.getBloodStockList()
      .then((res: any) => {
        let dataFinal: any = [];
        res.data.filter((entry: any) => {
          let dataObj = {
            bloodStockTracingId: entry.bloodStockTracingId,
            bloodDonorId: entry?.bloodDonor?.donorId || "N/A",
            donorName: entry?.bloodDonor?.donorName || "N/A",
            donorMobile: entry?.bloodDonor?.donorMobileNo || "N/A",
            bloodStorage: entry.bloodStorage,
            sourceOfBlood: entry.sourceOfBlood,
            bloodGroup: entry.bloodGroup,
            stockStatus: entry.stockStatus,
            bloodBagId: entry.bloodBagId,
          };
          dataFinal.push(dataObj);
          return entry;
        });
        this.setState({
          isLoaded: true,
          items: dataFinal,
        });
      })
      .catch((err: any) => console.log(err));
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
    const {
      error,
      isLoaded,
      items,
      show,
      modalData,
      query,
      showReturnField,
    } = this.state;
    const { translate } = this.props;
    const columns: any = [
      {
        name: `${translate("donorId")}`,
        selector: "bloodDonorId",
        sortable: true,
      },
      {
        name: `${translate("donorName")}`,
        selector: "donorName",
        sortable: true,
      },
      {
        name: `${translate("donorMobileNo")}`,
        selector: "donorMobile",
        sortable: true,
      },
      {
        name: `${translate("bloodGroup")}`,
        selector: "bloodGroup",
        sortable: true,
      },
      {
        name: `${translate("sourceOfBlood")}`,
        selector: "sourceOfBlood",
        sortable: true,
      },
      {
        name: `${translate("bloodBagId")}`,
        selector: "bloodBagId",
        sortable: true,
      },
      {
        name: `${translate("status")}`,
        selector: "stockStatus",
        sortable: true,
      },
      {
        name: `${translate("bloodStorage")}`,
        selector: (row: any) => {
          return row.bloodStorage ? row.bloodStorage : "Not in Stock";
        },
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
                to={`/blood/stock/${record.bloodStockTracingId}`}
                className="btn btn-info btn-sm m-1"
                onClick={() => {
                  sessionStorage.setItem(
                    "bloodStockTracingId",
                    record.bloodStockTracingId
                  );
                  sessionStorage.setItem("bloodGroup", record.bloodGroup);
                }}
              >
                <FontAwesomeIcon size="sm" icon={faEdit} />
              </Link>
              <button
                className="btn btn-danger btn-sm m-1"
                onClick={() => {
                  const id = record.bloodStockTracingId;
                  this.deleteBloodStock(parseInt(id));
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
        <div className="container-fluid m-1">
          <div className="container bg-light p-2">
            <div className="form-inline">
              <a
                className="btn btn-info text-left float-left m-1 font-weight-bold"
                href="/blood/stock/add"
              >
                {translate("stockBlood")}
              </a>
              <button
                className="btn btn-info text-left float-left m-1 font-weight-bold"
                onClick={() => {
                  this.setState({
                    showReturnField: !this.state.showReturnField,
                  });
                }}
              >
                {translate("returnBloodToStock")}
              </button>
              {showReturnField && (
                <form onSubmit={this.submitHandler}>
                  <input
                    className="form-control"
                    type="text"
                    name="bloodBagId"
                    id="bloodBagId"
                    onChange={this.changeHandler}
                  />
                  <button className="btn btn-secondary" type="submit">
                    Submit
                  </button>
                </form>
              )}
            </div>
            <div className="row no-printme">
              <div className="col-12 p-1 m-1">
                <h2 className="text-info font-weight-bold">
                  {translate("bloodCollection")}
                </h2>
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
                    <BloodStockModal
                      translate={translate}
                      data={modalData}
                      title={modalData.bloodStockTracingId}
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

export default BloodStock;
