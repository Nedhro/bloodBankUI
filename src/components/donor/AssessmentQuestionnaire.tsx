import React from "react";
import DataTable from 'react-data-table-component';
import DonorService from "../../services/DonorService";

class AssessmentQuestionnaire extends React.Component<any,any>{

    dataFinal = [
       ];

    columns = [
        {
          name: 'Question',
          selector: 'question',
          sortable: true,
        },
        {
          name: 'Concern For',
          selector: 'concernFor',
          sortable: true,
        }
      ];

    constructor(props:any){
        super(props);
        this.state={};
    }
    componentDidMount(){
        this.getQuestionnaireList();
    }

    getQuestionnaireList =() =>{
        DonorService.getAllQuestionnaire().then(result=>{
            console.log(result);
            this.dataFinal = result.data;
        })
    };

    render() {
        return (
          <div className="container-fluid m-1">
            <div className="container bg-light p-2">
              <a className="btn btn-primary text-left float-left" href="/questionnaire/add">Add Questionnaire</a>
              <br/> <br/>
              <div className="row">
                <div className="col-12 p-1 m-1">
                <h2>Donor Medical Assessment Questionnaire</h2>
                <DataTable
                    className="table table-stripped table-hover table-sm"
                    columns={this.columns}
                    data={this.dataFinal}
                    pagination
                    pointerOnHover
                    highlightOnHover
                    paginationRowsPerPageOptions ={[10,20,30,40,50]}
                    striped ={true}
                    sortServer
                    noHeader
                    onRowClicked = {(data: any)=>{ console.log(data)}}
                />
                </div>
                <div className="p-2 m-2" aria-readonly></div>
              
              </div>
             
            </div>
          </div>
        );
      }

}

export default AssessmentQuestionnaire;