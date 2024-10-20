import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/departments.json"); // Adjust the path as needed
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <main className="body-content">
      <h2 className="section-head">Department</h2>

      <div className="home-container">
        {departments.map((department) => (
          <div className="home-card" key={department.id}>
            <img src={department.image} alt={department.name} />
            <h2>{department.name}</h2>
            <p>{department.description}</p>
            <p>
              <strong>Contact:</strong> {department.contact}
            </p>
            <p>
              <strong>Location:</strong> {department.location}
            </p>
            <p>
              <strong>Hours:</strong> {department.hours}
            </p>
            <p>
              <strong>Services:</strong> {department.services.join(", ")}
            </p>

            <Link to="/new-appointment">
              <button type="button">Schedule Appointment</button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Department;
