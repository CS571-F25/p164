import { Container, Row, Col, Button } from "react-bootstrap";
import { useData } from "../contexts/DataContext"; // Change import
import { motion } from "framer-motion";
import { FaGithub, FaChevronDown } from "react-icons/fa";

export default function Hero() {
  const { profile } = useData(); // Use context

  return (
    <section style={{ minHeight: "90vh", display: "flex", alignItems: "center", position: "relative" }}>
      <Container>
        <Row className="align-items-center">
          <Col lg={7}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h5 className="text-uppercase text-secondary mb-3" style={{ letterSpacing: "3px" }}>Portfolio_V2.0</h5>
              <h1 className="display-1 fw-bold mb-3" style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {profile.name}
              </h1>
              <h2 className="h1 mb-4 text-dark">{profile.title}</h2>
              <p className="lead mb-5 text-secondary" style={{ maxWidth: "500px" }}>
                {profile.bio}
              </p>
              
              <div className="d-flex gap-3">
                <Button variant="dark" size="lg" className="rounded-pill px-4" href="#work">
                  View Work
                </Button>
                <Button variant="outline-dark" size="lg" className="rounded-pill px-4 btn-icon" href={profile.github} target="_blank">
                  <FaGithub className="me-2"/> GitHub
                </Button>
              </div>
            </motion.div>
          </Col>
          
          <Col lg={5} className="d-none d-lg-block text-center">
            <motion.div 
              className="glass-panel p-3 d-inline-block animate-float"
              style={{ borderRadius: "40px", transform: "rotate(-5deg)" }}
            >
               <img 
                 src={profile.avatar || "https://placehold.co/400x500/png?text=Your+Photo"} 
                 alt={profile.name} 
                 style={{ borderRadius: "30px", width: "100%", maxWidth: "350px", objectFit: "cover" }} 
               />
            </motion.div>
          </Col>
        </Row>
      </Container>
      
      <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)" }} className="animate-float">
        <FaChevronDown size={24} color="#aaa" />
      </div>
    </section>
  );
}