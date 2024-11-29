import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Navbars = () => {
  const { auth, setAuth } = useAuth();
  return (
    <Navbar expand="lg" className='navbar' fixed='top'>
      <Container fluid>
        <Navbar.Brand className='logo' ><Link className='nav-comp' to="/">Makan Sehat</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {auth.roles?.admin && (
            <Nav.Link><Link className='nav-comp' to="/dashboard">Dashboard</Link></Nav.Link>
            )}
          </Nav>
          <Form className="d-flex">
            <Navbar.Brand>{auth.user}</Navbar.Brand>
            <Button variant="primary" onClick={() => setAuth({})}>Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbars