import React from 'react';

class ServiceList extends React.Component {
    state = {
      services: [],
      autos: [],
      errorMessage: "",
      service: ""
  }


    async componentDidMount() {
        await this.getServiceList();
        await this.getAutoList();
    }


    async getServiceList() {
        const response = await fetch("http://localhost:8080/api/services");
        if(response.ok) {
            const data = await response.json();
            const services = data.services;
            this.setState({services: services});
        }
        else {
          this.setState({
            errorMessage: "Could not get list of services"
          })
        }
    }


    async getAutoList() {
      const response = await fetch("http://localhost:8100/api/automobiles/");
      if(response.ok) {
          const data = await response.json();
          const autos = data.autos;
          this.setState({autos: autos});
      }
      else {
        this.setState({
          errorMessage: "Could not get list of autos"
        })
      }
  }


    async handleDelete(id) {
        const url = `http://localhost:8080/api/services/${id}`
        await fetch(url, {method: "DELETE"})
        this.getServiceList()
    }


    async handleComplete(id) {
        const url = `http://localhost:8080/api/services/${id}/`
        const fetchConfig = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({completed: true})
        }
        await fetch(url, fetchConfig)
        this.getServiceList()

    }


    ServiceVIP = (serviceVin) => {
      let obj = this.state.autos.find((autoObj) => autoObj.vin === serviceVin)
      console.log(this.state.autos)
      return obj ? <td><img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png" width="30" height="30"/></td> : <td></td>
    }


    render() {
      return (
      <div>
      <h1 className="mt-3">Service Appointments</h1>
      <table className="table" >
          <thead>
            <tr>
              <th>VIP Status</th>
              <th>Vin</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {this.state.services
            .filter((service) => service.completed == false)
            .map((service) =>
              <tr key={service.id}>
              {this.ServiceVIP(service.vin)}
                  <td>{ service.vin }</td>
                  <td>{ service.customer_name }</td>
                  <td>{ service.date }</td>
                  <td>{ service.time }</td>
                  <td>{ service.technician.name }</td>
                  <td>{ service.reason }</td>
                  <td><button className="btn btn-danger" onClick={() => this.handleDelete(service.id)}>Cancel</button></td>
                  <td><button className="btn btn-success" onClick={() => this.handleComplete(service.id)}>Finished</button></td>
              </tr>
          )}
          </tbody>
      </table>
      </div>
      );
    }
}

export default ServiceList;
