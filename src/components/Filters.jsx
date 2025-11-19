import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

export default function Filters({ setFiltered, projects }) {
  const [query, setQuery] = useState("");
  const [tech, setTech] = useState("");

  const allTech = [...new Set(projects.flatMap(p => p.technologies))];

  function applyFilters() {
    let list = projects;

    if (query) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (tech) {
      list = list.filter(p => p.technologies.includes(tech));
    }

    setFiltered(list);
  }

  return (
    <Form className="mb-4">
      <Row className="g-2">
        <Col md={6}>
          <Form.Control
            placeholder="Search projects..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={tech} onChange={e => setTech(e.target.value)}>
            <option value="">All technologies</option>
            {allTech.map(t => <option key={t}>{t}</option>)}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button className="w-100" onClick={applyFilters}>Filter</Button>
        </Col>
      </Row>
    </Form>
  );
}
