import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useData } from "../../contexts/DataContext";

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProject, updateProject, getProject } = useData();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    technologies: "",
    takeaways: "",
    featured: false
  });

  useEffect(() => {
    if (id) {
      const p = getProject(id);
      if (p) {
        setFormData({
          ...p,
          technologies: p.technologies.join(", "),
          takeaways: p.takeaways.join(", ")
        });
      }
    }
  }, [id, getProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: id ? parseInt(id) : undefined, // Keep ID if editing
      technologies: formData.technologies.split(",").map(s => s.trim()).filter(s => s),
      takeaways: formData.takeaways.split(",").map(s => s.trim()).filter(s => s),
    };

    if (id) updateProject(payload);
    else addProject(payload);

    navigate("/admin/dashboard");
  };

  return (
    <Container className="mt-4">
      <h2>{id ? "Edit Project" : "Create Project"}</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-center">
             <Form.Check type="switch" label="Featured Project?" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Short Description</Form.Label>
          <Form.Control required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Full Description (Markdown-ready)</Form.Label>
          <Form.Control as="textarea" rows={3} value={formData.fullDescription} onChange={e => setFormData({...formData, fullDescription: e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Technologies (Comma separated)</Form.Label>
          <Form.Control placeholder="React, Node, CSS" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Takeaways (Comma separated)</Form.Label>
          <Form.Control placeholder="Learned Hooks, Improved UI" value={formData.takeaways} onChange={e => setFormData({...formData, takeaways: e.target.value})} />
        </Form.Group>

        <Button variant="primary" type="submit">Save Project</Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate("/admin/dashboard")}>Cancel</Button>
      </Form>
    </Container>
  );
}