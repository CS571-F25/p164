import { createContext, useState, useEffect, useContext } from "react";
import { initialProjects } from "../data/mockData";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("devfolio_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  useEffect(() => {
    localStorage.setItem("devfolio_projects", JSON.stringify(projects));
  }, [projects]);

  // CRUD Operations
  const addProject = (proj) => {
    const newProject = { ...proj, id: Date.now() };
    setProjects([...projects, newProject]);
  };

  const updateProject = (updatedProj) => {
    setProjects(projects.map(p => p.id === updatedProj.id ? updatedProj : p));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const getProject = (id) => projects.find(p => p.id === parseInt(id));

  return (
    <DataContext.Provider value={{ projects, addProject, updateProject, deleteProject, getProject }}>
      {children}
    </DataContext.Provider>
  );
}