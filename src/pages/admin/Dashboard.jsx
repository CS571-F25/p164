import { Container, Table, Button, Badge, Row, Col } from "react-bootstrap";
import { useData } from "../../contexts/DataContext";
import { Link } from "react-router-dom";
import GlassCard from "../../components/GlassCard";
// ADDED FaUserEdit to the import below
import { FaPlus, FaEdit, FaTrash, FaLayerGroup, FaStar, FaCode, FaUserEdit } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { projects, deleteProject } = useData();

  // Calculate Stats
  const totalProjects = projects.length;
  const featuredCount = projects.filter(p => p.featured).length;
  const totalTech = new Set(projects.flatMap(p => p.technologies)).size;

  return (
    <Container className="py-5 mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold mb-0">Project Dashboard</h1>
          <p className="text-secondary mb-0">Manage your portfolio content</p>
        </div>
        <div className="d-flex gap-3">
            <Button 
            as={Link} 
            to="/admin/profile" 
            variant="light" 
            size="lg" 
            className="rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm border"
            >
            <FaUserEdit size={16} /> Edit Profile
            </Button>
            <Button 
            as={Link} 
            to="/admin/create" 
            variant="dark" 
            size="lg" 
            className="rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm"
            style={{ background: "var(--primary-gradient)", border: "none" }}
            >
            <FaPlus size={14} /> New Project
            </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <GlassCard className="d-flex align-items-center p-4">
            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3 text-primary">
              <FaLayerGroup size={24} />
            </div>
            <div>
              <h3 className="mb-0 fw-bold">{totalProjects}</h3>
              <small className="text-secondary text-uppercase fw-bold">Total Projects</small>
            </div>
          </GlassCard>
        </Col>
        <Col md={4}>
          <GlassCard className="d-flex align-items-center p-4">
            <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3 text-warning">
              <FaStar size={24} />
            </div>
            <div>
              <h3 className="mb-0 fw-bold">{featuredCount}</h3>
              <small className="text-secondary text-uppercase fw-bold">Featured</small>
            </div>
          </GlassCard>
        </Col>
        <Col md={4}>
          <GlassCard className="d-flex align-items-center p-4">
            <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3 text-success">
              <FaCode size={24} />
            </div>
            <div>
              <h3 className="mb-0 fw-bold">{totalTech}</h3>
              <small className="text-secondary text-uppercase fw-bold">Unique Techs</small>
            </div>
          </GlassCard>
        </Col>
      </Row>

      {/* Main Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="p-4 border-bottom bg-white bg-opacity-50">
          <h5 className="mb-0 fw-bold">All Projects</h5>
        </div>
        <Table hover responsive className="mb-0 align-middle text-nowrap" style={{ backgroundColor: 'transparent' }}>
          <thead className="bg-light">
            <tr>
              <th className="ps-4 py-3 text-secondary text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Project Title</th>
              <th className="py-3 text-secondary text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Tech Stack</th>
              <th className="py-3 text-secondary text-uppercase text-center" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Status</th>
              <th className="pe-4 py-3 text-secondary text-uppercase text-end" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? projects.map((p, index) => (
              <motion.tr 
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{ background: "transparent" }}
              >
                <td className="ps-4 py-3">
                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded-3 me-3" 
                      style={{ width: '40px', height: '40px', background: `url(${p.img}) center/cover`, backgroundColor: '#ddd' }} 
                    />
                    <span className="fw-bold text-dark">{p.title}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="d-flex gap-1 flex-wrap" style={{ maxWidth: '300px', whiteSpace: 'normal' }}>
                    {p.technologies.slice(0, 3).map(t => (
                      <Badge bg="light" text="dark" className="border" key={t}>{t}</Badge>
                    ))}
                    {p.technologies.length > 3 && <Badge bg="light" text="secondary" className="border">+{p.technologies.length - 3}</Badge>}
                  </div>
                </td>
                <td className="py-3 text-center">
                  {p.featured ? (
                    <Badge bg="success" className="rounded-pill px-3">Featured</Badge>
                  ) : (
                    <Badge bg="secondary" className="rounded-pill px-3 bg-opacity-25 text-secondary">Standard</Badge>
                  )}
                </td>
                <td className="pe-4 py-3 text-end">
                  <Button 
                    as={Link} 
                    to={`/admin/edit/${p.id}`} 
                    variant="link" 
                    className="text-primary p-2 me-1 hover-scale"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </Button>
                  <Button 
                    variant="link" 
                    className="text-danger p-2 hover-scale"
                    onClick={() => {
                      if(window.confirm('Are you sure you want to delete this project?')) deleteProject(p.id)
                    }}
                    title="Delete"
                  >
                    <FaTrash size={18} />
                  </Button>
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-muted">
                  No projects found. Click "New Project" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </GlassCard>
    </Container>
  );
}