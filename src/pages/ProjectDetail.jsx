import { useParams, Link } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { Container, Badge, Button, Card } from "react-bootstrap";

export default function ProjectDetail() {
  const { id } = useParams();
  const { getProject } = useData();
  const project = getProject(id);

  if (!project) return <Container className="mt-5"><h2>Project not found!</h2></Container>;

  return (
    <Container className="mt-5">
      <Link to="/projects" className="text-decoration-none">&larr; Back to Projects</Link>
      <h1 className="display-4 mt-3">{project.title}</h1>
      <div className="mb-4">
        {project.technologies.map(t => <Badge bg="info" className="me-2 text-dark" key={t}>{t}</Badge>)}
      </div>
      
      <Row>
        <Col md={8}>
           <Card className="p-4 shadow-sm">
              <h4>Overview</h4>
              <p className="lead">{project.description}</p>
              <hr />
              <h4>In-Depth</h4>
              <p>{project.fullDescription || "No additional details provided."}</p>
           </Card>
        </Col>
        <Col md={4}>
           <Card className="p-4 bg-light">
              <h5>Key Takeaways</h5>
              <ul>
                {project.takeaways.map((t,i) => <li key={i}>{t}</li>)}
              </ul>
              <div className="d-grid gap-2 mt-4">
                 <Button variant="dark">View on GitHub</Button>
                 <Button variant="primary">Live Demo</Button>
              </div>
           </Card>
        </Col>
      </Row>
    </Container>
  );
}
// Note: You need to import Row/Col from react-bootstrap here as well.
import { Row, Col } from "react-bootstrap";