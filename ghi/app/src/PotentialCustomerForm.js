import React from "react";

export class PotentialCustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customer_name: "",
            address: "",
            phone: "",
            errorMessage: ""

        }

    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...this.state};
        delete data.errorMessage
        const url = "http://localhost:8090/api/customers/"
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
                customer_name: "",
                address: "",
                phone: ""
            });
            this.setState({success: true})
        }
        else {
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
        let successClass = "alert alert-success d-none mb-0";

        if (this.state.success === true) {
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
                    <h1>Add a Customer</h1>
                    <form onSubmit={this.handleSubmit} id="create-potential-customer-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChange} placeholder="Customer's Name" required type="text" name="customer_name" id="customer_name" className="form-control" />
                        <label htmlFor="customer_name">Customer's Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                        <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleChange} placeholder="Phone Number" required type="text" name="phone" id="phone" className="form-control" />
                        <label htmlFor="phone">Phone Number</label>
                    </div>
                    <button className="btn btn-primary mb-3">Create</button>
                    </form>
                    <div className={successClass} id = "success-message">Customer has been Registered.</div>
                </div>
                </div>
            </div>
        )
    }



}
