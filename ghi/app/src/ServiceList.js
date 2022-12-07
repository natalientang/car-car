import React from 'react';

class ServiceList extends React.Component {
    state = {
        services: [],
        autos: []
    }

    async getServiceList() {
        const response = await fetch("http://localhost:8080/api/services")
        if(response.ok) {
            const data = await response.json();
            const services = data.services;
            this.setState({services: services});
            console.log(data)
        }
    }

    async componentDidMount() {
        this.getServiceList();
    }

    async handleDelete(event) {
        const url = `http://localhost:8080/api/services/${event}`
        await fetch(url, {method: "DELETE"})
        this.getServiceList()
    }

    render() {
        return (
        <table className="table table-striped">
            <thead>
              <tr>
                <th>Vin</th>
                <th>Customer Name</th>
                <th>Date/Time</th>
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
                    <td>{ service.date_time }</td>
                    <td>{ service.technician.name }</td>
                    <td>{ service.reason }</td>
                    <td><button onClick={() => this.handleDelete(service.id)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
    }
}

export default ServiceList;
