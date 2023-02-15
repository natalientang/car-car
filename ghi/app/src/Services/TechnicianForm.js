import React, {useState} from "react";

function TechnicianForm() {
  const [formData, setFormData] = useState({
      name: "",
      employee_number: "",
      errorMessage: "",
      success: false,
  })


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formData };
    delete data.errorMessage;
    delete data.success;

    const url = `http://localhost:8080/api/technicians/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newTechnician = await response.json();

      setFormData({ success: true });
      setFormData({
        name: "",
        employee_number: "",
      });
    } else {
      setFormData({
        errorMessage: "Could not submit form",
      });
    }
  };



    let successClass = "alert alert-success d-none mb-0";
    if (formData.success === true) {
      successClass = "alert alert-success mb-0";
    }

    let error = "alert alert-danger d-none";
    if (formData.errorMessage != "") {
      error = "alert alert-danger";
    }


    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new technician</h1>
              <div className={error}>{formData.errorMessage}</div>
              <form onSubmit={handleSubmit} id="create-technician-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={(event) => setFormData({...formData, name: event.target.value})}
                    value={formData.name}
                    placeholder="Name"
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                  />
                  <label htmlFor="fabric">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={(event) => setFormData({...formData, employee_number: event.target.value})}
                    value={formData.employee_number}
                    placeholder="Employee Number"
                    required
                    type="number"
                    name="customer_name"
                    id="customer_name"
                    className="form-control"
                  />
                  <label htmlFor="style_name">Employee Number</label>
                </div>
                <div>
                  <button className="btn btn-primary mb-3">
                    Create a technician
                  </button>
                </div>
                <div className={successClass} id="success-message">
                  You have created a new technician!
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default TechnicianForm;
