import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import ProjectCard from "../components/ProjectCard";
import Hero from "../components/Hero";
import GlassCard from "../components/GlassCard";
import { FaCode, FaLayerGroup, FaMobileAlt } from "react-icons/fa";

export default function Home() {
  const { projects, profile } = useData();
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const navigate = useNavigate();

  return (
    <>
      <Hero />

      {/* Services / Skills Section */}
      <Container className="mb-5">
        <Row className="g-4">
          {[
            { icon: <FaCode/>, title: "Frontend", desc: "React, Vue, & Framer Motion" },
            { icon: <FaLayerGroup/>, title: "Backend", desc: "Node, Python, & SQL" },
            { icon: <FaMobileAlt/>, title: "Mobile", desc: "React Native & iOS" }
          ].map((item, idx) => (
            <Col md={4} key={idx}>
              <GlassCard delay={idx * 0.2} className="text-center py-5">
                <div className="fs-1 text-primary mb-3">{item.icon}</div>
                <h4>{item.title}</h4>
                <p className="text-muted m-0">{item.desc}</p>
              </GlassCard>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Projects */}
      <section id="work" className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <h6 className="text-uppercase text-primary fw-bold">Selected Work</h6>
              <h2 className="display-5">Featured Projects</h2>
            </div>
            <Link to="/projects" className="text-decoration-none fw-bold fs-5">View All &rarr;</Link>
          </div>
          
          <Row className="g-4">
            {featured.map((p, index) => (
               <Col key={p.id} md={4}>
                 <ProjectCard project={p} index={index} onOpen={(proj) => navigate(`/projects/${proj.id}`)} /> 
               </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact CTA */}
      <Container className="py-5 mb-5">
        <GlassCard className="text-center py-5 bg-dark text-white" style={{ background: "linear-gradient(135deg, #1d1d1f 0%, #434343 100%)" }}>
          <h2 className="text-white mb-3">Ready to start a project?</h2>
          <p className="text-white-50 mb-4 fs-5">I'm currently available for freelance work and internships.</p>
          <a href={`mailto:${profile.email}`} className="btn btn-light btn-lg rounded-pill px-5">
            Let's Talk
          </a>
        </GlassCard>
      </Container>
    </>
  );
}