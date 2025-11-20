import { Container, Table, Button, Badge } from "react-bootstrap";
import { useData } from "../../contexts/DataContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { projects, deleteProject } = useData();

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Project Dashboard</h1>
        <Button as={Link} to="/admin/create" variant="success">+ New Project</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Technologies</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>
                {p.technologies.slice(0, 3).map(t => (
                  <Badge bg="secondary" className="me-1" key={t}>{t}</Badge>
                ))}
              </td>
              <td>{p.featured ? "✅" : "❌"}</td>
              <td>
                <Button as={Link} to={`/admin/edit/${p.id}`} variant="primary" size="sm" className="me-2">Edit</Button>
                <Button variant="danger" size="sm" onClick={() => deleteProject(p.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}