import { Navbar,NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';

function Header(){
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'));
  function logOut(){
    localStorage.clear()
    navigate('/login')
  }
    return(
        <div>
            <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">e-Commerce</Navbar.Brand>
    <Nav className="me-auto navbar_wrapper">
      {
        localStorage.getItem('user-info') ?
        <>
          <Link to="/">Product List</Link>
          <Link to="/add">Add Product</Link>
          {/* <Link to="/update">Update Product</Link> */}
        </>
        :
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link> 
        </>
      }
    </Nav>
    {
      localStorage.getItem('user-info') ?
      <>
        <Nav>
        <NavDropdown title={user && user.name}>
        <NavDropdown.ItemText onClick={logOut}>Logout</NavDropdown.ItemText>
        </NavDropdown>
        </Nav>
      </>
      :
      <>
      </>
    }
    
    </Container>
  </Navbar>
        </div>
    )
}
export default Header