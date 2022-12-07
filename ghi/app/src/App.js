import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';
import TechnicianForm from './TechnicianForm';

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
          </Route>
          <Route path = "technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
