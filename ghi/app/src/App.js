import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';
import TechnicianForm from './TechnicianForm';
import ServiceHistory from './ServiceHistory';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path = "services">
            <Route path="" element={<ServiceList />} />
            <Route path="new" element={<ServiceForm />} />
            <Route path="history" element={<ServiceHistory/>} />
          </Route>
          <Route path = "technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path = "manufacturers">
            <Route path="" element={<ManufacturerList/>} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path = "models">
            <Route path="" element={<VehicleList/>} />
            <Route path="new" element={<VehicleForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
