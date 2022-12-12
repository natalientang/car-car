import React from "react";

class ManufacturerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      errorMessage: "",
      success: false,
    };
  }


  handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...this.state };
    delete data.manufacturers;
    delete data.errorMessage;
    delete data.success;

    const manufacturersUrl = `http://localhost:8100/api/manufacturers/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(manufacturersUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
      };
      this.setState({ success: true });
      this.setState(cleared);
    } else {
      this.setState({
        errorMessage: "Could not submit form",
      });
    }
  };


  handleNameChange = (event) => {
    const value = event.target.value;
    this.setState({ name: value });
  };


  render() {
    let successClass = "alert alert-success d-none mb-0";
    if (this.state.success === true) {
      successClass = "alert alert-success mb-0";
    }

    let error = "alert alert-danger d-none";
    if (this.state.errorMessage != "") {
      error = "alert alert-danger";
    }


    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new manufacturer</h1>
              <div className={error}>{this.state.errorMessage}</div>
              <form onSubmit={this.handleSubmit} id="create-service-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    placeholder="Name"
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div>
                  <button className="btn btn-primary mb-3">
                    Create a manufacturer
                  </button>
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
