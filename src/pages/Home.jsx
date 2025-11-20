import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const { projects } = useData();
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const navigate = useNavigate();

  const handleViewDetails = (project) => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <>
      <div className="bg-light p-5 mb-4 rounded-3 text-center">
        <Container fluid className="py-5">
          <h1 className="display-5 fw-bold">Hi, I'm a Developer.</h1>
          <p className="col-md-8 fs-4 mx-auto">
            I build accessible, pixel-perfect, and performant web experiences.
            Welcome to my portfolio powered by a React CMS.
          </p>
          <Button as={Link} to="/projects" variant="primary" size="lg">View My Work</Button>
        </Container>
      </div>

      <Container>
        <h2 className="text-center mb-4">Featured Projects</h2>
        <Row className="g-4">
          {featured.map(p => (
             <Col key={p.id} md={4}>
               <ProjectCard project={p} onOpen={handleViewDetails} /> 
             </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}