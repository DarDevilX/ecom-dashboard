import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Header from './Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AddProducts from  './AddProducts';
import UpdateProducts from './UpdateProducts';
import ProductList from './ProductList';


function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<AddProducts />} />
      <Route path="/update/:id" element={<UpdateProducts />} />
      <Route path="/" element={<ProductList />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;