import { Navbar,NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <div>
            <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">e-Commerce</Navbar.Brand>
    <Nav className="me-auto navbar_wrapper">
      {
        localStorage.getItem('user-info') ?
        <>
          <Link to="/add">Add Product</Link>
          <Link to="/update">Update Product</Link>
        </>
        :
        <>
          <Link to="/Login">Login</Link>
          <Link to="/register">Register</Link> 
        </>
      }
    </Nav>
    <Nav>
      <NavDropdown title="Username">
        <NavDropdown.ItemText>Logout</NavDropdown.ItemText>

      </NavDropdown>
    </Nav>
    </Container>
  </Navbar>
        </div>
    )
}
export default Header