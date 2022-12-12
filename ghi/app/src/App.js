import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import { SalesPersonForm } from './SalesPersonForm';
import { PotentialCustomerForm } from './PotentialCustomerForm';
import { SalesForm } from './SalesForm';
import { SalesHistory } from './SalesHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salesperson" element={<SalesPersonForm />} />
          <Route path="customer" element={<PotentialCustomerForm />} />
          <Route path="sale" element={<SalesHistory />} />
          <Route path="sale/new" element={<SalesForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
