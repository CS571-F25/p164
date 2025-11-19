import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {HashRouter, Routes, Route} from 'react-router'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Projects from "./pages/Projects";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {

  return <HashRouter>
    <NavBar />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
  </HashRouter>
}

export default App
