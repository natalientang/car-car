import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import { SalesPersonForm } from './Sales/SalesPersonForm';
import { PotentialCustomerForm } from './Sales/PotentialCustomerForm';
import { SalesForm } from './Sales/SalesForm';
import { SalesHistory } from './Sales/SalesHistory';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import ServiceHistory from './ServiceHistory';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="sale">
            <Route path="" element={<SalesHistory />} />
            <Route path="new" element={<SalesForm />} />
            <Route path="salesperson" element={<SalesPersonForm />} />
            <Route path="customer" element={<PotentialCustomerForm />} />
          </Route>
          <Route path = "services">
            <Route path="" element={<ServiceList />} />
            <Route path="new" element={<ServiceForm />} />
            <Route path="history" element={<ServiceHistory/>} />
          </Route>
          <Route path = "technicians">
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path = "manufacturers">
            <Route path="" element={<ManufacturerList/>} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path = "models">
            <Route path="" element={<VehicleModelList/>} />
            <Route path="new" element={<VehicleModelForm />} />
          </Route>
          <Route path = "automobiles">
            <Route path="" element={<AutomobileList/>} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
