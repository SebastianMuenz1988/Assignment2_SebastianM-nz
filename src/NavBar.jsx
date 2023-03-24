import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";

export default function MainMenu() {
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Toggle aria-controls="main-nav" />
      <Navbar.Collapse id="main-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <NavLink className="nav-link" exact="true" to="/">
              Start
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/about-us">
              About us
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
