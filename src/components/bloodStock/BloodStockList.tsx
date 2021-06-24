import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import BloodStockService from "../../services/BloodStockService";
import { Modal } from "react-bootstrap";
import BloodStockModal from "../modals/BloodStockModal";

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
      notification: "",
      show: false,
      modalData: "",
      query: "",
    };
  }

  deleteBloodStock(id: any) {
    BloodStockService.deleteBloodStock(id).then((res) => {
      console.log(res);
      if (res.status === 202) {
        this.setState({
          notification: "The blood stock has been deleted successfully",
        });
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
        console.log(res);
        let keys = [
          "bloodStockTracingId",
          "bloodDonorId",
          "bloodStorage",
          "sourceOfBlood",
          "bloodGroup",
          "stockStatus",
          "bloodBagId",
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
    const { translate } = this.props;
    const columns: any = [
      {
        name: `${translate("donorId")}`,
        selector: "bloodDonorId",
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
          name: `${translate("stockStatus")}`,
        selector: "stockStatus",
        sortable: true,
      },
      {
          name: `${translate("bloodStorage")}`,
        selector: "bloodStorage",
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
                to={`/blood/${record.bloodDonorId}/stock/${record.bloodStockTracingId}`}
                className="btn btn-info btn-sm m-1"
                onClick={() => {
                  sessionStorage.setItem("bloodStockTracingId", record.bloodStockTracingId);
                  sessionStorage.setItem("bloodGroup", record.bloodGroup);
                  sessionStorage.setItem("bloodDonorId", record.bloodDonorId);
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
        <div className="mainlayout m-1">
          <div className="container bg-light p-2">
            <div className="form-inline">
              <a
                className="btn btn-info text-left float-left m-1"
                href="/blood/stock/add"
              >
                {translate("stockBlood")}
              </a>
            </div>
            <div className="row no-printme">
              <div className="col-12 p-1 m-1">
                <h2>{translate("bloodStock")}</h2>
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

export default BloodStock;
