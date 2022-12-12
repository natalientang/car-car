import React from "react";


export class SalesHistory extends React.Component {
    state = {
        sales: [],
        errorMessage:"",
        filterInput: "",
        fieldInput: "",
        sale: ""

    }


    async componentDidMount() {
        const response = await fetch("http://localhost:8090/api/sales")
        if (response.ok) {
            const data = await response.json();
            const sales = data.sales;
            delete data.errorMessage

            this.setState({ sales: sales });
            console.log(data); // ! Don't leave console.logs in main
            // ! What happens if the response is not ok?
      } else {
        this.setState({
            errorMessage: "Couldn't get the Sales history, try again later."
        })
      }
    }


    handleInputChange = (event) => {
        this.setState({
            filterInput: event.target.value
        });
    };


    handleFieldChange = (event) => {
        this.setState({
            fieldInput: event.target.value
        });
    };


    render() {

        let error = "alert alert-danger d-none"
        if (this.state.errorMessage != ""){
            error ="alert alert-danger"
        }


        return (
            <div>
            <div className={error}>{this.state.errorMessage}</div>
                <p>Find a Sales Person</p>
                <input value={this.state.filterInput}
                onChange={this.handleInputChange}></input>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Sale Price</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.sales.filter((sale) =>
                        sale.employee.includes(this.state.filterInput)).map((sale) => {
                        return (
                            <tr key={sale.id}>
                                <td>{ sale.employee }</td>
                                <td>{ sale.customer.customer_name }</td>
                                <td>{ sale.auto.vin }</td>
                                <td>{ sale.price }</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
