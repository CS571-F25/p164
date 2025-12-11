import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext"; // <--- ADDED THIS IMPORT
import { useEffect, useState } from "react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { profile } = useData(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navStyle = {
    transition: "all 0.3s ease",
    background: scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.3)" : "none",
    padding: scrolled ? "10px 0" : "20px 0"
  };

  return (
    <Navbar expand="lg" fixed="top" style={navStyle}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-dark">
          {profile?.name ? profile.name.split(' ')[0] : 'Dev'}<span style={{ color: "var(--accent-color)" }}>.Dev</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto bg-white rounded-pill px-4 py-2 shadow-sm border mt-3 mt-lg-0">
            {['Home', 'Projects', 'About'].map((item) => (
              <Nav.Link 
                key={item}
                as={Link} 
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`px-3 fw-medium ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'text-primary' : 'text-secondary'}`}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="mt-3 mt-lg-0">
            {user ? (
              <>
                <Button variant="light" size="sm" as={Link} to="/admin/dashboard" className="me-2 rounded-pill">Dashboard</Button>
                <Button variant="danger" size="sm" onClick={handleLogout} className="rounded-pill">Logout</Button>
              </>
            ) : (
              <Button variant="dark" size="sm" as={Link} to="/admin/login" className="rounded-pill px-4">
                Admin
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}