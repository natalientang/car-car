import React from 'react';

class ManufacturerList extends React.Component {
    state = {
        name: "",
        errorMessage: ""
    }


    async componentDidMount() {
        await this.getManufacturerList();
    }


    async getManufacturerList() {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        if(response.ok) {
            const data = await response.json();
            const manufacturers = data.manufacturers;
            this.setState({manufacturers: manufacturers});
        }
        else {
          this.setState({
            errorMessage: "Could not get list of manufacturers"
          })
        }
    }


    render() {
        return (
        <div>
        <h1 className="mt-3">Manufacturers</h1>
        <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.manufacturers?.map(manufacturer => {
                return (
                <tr key={manufacturer.id}>
                    <td>{ manufacturer.name }</td>
                 </tr>
                );
              })}
            </tbody>
        </table>
        </div>
        );
    }
}

export default ManufacturerList;
