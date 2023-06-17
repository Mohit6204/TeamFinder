import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Navbartop() {
  return (
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container fluid>
      <NavLink className="navbrand" to="/">Team Finder</NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
            <NavLink className="navlink" to="/dashboard">Dashboard</NavLink>
            <NavLink className="navlink" to="/create">Create Team</NavLink>
            <NavLink className="navlink" to="/Teams">Teams</NavLink>
            <NavLink className="navlink" to="/Pending">Pending</NavLink>
            <NavLink className="navlink" to="/Accepted">Accepted</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbartop;