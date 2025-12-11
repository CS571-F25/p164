import { useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { useData } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import GlassCard from "../../components/GlassCard";
import { FaSave, FaTimes, FaPlus, FaTrash, FaUser, FaBriefcase, FaCode } from "react-icons/fa";

export default function ProfileEditor() {
  const { profile, updateProfile } = useData();
  const navigate = useNavigate();
  
  // Local state for the form
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Skills Handlers ---
  const handleSkillChange = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    setFormData({ 
      ...formData, 
      skills: [...formData.skills, { name: "", level: 50 }] 
    });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  // --- Experience Handlers ---
  const handleExpChange = (index, field, value) => {
    const newExp = [...formData.experience];
    newExp[index][field] = value;
    setFormData({ ...formData, experience: newExp });
  };

  const addExperience = () => {
    setFormData({ 
      ...formData, 
      experience: [...formData.experience, { role: "", company: "", date: "", desc: "" }] 
    });
  };

  const removeExperience = (index) => {
    const newExp = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: newExp });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    navigate("/admin/dashboard");
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Edit Profile</h2>
        <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={() => navigate("/admin/dashboard")} className="rounded-pill">
                <FaTimes className="me-2" /> Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} className="rounded-pill shadow-sm">
                <FaSave className="me-2" /> Save Changes
            </Button>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          {/* Identity Column */}
          <Col lg={4}>
            <GlassCard className="p-4 mb-4">
                <h5 className="text-primary mb-3 text-uppercase fw-bold fs-6"><FaUser className="me-2"/> Identity</h5>
                
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Job Title</Form.Label>
                    <Form.Control name="title" value={formData.title} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Email</Form.Label>
                    <Form.Control name="email" value={formData.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">GitHub URL</Form.Label>
                    <Form.Control name="github" value={formData.github} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Avatar URL</Form.Label>
                    <Form.Control name="avatar" value={formData.avatar || ""} onChange={handleChange} placeholder="https://..." />
                    {formData.avatar && (
                        <div className="mt-3 text-center">
                            <Image src={formData.avatar} roundedCircle style={{width: 100, height: 100, objectFit: 'cover'}} />
                        </div>
                    )}
                </Form.Group>
            </GlassCard>

            <GlassCard className="p-4">
                <h5 className="text-primary mb-3 text-uppercase fw-bold fs-6">Bio</h5>
                <Form.Control 
                    as="textarea" 
                    rows={6} 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                />
            </GlassCard>
          </Col>

          {/* Details Column */}
          <Col lg={8}>
            {/* Skills Section */}
            <GlassCard className="p-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-primary mb-0 text-uppercase fw-bold fs-6"><FaCode className="me-2"/> Skills</h5>
                    <Button size="sm" variant="light" onClick={addSkill} className="rounded-circle"><FaPlus/></Button>
                </div>
                {formData.skills.map((skill, index) => (
                    <Row key={index} className="mb-2 align-items-center">
                        <Col xs={6}>
                            <Form.Control 
                                placeholder="Skill Name" 
                                value={skill.name} 
                                onChange={(e) => handleSkillChange(index, "name", e.target.value)} 
                            />
                        </Col>
                        <Col xs={4}>
                            <Form.Range 
                                value={skill.level} 
                                onChange={(e) => handleSkillChange(index, "level", parseInt(e.target.value))} 
                            />
                        </Col>
                        <Col xs={2} className="text-end">
                            <Button size="sm" variant="danger" onClick={() => removeSkill(index)}><FaTrash/></Button>
                        </Col>
                    </Row>
                ))}
            </GlassCard>

            {/* Experience Section */}
            <GlassCard className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-primary mb-0 text-uppercase fw-bold fs-6"><FaBriefcase className="me-2"/> Experience</h5>
                    <Button size="sm" variant="light" onClick={addExperience} className="rounded-circle"><FaPlus/></Button>
                </div>
                {formData.experience.map((exp, index) => (
                    <div key={index} className="p-3 mb-3 bg-white bg-opacity-50 rounded-3 border">
                        <div className="d-flex justify-content-between mb-2">
                            <h6 className="fw-bold text-muted">Position {index + 1}</h6>
                            <Button size="sm" variant="link" className="text-danger p-0" onClick={() => removeExperience(index)}><FaTrash/></Button>
                        </div>
                        <Row className="g-2 mb-2">
                            <Col md={6}>
                                <Form.Control placeholder="Role" value={exp.role} onChange={(e) => handleExpChange(index, "role", e.target.value)} />
                            </Col>
                            <Col md={6}>
                                <Form.Control placeholder="Company" value={exp.company} onChange={(e) => handleExpChange(index, "company", e.target.value)} />
                            </Col>
                        </Row>
                        <Form.Control className="mb-2" placeholder="Date Range" value={exp.date} onChange={(e) => handleExpChange(index, "date", e.target.value)} />
                        <Form.Control as="textarea" rows={2} placeholder="Description" value={exp.desc} onChange={(e) => handleExpChange(index, "desc", e.target.value)} />
                    </div>
                ))}
            </GlassCard>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}