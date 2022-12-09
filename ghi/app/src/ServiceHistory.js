import React from 'react';

class ServiceHistory extends React.Component {
    state = {
        services: [],
    }

    async getServiceHistory() {
        const response = await fetch("http://localhost:8080/api/services");
        if(response.ok) {
            const data = await response.json();
            const services = data.services;

            this.setState({services: services});
            console.log(data)
        }
    }

    async componentDidMount() {
        this.getServiceHistory();
    }

    render() {
        return (
            <div>
            <h1 className="mt-3">Service History</h1>
            <div className="input-group mt-3 mb-3">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" className="btn btn-outline-secondary">Search VIN</button>
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
              {this.state.services.map(service => {
                return (
                <tr key={service.id}>
                    <td>{ service.vin }</td>
                    <td>{ service.customer_name }</td>
                    <td>{ service.date }</td>
                    <td>{ service.time }</td>
                    <td>{ service.technician.name }</td>
                    <td>{ service.reason }</td>
                </tr>
                );
              })}
            </tbody>
        </table>
        </div>
        );
    }
}

export default ServiceHistory;
