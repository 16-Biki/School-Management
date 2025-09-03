// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddSchool from "./pages/AddSchool";
import ShowSchools from "./pages/ShowSchools";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Add School</Link>
        <Link to="/schools">Show Schools</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AddSchool />} />
        <Route path="/schools" element={<ShowSchools />} />
      </Routes>
    </BrowserRouter>
  );
}
