import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Filters from "../components/Filters";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

const dummyProjects = [
  {
    id: 1,
    title: "AI TCG Simulator",
    description: "A trading card simulator powered by rule-based logic.",
    technologies: ["React", "OpenAI", "Node"],
    takeaways: ["Learned API integration", "Built heuristic engine"]
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A responsive personal portfolio with animations.",
    technologies: ["React", "Bootstrap"],
    takeaways: ["Improved UI design", "Routing experience"]
  }
];

export default function Projects() {
  const [projects] = useState(dummyProjects);
  const [filtered, setFiltered] = useState(dummyProjects);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <h1>Projects</h1>
      <Filters projects={projects} setFiltered={setFiltered} />

      <Row className="g-3 mt-2">
        {filtered.map(project => (
          <Col key={project.id} xs={12} md={6} lg={4}>
            <ProjectCard project={project} onOpen={setSelected} />
          </Col>
        ))}
      </Row>

      <ProjectModal project={selected} onHide={() => setSelected(null)} />
    </>
  );
}
