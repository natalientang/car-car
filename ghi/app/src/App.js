import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import { SalesPersonForm } from './Sales/SalesPersonForm';
import { PotentialCustomerForm } from './Sales/PotentialCustomerForm';
import { SalesForm } from './Sales/SalesForm';
import { SalesHistory } from './Sales/SalesHistory';
import ServiceList from './Services/ServiceList';
import ServiceForm from './Services/ServiceForm';
import TechnicianForm from './Services/TechnicianForm';
import TechnicianList from './Services/TechnicianList';
import ServiceHistory from './Services/ServiceHistory';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ManufacturerList from './Inventory/ManufacturerList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import VehicleModelList from './Inventory/VehicleModelList';
import AutomobileForm from './Inventory/AutomobileForm';
import AutomobileList from './Inventory/AutomobileList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
