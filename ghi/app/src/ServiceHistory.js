import React from 'react';

class ServiceHistory extends React.Component {
    state = {
        services: [],
        errorMessage: "",
        filterInput: "",
    }


    async componentDidMount() {
        await this.getServiceHistory();
    }


    async getServiceHistory() {
        const response = await fetch("http://localhost:8080/api/services");
        if(response.ok) {
            const data = await response.json();
            const services = data.services;
            this.setState({services: services});
        }
        else {
            this.setState({
                errorMessage: "Could not get service history"
            })
        }
    }


    handleInputChange = (e) => {
        this.setState({
            filterInput: e.target.value
        });
    }


    render() {
        return (
            <div>
            <h1 className="mt-3">Service History</h1>
            <div className="input-group mt-3 mb-3">
                <input
                    onChange={this.handleInputChange}
                    className="form-control rounded"
                    placeholder="Search VIN"
                />
            </div>
        <table className="table table-striped">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {this.state.services
                .filter((service) =>
                    service.vin.includes(this.state.filterInput) && service.completed == true
                )
                .map((service) =>
                    <tr key={service.id}>
                        <td>{ service.vin }</td>
                        <td>{ service.customer_name }</td>
                        <td>{ service.date }</td>
                        <td>{ service.time }</td>
                        <td>{ service.technician.name }</td>
                        <td>{ service.reason }</td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
        );
    }
}

export default ServiceHistory;
