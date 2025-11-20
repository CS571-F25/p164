import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useData } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Filters from "../components/Filters";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { projects } = useData();
  const [filtered, setFiltered] = useState(projects);
  const navigate = useNavigate(); // Initialize hook

  // Update filtered list when global projects change
  useEffect(() => {
    setFiltered(projects);
  }, [projects]);

  const handleViewDetails = (project) => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <Container className="mt-4">
      <h1>All Projects</h1>
      <Filters projects={projects} setFiltered={setFiltered} />

      <Row className="g-3 mt-2">
        {filtered.length > 0 ? filtered.map(project => (
          <Col key={project.id} xs={12} md={6} lg={4}>
            <ProjectCard 
              project={project} 
              onOpen={handleViewDetails} 
            />
          </Col>
        )) : <p className="text-center">No projects found.</p>}
      </Row>
    </Container>
  );
}