import { createContext, useState, useEffect, useContext } from "react";
import { initialProjects, profileData } from "../data/mockData";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  // --- Projects State ---
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("devfolio_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // --- Profile State (NEW) ---
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("devfolio_profile");
    return saved ? JSON.parse(saved) : profileData;
  });

  useEffect(() => {
    localStorage.setItem("devfolio_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("devfolio_profile", JSON.stringify(profile));
  }, [profile]);

  // Project CRUD
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

  // Profile Update (NEW)
  const updateProfile = (newProfileData) => {
    setProfile(newProfileData);
  };

  return (
    <DataContext.Provider value={{ 
      projects, addProject, updateProject, deleteProject, getProject,
      profile, updateProfile 
    }}>
      {children}
    </DataContext.Provider>
  );
}