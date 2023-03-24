import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function MainMenu() {
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Toggle aria-controls="main-nav" />
      <Navbar.Collapse id="main-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <NavLink className="nav-link" exact="true" to="/">
              <h4>Start</h4>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/movies">
              <h4>Movies</h4>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/about-us">
              <h4>About us</h4>
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
