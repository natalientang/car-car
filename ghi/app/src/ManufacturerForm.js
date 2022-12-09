import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.manufacturers;
        console.log(data);

        const manufacturersUrl = `http://localhost:8100/api/manufacturers/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(manufacturersUrl, fetchConfig);
        if(response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer);

            const cleared = {
                name: "",
            };
            this.setState({ success: true });
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    render() {
        let notSubmittedClass = "not-submitted";
        let successClass = "alert alert-success d-none mb-0";
        if (this.state.success === true) {
          notSubmittedClass = "not-submitted d-none";
          successClass = "alert alert-success mb-0";
        }

    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new manufacturer</h1>
              <form onSubmit={this.handleSubmit} id="create-service-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                  <label htmlFor="name">Name</label>
                </div>
                <div>
                <button className="btn btn-primary mb-3">Create a manufacturer</button>
                </div>
                <div className={successClass} id="success-message">
                    You have created a new manufacturer!
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    }
}

export default ManufacturerForm;
