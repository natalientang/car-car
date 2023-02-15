import React, {useState, useEffect} from "react";

function ServiceForm() {
  const [formData, setFormData] = useState({
    vin: "",
    customer_name: "",
    date: "",
    time: "",
    reason: "",
    technician: "",
    errorMessage: false,
    success: false,
  })
  const [technicians, setTechnicians] = useState([])


  useEffect(() => {
     if(technicians.length === 0) {
      fetch('http://localhost:8080/api/technicians/')
        .then(response => response.json())
        .then(response => setTechnicians(response.technicians))
     }
   },[technicians]);


   const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {...formData}
    delete data.errorMessage
    delete data.success

    const url = `http://localhost:8080/api/services/`
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, fetchConfig);
    if(response.ok) {
      const newService = await response.json();
      setFormData({
        vin: "",
        customer_name: "",
        date: "",
        time: "",
        reason: "",
        technician: "",
        success: true
      });
    } else if(!response.ok) {
      setFormData({
        errorMessage: true,
      });
    }
   }

    let dropdownClasses = "form-select";

    const ErrorMessage = () => {
    if(formData.errorMessage === true) {
      return (<div className="alert alert-danger">Could not submit form</div>)
    }
    else {
      return (<div className="alert alert-danger d-none">You have created a new service appointment!</div>)
    }
  }

    const SuccessMessage = () => {
    if(formData.success === true) {
      return (<div className="alert alert-success mb-0">You have created a new service appointment!</div>)
    }
    else {
      return (<div className="alert alert-success d-none mb-0">Could not submit form</div>)
    }
  }

    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new service appointment</h1>
              <ErrorMessage/>
              <form onSubmit={handleSubmit} id="create-service-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={(event) => setFormData({...formData, vin: event.target.value})}
                    value={formData.vin}
                    placeholder="VIN"
                    required
                    type="text"
                    name="vin"
                    id="vin"
                    className="form-control"
                  />
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={(event) => setFormData({...formData, customer_name: event.target.value})}
                    value={formData.customer_name}
                    placeholder="Customer Name"
                    required
                    type="text"
                    name="customer_name"
                    id="customer_name"
                    className="form-control"
                  />
                  <label htmlFor="customer_name">Customer Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={(event) => setFormData({...formData, date: event.target.value})}
                    value={formData.date}
                    placeholder="Date"
                    required
                    type="date"
                    name="date"
                    id="date"
                    className="form-control"
                  />
                  <label htmlFor="date">Date</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={(event) => setFormData({...formData, time: event.target.value})}
                    value={formData.time}
                    placeholder="Time"
                    required
                    type="time"
                    name="time"
                    id="time"
                    className="form-control"
                  />
                  <label htmlFor="time">Time</label>
                </div>
                <div className="mb-3">
                  <select
                    onChange={(event) => setFormData({...formData, technician: event.target.value})}
                    name="technician"
                    id="technician"
                    className={dropdownClasses}
                    required
                  >
                    <option value="">Choose a Technician</option>
                    {technicians.map((technician) => {
                      return (
                        <option
                          key={technician.employee_number}
                          value={technician.employee_number}
                        >
                          {technician.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={(event) => setFormData({...formData, reason: event.target.value})}
                    value={formData.reason}
                    placeholder="Reason"
                    required
                    type="text"
                    name="reason"
                    d="reason"
                    className="form-control"
                  />
                  <label htmlFor="reason">Reason</label>
                </div>
                <div>
                  <button className="btn btn-primary mb-3">
                    Create a service appointment
                  </button>
                </div>
                <SuccessMessage/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default ServiceForm;
