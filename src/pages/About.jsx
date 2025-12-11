import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { useData } from "../contexts/DataContext"; // Change import
import GlassCard from "../components/GlassCard";

export default function About() {
  const { profile } = useData(); // Use context

  return (
    <Container className="py-5 mt-5">
      <Row className="mb-5">
        <Col lg={8}>
          <h1 className="display-4 fw-bold mb-4">About Me</h1>
          <p className="lead text-secondary">{profile.bio}</p>
          <p className="text-secondary">
            With a background in computer science and a passion for interactive design, I strive to create web applications that are not only functional but also delightful to use. My approach involves rigorous testing, accessibility compliance, and modern architectural patterns.
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <GlassCard className="h-100">
            <h3 className="mb-4">Experience</h3>
            <div className="timeline">
              {profile.experience.map((exp, i) => (
                <div key={i} className="mb-4 border-start border-2 border-primary ps-4 position-relative">
                  <div className="position-absolute bg-primary rounded-circle" style={{ width: "12px", height: "12px", left: "-7px", top: "5px" }}></div>
                  <h5 className="mb-1">{exp.role}</h5>
                  <p className="text-primary mb-1 fw-bold">{exp.company}</p>
                  <small className="text-muted d-block mb-2">{exp.date}</small>
                  <p className="text-secondary mb-0">{exp.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Col>

        <Col lg={6} className="mb-4">
          <GlassCard className="h-100">
            <h3 className="mb-4">Technical Skills</h3>
            {profile.skills.map((skill, i) => (
              <div key={i} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-medium">{skill.name}</span>
                  <span className="text-muted">{skill.level}%</span>
                </div>
                <ProgressBar now={skill.level} variant="primary" style={{ height: "8px", borderRadius: "10px" }} />
              </div>
            ))}
          </GlassCard>
        </Col>
      </Row>
    </Container>
  );
}