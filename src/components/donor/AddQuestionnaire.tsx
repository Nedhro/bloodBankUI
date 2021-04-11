import React from "react";
import DonorService from "../../services/DonorService";

class AddQuestionnaire extends React.Component<any,any>{
       
    dataConfig: any = {};
    
    changeHandler= (event:any) =>{
        this.setState({ [event.target.name]: event.target.value });
    };
    
    submitHandler = (event: any) =>{
        event.preventDefault();
        console.log(event.target.value);
        this.dataConfig = {
            question: this.state.question,
            concernFor: this.state.concernFor
          };
          this.submitQuestionnnaire(this.dataConfig);
    };

    constructor(props: any){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            question: '',
            concernFor: '',
            notification: ''
          }
        this.submitHandler =this.submitHandler.bind(this);
        this.changeHandler =this.changeHandler.bind(this);
    }

    componentDidMount(){

    }

    submitQuestionnnaire(dataConfig: any) {
        DonorService.saveQuestionnaire(JSON.stringify(dataConfig)).then(res=>{
            console.log(res);
                    if(res.status === 200){
                        this.setState({notification:"Questionnaire Created Successfully"})
                        this.props.history.push('/questionnaire/list');
                    }
        });
    }

    render(){
        const {notification} = this.state;
        return(
            <div className="container-fluid m-1 p-1">
                <h2 className="text-info text-center">Add Questionnaire</h2>
                <div className="container p-1">
                    <form className="form" onSubmit={this.submitHandler}>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="question">Question</label>
                            </div>
                            <div className="col-8">
                                <input className="form-control" type="text" name="question" id="question" onChange={this.changeHandler} />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4 text-right">
                                <label htmlFor="concernFor">Concern For</label>
                            </div>
                            <div className="col-8">
                               <select className="form-control" name="concernFor" id="concernFor" onChange={this.changeHandler} >
                                    <option value="Both">Both</option>
                                   <option value="Male">Male</option>
                                   <option value="Female">Female</option>
                                   
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4 text-right">
                               
                            </div>
                            <div className="col-8 float-left text-left ">
                               <input type="submit" className="btn btn-success m-1" value="Save"/>
                               <input type="reset" className="btn btn-danger m-1" value="Reset"/>
                            </div>
                        </div>
                    </form>
                    <div className="text-danger">
                            <p className="text-left bg-info font-weight-bold">{notification}</p>
                        </div>
                </div>
            </div>
        );
    }

}
export default AddQuestionnaire