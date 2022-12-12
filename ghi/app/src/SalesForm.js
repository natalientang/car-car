import React from "react";

export class SalesForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            price: "",
            auto: "",
            customer: "",
            employee: "",
            success: false,
            autos: [],
            customers: [],
            employees: [],
            errorMessage: ""

        }

    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...this.state};
        delete data.autos
        delete data.customers
        delete data.employees
        delete data.success

        const url = "http://localhost:8090/api/sales/"
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
                price: "",
                auto: "",
                customer: "",
                employee: "",
            });
            this.setState({success: true})
        }
        else{
            this.setState({
                errorMessage: "Couldn't Submit Form"
            })
        }
    }

    async componentDidMount() {
        const autoUrl = 'http://localhost:8090/api/autovos/'
        const customerUrl = 'http://localhost:8090/api/customers/'
        const employeeUrl = 'http://localhost:8090/api/employees/'
        const autoResponse = await fetch(autoUrl);
        const customerResponse = await fetch(customerUrl);
        const employeeResponse = await fetch(employeeUrl);
        if (autoResponse.ok && customerResponse.ok && employeeResponse.ok){
            const autoData = await autoResponse.json()
            const customerData = await customerResponse.json()
            const employeeData = await employeeResponse.json()
            this.setState({autos: autoData.autos,
                customers: customerData.customers,
                employees: employeeData.employees})
            console.log(autoData)
            console.log(customerData)
            console.log(employeeData)
        }
        else{
            this.setState({
                errorMessage: "Couldn't Retrieve Data"
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
        let error = "alert alert-danger d-none"
        if (this.state.success === true) {
          successClass = "alert alert-success mb-0";
        }

        if (this.state.errorMessage != ""){
            error ="alert alert-danger"
        }

        return(
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <div className={error}>{this.state.errorMessage}</div>
                    <h1>Add a Sale</h1>
                    <form onSubmit={this.handleSubmit} id="create-sales-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleChange} placeholder="Sale's Price" required type="number" name="price" id="price" className="form-control" />
                            <label htmlFor="price">Sale's Price</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleChange} required type="text" name="auto" id="auto" className="form-select">
                            <option value="">Choose a Automobile</option>
                            {this.state.autos.map(auto => {
                                return (
                                <option key={auto.id} value={auto.import_href}>{auto.vin}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleChange} required type="text" name="employee" id="employee" className="form-select">
                            <option value="">Choose a Employee</option>
                            {this.state.employees.map(employee => {
                                return (
                                <option key={employee.employee_name} value={employee.employee_name}>{employee.employee_name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleChange} required type="text" name="customer" id="customer" className="form-select">
                            <option value="">Choose a Customer</option>
                            {this.state.customers.map(customer => {
                                return (
                                <option key={customer.id} value={customer.id}>{customer.customer_name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary mb-3">Create</button>
                    </form>
                    <div className={successClass} id = "success-message">Sale has been Registered.</div>
                </div>
                </div>
            </div>
        )
    }



}
