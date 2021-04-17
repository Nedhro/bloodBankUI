import React from "react";
import DataTable from "react-data-table-component";
import DonorService from "../../services/DonorService";

class PhysicalSuitability extends React.Component<any, any> {
  columns: any = [
    {
      name: "Hemoglobin",
      selector: "donorHemoglobin",
      sortable: true,
    },
    {
      name: "Weight",
      selector: "donorWeight",
      sortable: true,
    },
    {
      name: "Blood Pressure",
      selector: "donorBloodPressure",
      sortable: true,
    },
    {
      name: "Pulse Rate",
      selector: "donorPulseRate",
      sortable: true,
    },
    {
      name: "Temperature",
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
      selector: "action",
      sortable: false,
      button: true
    },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      items: [],
      notification: "",
    };
  }

  componentDidMount() {
    this.loadTests();
  }

  loadTests() {
    DonorService.getPhysicalSuitabilityResults()
      .then((res) => {
        console.log(res);
        let keys = [
          "donorHemoglobin",
          "donorWeight",
          "donorBloodPressure",
          "donorPulseRate",
          "donorTemperature",
          "donorBloodGroup",
          "donorBloodGroupRhesus",
          "donorSelection",
          "action",
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
      .catch((err) => console.log(err));
  }

  filterData(dataArr: any, keys: any) {
    let data = dataArr.map((entry: any) => {
      let filteredEntry: any = {};
      keys.forEach((key: any) => {
        if (key in entry) {
          filteredEntry[key] = entry[key];
        }
        if (key === "action") {
          filteredEntry[key] =
            '<button type="button" class="btn btn-indigo btn-sm m-0 " @click="editUserModal(item)"  >Edit</button> <button type="button" class="btn btn-red btn-sm m-0 ">Delete</button> ';
        }
      });
      return filteredEntry;
    });
    // console.log(data)
    return data;
  }

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
            <a
              className="btn btn-primary text-left float-left"
              href="/donorPhysicalSuitability/test/add"
            >
              Physical Suitability Test
            </a>
            <br /> <br />
            <div className="row">
              <div className="col-12 p-1 m-1">
                <h2>Donor Physical Suitability Tests</h2>
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

export default PhysicalSuitability;
