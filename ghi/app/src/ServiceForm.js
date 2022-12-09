import React from 'react';

class ServiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vin: "",
            customer_name: "",
            date: "",
            time: "",
            reason: "",
            technicians: [],
        };
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;
        console.log(data);

        const servicesUrl = `http://localhost:8080/api/services/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(servicesUrl, fetchConfig);
        if(response.ok) {
            const newService = await response.json();
            console.log(newService);

            const cleared = {
                vin: "",
                customer_name: "",
                date: "",
                time: "",
                technician: "",
                reason: "",
            };
            this.setState({ success: true });
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const techniciansurl = "http://localhost:8080/api/technicians/"

        const technicianresponse = await fetch(techniciansurl)
        if(technicianresponse.ok) {
            const techniciansdata = await technicianresponse.json();
            console.log(techniciansdata);
            this.setState({ technicians: techniciansdata.technicians });
        }

    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }
    handleCustomerNameChange(event) {
        const value = event.target.value;
        this.setState({ customer_name: value });
    }
    handleDateChange(event) {
        const value = event.target.value;
        this.setState({ date: value });
    }
    handleTimeChange(event) {
      const value = event.target.value;
      this.setState({ time: value });
  }
    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({ technician: value });
    }
    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({ reason: value });
    }

    render() {
        let notSubmittedClass = "not-submitted";
        let successClass = "alert alert-success d-none mb-0";

        if (this.state.success === true) {
          notSubmittedClass = "not-submitted d-none";
          successClass = "alert alert-success mb-0";
        }

        let spinnerClasses = "d-flex justify-content-center mb-3";
        let dropdownClasses = "form-select d-none";
        if (this.state.technicians.length > 0) {
          spinnerClasses = "d-flex justify-content-center mb-3 d-none";
          dropdownClasses = "form-select";
        }

    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new service appointment</h1>
              <form onSubmit={this.handleSubmit} id="create-service-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleVinChange} value={this.state.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                  <label htmlFor="vin">Vin</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleCustomerNameChange} value={this.state.customer_name} placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control"/>
                  <label htmlFor="customer_name">Customer Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleDateChange} value={this.state.date} placeholder="Date" required type="date" name="date" id="date" className="form-control"/>
                  <label htmlFor="date">Date</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleTimeChange} value={this.state.date_time} placeholder="Time" required type="time" name="time" id="time" className="form-control"/>
                  <label htmlFor="time">Time</label>
                </div>
                <div className="mb-3">
                    <select onChange={this.handleTechnicianChange} name="technician" id="technician" className={dropdownClasses} required>
                      <option value="">Choose a Technician</option>
                      {this.state.technicians.map((technician) => {
                        return (
                          <option key={technician.employee_number} value={technician.employee_number}>
                            {technician.name}
                          </option>
                        );
                      })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleReasonChange} value={this.state.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control"/>
                  <label htmlFor="reason">Reason</label>
                </div>
                <div>
                <button className="btn btn-primary mb-3">Create a service appointment</button>
                </div>
                <div className={successClass} id="success-message">
                    You have created a new service appointment!
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    }
}

export default ServiceForm;
