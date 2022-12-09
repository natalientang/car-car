import React from 'react';

class ServiceList extends React.Component {
    state = {
        services: [],
        autos: [],
        errorMessage: ""
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


    async componentDidMount() {
        await this.getServiceList();
        await this.getAutoList();
    }

    async handleDelete(event) {
        const url = `http://localhost:8080/api/services/${event}`
        await fetch(url, {method: "DELETE"})
        this.getServiceList()
    }


    render() {
      let vip = "d-none"


        return (
        <div>
        <h1 className="mt-3">Service Appointments</h1>
        <table className="table table-striped">
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
              {this.state.services.map(service => {
                return (
                  <tr key={service.id}>
                    {this.state.autos.map(auto => {
                      if (service.vin == auto.vin){
                        return(
                        <td key = {auto.id}><img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png" width="35" height="35"/></td>
                        )
                      }
                      else{
                        return(<td key={auto.id}><img className={vip}/></td>
                        )
                      }
                    })}
                    <td>{ service.vin }</td>
                    <td>{ service.customer_name }</td>
                    <td>{ service.date }</td>
                    <td>{ service.time }</td>
                    <td>{ service.technician.name }</td>
                    <td>{ service.reason }</td>
                    <td><button className="btn btn-danger" onClick={() => this.handleDelete(service.id)}>Cancel</button></td>
                    <td><button className="btn btn-success" onClick={() => this.handleDelete(service.id)}>Finished</button></td>
                  </tr>
                );
              })}
            </tbody>
        </table>
        </div>
        );
    }
}

export default ServiceList;
