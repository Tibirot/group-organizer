import { Container, Nav, Navbar } from 'react-bootstrap';
import { BsCollectionFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const CustomNavbar = () => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link className="navbar-brand" to="/"><BsCollectionFill /></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/groups">Groups</Link>
            <Link className="nav-link" to="/persons">Persons</Link>
            <Link className="nav-link" to="/overview">Overview</Link>
          </Nav>
          <Nav>
            <Link className="nav-link" to="/about">About</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar;