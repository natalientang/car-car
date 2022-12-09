import React from 'react';

class AutomobileList extends React.Component {
    state = {
        color: "",
        year: "",
        vin: "",
        model_id: "",
        errorMessage: ""
    }


    async getAutomobileList() {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        if(response.ok) {
            const data = await response.json();
            const autos = data.autos;
            this.setState({autos: autos});
        }
        else {
          this.setState({
            errorMessage: "Could not get list of automobiles"
          })
        }
    }


    async componentDidMount() {
        await this.getAutomobileList();
    }


    render() {
          return (
          <div>
          <h1 className="mt-3">Automobiles</h1>
          <table className="table table-striped">
              <thead>
                <tr>
                  <th>Color</th>
                  <th>Year</th>
                  <th>Model</th>
                  <th>VIN</th>
                </tr>
              </thead>
              <tbody>
                {this.state.autos?.map(auto => {
                  return (
                    <tr key={auto.id}>
                      <td>{ auto.color }</td>
                      <td>{ auto.year }</td>
                      <td>{ auto.model.name } </td>
                      <td>{ auto.vin } </td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
          </div>
          );
      }
  }

export default AutomobileList;
