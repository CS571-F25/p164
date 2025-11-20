import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">DevFolio CMS</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="ms-2">Logout</Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/admin/login">Admin Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}