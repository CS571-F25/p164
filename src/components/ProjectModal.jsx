import { Modal, Button, Badge } from "react-bootstrap";

export default function ProjectModal({ project, onHide }) {
  if (!project) return null;

  return (
    <Modal show onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{project.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{project.description}</p>

        <h6>Technologies:</h6>
        {project.technologies.map(t => (
          <Badge className="me-1" key={t}>{t}</Badge>
        ))}

        <h6 className="mt-3">Takeaways:</h6>
        <ul>
          {project.takeaways.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
