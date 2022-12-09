import React from 'react';
class VehicleModelList extends React.Component {
    state = {
        name: "",
        picture_url: "",
        manufacturer_id: "",
        errorMessage: ""
    }


    async getVehicleModelList() {
        const response = await fetch("http://localhost:8100/api/models/");
        if(response.ok) {
            const data = await response.json();
            const models = data.models;
            this.setState({models: models});
        }
        else{
          this.setState({
            errorMessage: "Could not get list of vehicle models"
          })
        }
    }


    async componentDidMount() {
        await this.getVehicleModelList();
    }

    async handleDelete(event) {
        const url = `http://localhost:8100/api/models/${event}`
        await fetch(url, {method: "DELETE"})
        this.getVehicleModelList()
    }


    render() {
          return (
          <div>
          <h1 className="mt-3">Vehicle Models</h1>
          <table className="table table-striped">
              <thead>
                <tr>
                  <th>Manufacturer</th>
                  <th>Name</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {this.state.models?.map(model => {
                  return (
                    <tr key={model.id}>
                      <td>{ model.manufacturer.name }</td>
                      <td>{ model.name }</td>
                      <td><img src={ model.picture_url} width="200" height="auto"/></td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
          </div>
          );
      }
  }

export default VehicleModelList;
