import { Button, Badge } from "react-bootstrap";
import GlassCard from "./GlassCard";
import { FaArrowRight } from "react-icons/fa";

export default function ProjectCard({ project, onOpen, index }) {
  return (
    <GlassCard delay={index * 0.1} className="h-100 d-flex flex-column border-0">
      <div style={{ height: "200px", overflow: "hidden", borderRadius: "16px", marginBottom: "1rem" }}>
        <img 
          src={project.img} 
          alt={project.title} 
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
          className="hover-zoom"
        />
      </div>
      
      <h3 className="h4 mb-2">{project.title}</h3>
      <p className="text-secondary flex-grow-1" style={{ fontSize: "0.95rem" }}>
        {project.description}
      </p>

      <div className="mb-3">
        {project.technologies.slice(0, 3).map(t => (
          <Badge bg="light" text="dark" className="me-1 border" key={t}>{t}</Badge>
        ))}
      </div>

      <Button 
        variant="primary" 
        className="rounded-pill w-100 d-flex justify-content-between align-items-center"
        onClick={() => onOpen(project)}
        style={{ background: "var(--text-main)", border: "none" }}
      >
        Case Study <FaArrowRight />
      </Button>
    </GlassCard>
  );
}