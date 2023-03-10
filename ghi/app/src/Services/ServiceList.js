import React, {useState, useEffect} from "react";

function ServiceList() {
  const [services, setServices] = useState([]);
  const [autos, setAutos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [service, setService] = useState('');


  useEffect(() => {


    getServiceList()
    getAutoList()
  }, [])

  async function getServiceList() {
    const response = await fetch("http://localhost:8080/api/services");
    if (response.ok) {
      const data = await response.json();
      const services = data.services;
      setServices(services);
    } else {
      setErrorMessage(
       "Could not get list of services"
      );
    }
  }

  async function getAutoList() {
    const response = await fetch("http://localhost:8100/api/automobiles/");
    if (response.ok) {
      const data = await response.json();
      const autos = data.autos;
      setAutos(autos);
    } else {
      setErrorMessage(
      "Could not get list of autos"
      );
    }
  }

  async function handleDelete(id) {
    const url = `http://localhost:8080/api/services/${id}`;
    await fetch(url, { method: "DELETE" });
    getServiceList();
  }


  async function handleComplete(id) {
    const url = `http://localhost:8080/api/services/${id}/`;
    const fetchConfig = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    };
    await fetch(url, fetchConfig);
    getServiceList();
  }

  function ServiceVIP (serviceVin) {
    let obj = autos.find((autoObj) => autoObj.vin === serviceVin);
    return obj ? (
      <td>
        <img
          src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"
          width="30"
          height="30"
        />
      </td>
    ) : (
      <td></td>
    );
  };

  return (
    <div>
      <h1 className="mt-3">Service Appointments</h1>
      <table className="table">
        <thead>
          <tr>
            <th>VIP Status</th>
            <th>Vin</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {services
            .filter((service) => service.completed == false)
            .map((service) => (
              <tr key={service.id}>
                {ServiceVIP(service.vin)}
                <td>{service.vin}</td>
                <td>{service.customer_name}</td>
                <td>{service.date}</td>
                <td>{service.time}</td>
                <td>{service.technician.name}</td>
                <td>{service.reason}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(service.id)}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleComplete(service.id)}
                  >
                    Finished
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}


export default ServiceList;
