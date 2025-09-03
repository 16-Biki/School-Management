// frontend/src/pages/ShowSchools.jsx
import React, { useEffect, useState } from "react";
import "../index.css";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("❌ Error fetching schools:", err);
      }
    };
    fetchSchools();
  }, []);

  return (
    <div className="container-show">
      <h2>All Schools</h2>
      {schools.length === 0 ? (
        <p>No schools found</p>
      ) : (
        <div className="school-list">
          {schools.map((s) => (
            <div key={s.id} className="school-card">
              {s.image && (
                <img
                  src={`http://localhost:5000/schoolImages/${s.image}`}
                  alt={s.name}
                />
              )}
              <h3>{s.name}</h3>
              <p>{s.address}</p>
              <p>
                {s.city}, {s.state}
              </p>
              <p>📞 {s.contact}</p>
              <p>📧 {s.email_id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
