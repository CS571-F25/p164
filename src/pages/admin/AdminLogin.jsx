import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import GlassCard from "../../components/GlassCard";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, pin)) {
      navigate("/admin/dashboard");
    } else {
      setError("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <GlassCard className="p-5" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Admin Portal</h2>
          <p className="text-secondary">Secure login for portfolio management.</p>
        </div>
        
        {error && <Alert variant="danger" className="rounded-3 shadow-sm border-0">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-uppercase text-secondary fw-bold" style={{ fontSize: "0.75rem" }}>Username</Form.Label>
            <Form.Control 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="rounded-3 border-0 bg-light p-3"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="text-uppercase text-secondary fw-bold" style={{ fontSize: "0.75rem" }}>Secure PIN</Form.Label>
            <Form.Control 
              type="password" 
              value={pin} 
              onChange={e => setPin(e.target.value)} 
              className="rounded-3 border-0 bg-light p-3"
              placeholder="•••••••"
            />
          </Form.Group>
          <Button className="w-100 rounded-pill py-3 fw-bold" variant="primary" type="submit" style={{ background: "var(--primary-gradient)", border: "none" }}>
            Access Dashboard
          </Button>
        </Form>
        <div className="text-center mt-3">
            <small className="text-muted">Protected by client-side auth</small>
        </div>
      </GlassCard>
    </Container>
  );
}