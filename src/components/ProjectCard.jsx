import { Card, Button, Badge } from "react-bootstrap";

export default function ProjectCard({ project, onOpen }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>{project.description}</Card.Text>

        <div className="mt-auto">
          {project.technologies.map(t => (
            <Badge bg="secondary" className="me-1" key={t}>{t}</Badge>
          ))}
          <Button className="mt-3 w-100" onClick={() => onOpen(project)}>
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
