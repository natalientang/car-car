import { NavLink } from "react-router-dom";

const styleProps = {
  backgroundColor: "white",
};


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>

            <div className="dropdown">
              <a
                className="btn dropdown-toggle"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inventory Info
              </a>
              <ul
                style={styleProps}
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
              >
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/manufacturers">
                    Manufacturers
                  </NavLink>
                </li>
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/manufacturers/new">
                    New Manufacturer
                  </NavLink>
                </li>
                <div className="dropdown-divider"></div>
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/models">
                    Vehicle Models
                  </NavLink>
                </li>
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/models/new">
                    New Vehicle Model
                  </NavLink>
                </li>
                <div className="dropdown-divider"></div>
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/automobiles">
                    Automobiles
                  </NavLink>
                </li>
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/automobiles/new">
                    New Automobile
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <a
                className="btn dropdown-toggle"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services Info
              </a>
              <ul
                style={styleProps}
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
              >
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/services">
                    Service Appointments
                  </NavLink>
                </li>
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/services/new">
                    New Service Appointment
                  </NavLink>
                </li>
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/services/history">
                    Service History
                  </NavLink>
                </li>
                <div className="dropdown-divider"></div>
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/technicians">
                    Technicians
                  </NavLink>
                </li>
                <li className="nav-item dropdown-item">
                  <NavLink className="nav-link" to="/technicians/new">
                    New Technician
                  </NavLink>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
