import React from 'react';

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            picture_url: "",
            manufacturer_ids: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.manufacturer_ids;
        console.log(data);

        const modelsUrl = `http://localhost:8100/api/models/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(modelsUrl, fetchConfig);
        if(response.ok) {
            const newVehicleModel = await response.json();
            console.log(newVehicleModel);

            const cleared = {
                name: "",
                picture_url: "",
                manufacturer_id: "",
            };
            this.setState({ success: true });
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const manufacturersurl = "http://localhost:8100/api/manufacturers/"

        const manufacturerresponse = await fetch(manufacturersurl)
        if(manufacturerresponse.ok) {
            const manufacturerdata = await manufacturerresponse.json();
            console.log(manufacturerdata);
            this.setState({ manufacturer_ids: manufacturerdata.manufacturers});
        }

    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }
    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({ picture_url: value });
    }
    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer_id: value });
    }

    render() {
        let notSubmittedClass = "not-submitted";
        let successClass = "alert alert-success d-none mb-0";

        if (this.state.success === true) {
          notSubmittedClass = "not-submitted d-none";
          successClass = "alert alert-success mb-0";
        }

        let spinnerClasses = "d-flex justify-content-center mb-3";
        let dropdownClasses = "form-select d-none";
        if (this.state.manufacturer_ids.length > 0) {
          spinnerClasses = "d-flex justify-content-center mb-3 d-none";
          dropdownClasses = "form-select";
        }

    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new vehicle model</h1>
              <form onSubmit={this.handleSubmit} id="create-model-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handlePictureUrlChange} value={this.state.picture_url} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control"/>
                  <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div>
                <div className="mb-3">
                    <select onChange={this.handleManufacturerChange} name="manufacturer_id" id="manufacturer_id" className={dropdownClasses} required>
                      <option value="">Choose a Manufacturer</option>
                      {this.state.manufacturer_ids.map((manufacturer) => {
                        return (
                          <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                          </option>
                        );
                      })}
                    </select>
                </div>
                <button className="btn btn-primary mb-3">Create a vehicle model</button>
                </div>
                <div className={successClass} id="success-message">
                    You have created a new vehicle model!
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    }
}

export default VehicleModelForm;
