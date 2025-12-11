import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, InputGroup, Image } from "react-bootstrap";
import { useData } from "../../contexts/DataContext";
import GlassCard from "../../components/GlassCard";
import { FaSave, FaTimes, FaGithub, FaExternalLinkAlt, FaImage } from "react-icons/fa";

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProject, updateProject, getProject } = useData();
  
  // Comprehensive Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    technologies: "",
    takeaways: "",
    img: "",
    demoLink: "",
    repoLink: "",
    category: "Full Stack",
    date: new Date().toISOString().split('T')[0],
    featured: false
  });

  // Load data if editing
  useEffect(() => {
    if (id) {
      const p = getProject(id);
      if (p) {
        setFormData({
          ...p,
          technologies: Array.isArray(p.technologies) ? p.technologies.join(", ") : p.technologies,
          takeaways: Array.isArray(p.takeaways) ? p.takeaways.join(", ") : p.takeaways,
          img: p.img || "",
          demoLink: p.demoLink || "",
          repoLink: p.repoLink || "",
          category: p.category || "Full Stack",
          date: p.date || new Date().toISOString().split('T')[0]
        });
      }
    }
  }, [id, getProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: id ? parseInt(id) : Date.now(),
      technologies: formData.technologies.split(",").map(s => s.trim()).filter(s => s),
      takeaways: formData.takeaways.split(",").map(s => s.trim()).filter(s => s),
    };

    if (id) updateProject(payload);
    else addProject(payload);

    navigate("/admin/dashboard");
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">{id ? "Edit Project" : "Create New Project"}</h2>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          <Col lg={8}>
            <GlassCard className="p-4 h-100">
              <h5 className="text-primary mb-3 text-uppercase fw-bold" style={{fontSize: '0.8rem', letterSpacing: '1px'}}>Core Details</h5>
              
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Project Title</Form.Label>
                <Form.Control 
                  required 
                  size="lg"
                  placeholder="e.g. AI TCG Simulator" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Short Summary</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={2}
                  placeholder="A brief elevator pitch..."
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Full Case Study</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={10} 
                  value={formData.fullDescription} 
                  onChange={e => setFormData({...formData, fullDescription: e.target.value})} 
                />
              </Form.Group>
            </GlassCard>
          </Col>

          <Col lg={4}>
            <div className="d-flex flex-column gap-4">
              <GlassCard className="p-4">
                <h5 className="text-primary mb-3 text-uppercase fw-bold" style={{fontSize: '0.8rem', letterSpacing: '1px'}}>Media & Links</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Image URL</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaImage /></InputGroup.Text>
                    <Form.Control 
                      placeholder="https://..." 
                      value={formData.img} 
                      onChange={e => setFormData({...formData, img: e.target.value})} 
                    />
                  </InputGroup>
                  {formData.img && (
                    <div className="mt-2 rounded-3 overflow-hidden border">
                      <Image src={formData.img} fluid style={{ maxHeight: '150px', width: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Live Demo Link</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaExternalLinkAlt /></InputGroup.Text>
                    <Form.Control 
                      placeholder="https://..." 
                      value={formData.demoLink} 
                      onChange={e => setFormData({...formData, demoLink: e.target.value})} 
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">GitHub Repo</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaGithub /></InputGroup.Text>
                    <Form.Control 
                      placeholder="https://github.com/..." 
                      value={formData.repoLink} 
                      onChange={e => setFormData({...formData, repoLink: e.target.value})} 
                    />
                  </InputGroup>
                </Form.Group>
              </GlassCard>

              <GlassCard className="p-4">
                <h5 className="text-primary mb-3 text-uppercase fw-bold" style={{fontSize: '0.8rem', letterSpacing: '1px'}}>Metadata</h5>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Category</Form.Label>
                      <Form.Select 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Full Stack</option>
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>Mobile</option>
                        <option>AI / Data</option>
                        <option>Design</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Date</Form.Label>
                      <Form.Control 
                        type="date"
                        value={formData.date} 
                        onChange={e => setFormData({...formData, date: e.target.value})} 
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Tech Stack</Form.Label>
                  <Form.Control 
                    value={formData.technologies} 
                    onChange={e => setFormData({...formData, technologies: e.target.value})} 
                  />
                  <Form.Text className="text-muted">Comma separated values</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Key Takeaways</Form.Label>
                  <Form.Control 
                    value={formData.takeaways} 
                    onChange={e => setFormData({...formData, takeaways: e.target.value})} 
                  />
                </Form.Group>

                <Form.Check 
                  type="switch"
                  id="featured-switch"
                  label="Feature this project"
                  className="fw-bold text-primary"
                  checked={formData.featured}
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                />
              </GlassCard>

              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit" className="rounded-pill shadow-sm">
                  <FaSave className="me-2" /> Save Project
                </Button>
                <Button variant="outline-secondary" size="lg" onClick={() => navigate("/admin/dashboard")} className="rounded-pill">
                  <FaTimes className="me-2" /> Cancel
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}