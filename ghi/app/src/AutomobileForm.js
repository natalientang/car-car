import React from 'react';

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "",
            year: "",
            vin: "",
            model_ids: [],
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.model_ids;
        console.log(data);

        const automobilesUrl = `http://localhost:8100/api/automobiles/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(automobilesUrl, fetchConfig);
        if(response.ok) {
            const newAutomobile = await response.json();
            console.log(newAutomobile);

            const cleared = {
                color: "",
                year: "",
                vin: "",
                model_id: "",
            };
            this.setState({ success: true });
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const modelssurl = "http://localhost:8100/api/models/"

        const modelsresponse = await fetch(modelssurl)
        if(modelsresponse.ok) {
            const modelsdata = await modelsresponse.json();
            console.log(modelsdata);
            this.setState({ model_ids: modelsdata.models});
        }

    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({ color: value });
    }
    handleYearChange(event) {
        const value = event.target.value;
        this.setState({ year: value });
    }
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }
    handleModelChange(event) {
        const value = event.target.value;
        this.setState({ model_id: value });
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
        if (this.state.model_ids.length > 0) {
          spinnerClasses = "d-flex justify-content-center mb-3 d-none";
          dropdownClasses = "form-select";
        }

    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new automobile</h1>
              <form onSubmit={this.handleSubmit} id="create-model-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleYearChange} value={this.state.year} placeholder="Year" required type="number" name="year" id="year" className="form-control"/>
                  <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleVinChange} value={this.state.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                  <label htmlFor="vin">VIN</label>
                </div>
                <div>
                <div className="mb-3">
                    <select onChange={this.handleModelChange} name="model_id" id="model_id" className={dropdownClasses} required>
                      <option value="">Choose a Model</option>
                      {this.state.model_ids.map((model) => {
                        return (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        );
                      })}
                    </select>
                </div>
                <button className="btn btn-primary mb-3">Create an automobile</button>
                </div>
                <div className={successClass} id="success-message">
                    You have created a new automobile!
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    }
}

export default AutomobileForm;
