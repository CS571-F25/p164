import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useData } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import Filters from "../components/Filters";
import ProjectCard from "../components/ProjectCard";
import GlassCard from "../components/GlassCard"; // Import GlassCard

export default function Projects() {
  const { projects } = useData();
  const [filtered, setFiltered] = useState(projects);
  const navigate = useNavigate();

  useEffect(() => {
    setFiltered(projects);
  }, [projects]);

  const handleViewDetails = (project) => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <Container>
      {/* Creative Header */}
      <div className="mb-5 text-center">
        <h1 className="display-4 fw-bold" style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Selected Works
        </h1>
        <p className="lead text-secondary">A collection of experiments, products, and case studies.</p>
      </div>

      {/* Filters inside Glass */}
      <GlassCard className="mb-5 p-4">
        <Filters projects={projects} setFiltered={setFiltered} />
      </GlassCard>

      <Row className="g-4">
        {filtered.length > 0 ? filtered.map((project, index) => (
          <Col key={project.id} xs={12} md={6} lg={4}>
            <ProjectCard 
              project={project} 
              index={index} // Pass index for animation stagger
              onOpen={handleViewDetails} 
            />
          </Col>
        )) : (
          <div className="text-center py-5">
            <h3 className="text-muted">No projects found.</h3>
          </div>
        )}
      </Row>
    </Container>
  );
}