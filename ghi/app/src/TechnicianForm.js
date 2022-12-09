import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            employee_number: "",
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;
        console.log(data);

        const techniciansUrl = `http://localhost:8080/api/technicians/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(techniciansUrl, fetchConfig);
        if(response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);

            const cleared = {
                name: "",
                employee_number: "",
            };
            this.setState({ success: true });
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }
    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({ employee_number: value });
    }

    render() {
        let notSubmittedClass = "not-submitted";
        let successClass = "alert alert-success d-none mb-0";
        if (this.state.success === true) {
          notSubmittedClass = "not-submitted d-none";
          successClass = "alert alert-success mb-0";
        }

    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new technician</h1>
              <form onSubmit={this.handleSubmit} id="create-technician-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                  <label htmlFor="fabric">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleEmployeeNumberChange} value={this.state.employee_number} placeholder="Employee Number" required type="number" name="customer_name" id="customer_name" className="form-control"/>
                  <label htmlFor="style_name">Employee Number</label>
                </div>
                <div>
                <button className="btn btn-primary mb-3">Create a technician</button>
                </div>
                <div className={successClass} id="success-message">
                    You have created a new technician!
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    }
}

export default TechnicianForm;
