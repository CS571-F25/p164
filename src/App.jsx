import { HashRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ProjectEditor from "./pages/admin/ProjectEditor";
import ProfileEditor from "./pages/admin/ProfileEditor";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <NavBar />
          {/* FIX: Added paddingTop: "120px" to push content below the floating navbar */}
          <main style={{ flex: 1, paddingBottom: "2rem", paddingTop: "120px" }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route path="/admin/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
              } />
              <Route path="/admin/profile" element={
                <ProtectedRoute><ProfileEditor /></ProtectedRoute>
              } />
              <Route path="/admin/create" element={
                <ProtectedRoute><ProjectEditor /></ProtectedRoute>
              } />
              <Route path="/admin/edit/:id" element={
                <ProtectedRoute><ProjectEditor /></ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;