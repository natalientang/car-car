import React from 'react';

class TechnicianList extends React.Component {
    state = {
        name: "",
        errorMessage: ""
    }


    async componentDidMount() {
        await this.getTechnicianList();
    }


    async getTechnicianList() {
        const response = await fetch("http://localhost:8080/api/technicians/");
        if(response.ok) {
            const data = await response.json();
            const technicians = data.technicians;
            this.setState({technicians: technicians});
        }
        else {
          this.setState({
            errorMessage: "Could not get list of technicians"
          })
        }
    }


    render() {
        return (
        <div>
        <h1 className="mt-3">Technicians</h1>
        <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.technicians?.map(technician => {
                return (
                <tr key={technician.employee_number}>
                    <td>{ technician.name }</td>
                 </tr>
                );
              })}
            </tbody>
        </table>
        </div>
        );
    }
}

export default TechnicianList;
