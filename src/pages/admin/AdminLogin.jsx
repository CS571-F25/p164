import { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
      setError("Invalid credentials! (Try: admin / 12345)");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h2 className="text-center mb-4">CMS Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>PIN</Form.Label>
            <Form.Control type="password" value={pin} onChange={e => setPin(e.target.value)} />
          </Form.Group>
          <Button className="w-100" type="submit">Login</Button>
        </Form>
      </Card>
    </Container>
  );
}