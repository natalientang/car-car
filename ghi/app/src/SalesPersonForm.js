import React from "react";

export class SalesPersonForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            employee_name: "",
            employee_number: "",
            errorMessage: ""

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const url = "http://localhost:8090/api/employees/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok){
            this.setState({
                employee_name: "",
                employee_number: "",
            });
            this.setState({success: true})
        }
        else{
            this.setState({
                errorMessage: "Couldn't Submit form"
            })
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value})
    }

    render(){
        let notSubmittedClass = "not-submitted";
        let successClass = "alert alert-success d-none mb-0";

        if (this.state.success === true) {
          notSubmittedClass = "not-submitted d-none";
          successClass = "alert alert-success mb-0";
        }

        let error = "alert alert-danger d-none"
        if (this.state.errorMessage != ""){
            error ="alert alert-danger"
        }


        return(
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <div className={error}>{this.state.errorMessage}</div>
                    <h1>Add some Shoes</h1>
                    <form onSubmit={this.handleSubmit} id="create-sales-person-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChange} placeholder="Sales Person's Name" required type="text" name="employee_name" id="employee_name" className="form-control" />
                        <label htmlFor="employee_name">Sales Person's Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChange} placeholder="Sales Person's Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                        <label htmlFor="employee_number">Sales Person's Number</label>
                    </div>
                    <button className="btn btn-primary mb-3">Create</button>
                    </form>
                    <div className={successClass} id = "success-message">Sales Person has been Registered.</div>
                </div>
                </div>
            </div>
        )
    }




}
