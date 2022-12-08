import React from 'react';

class ManufacturerList extends React.Component {
    state = {
        name: ""
    }

    async getManufacturerList() {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        if(response.ok) {
            const data = await response.json();
            const manufacturers = data.manufacturers;

            this.setState({manufacturers: manufacturers});
            console.log(data)
        }
    }

    async componentDidMount() {
        this.getManufacturerList();
    }

    async handleDelete(event) {
        const url = `http://localhost:8100/api/manufacturers/${event}`
        await fetch(url, {method: "DELETE"})
        this.getManufacturerList()
    }

    render() {
        return (
        <table className="table table-striped">
            <thead>
            <h1 className="mt-3">Manufacturers</h1>
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
        );
    }
}

export default ManufacturerList;
