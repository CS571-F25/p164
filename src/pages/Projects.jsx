import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { projects } = useData();
  const [filtered, setFiltered] = useState(projects);

  // Update filtered list when global projects change
  useEffect(() => {
    setFiltered(projects);
  }, [projects]);

  return (
    <Container className="mt-4">
      <h1>All Projects</h1>
      <Filters projects={projects} setFiltered={setFiltered} />

      <Row className="g-3 mt-2">
        {filtered.length > 0 ? filtered.map(project => (
          <Col key={project.id} xs={12} md={6} lg={4}>
            <ProjectCard project={project} onOpen={() => {}} />
             <div className="mt-2">
                <Link to={`/projects/${project.id}`} className="btn btn-outline-primary w-100">
                  View Case Study
                </Link>
            </div>
          </Col>
        )) : <p className="text-center">No projects found.</p>}
      </Row>
    </Container>
  );
}