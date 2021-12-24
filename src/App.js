import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Header from './Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AddProducts from  './AddProducts';
import UpdateProducts from './UpdateProducts';



function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<AddProducts />} />
      <Route path="/update" element={<UpdateProducts />} />
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;