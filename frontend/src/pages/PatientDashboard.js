import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RegularAppointment from "../components/RegularAppointment";
import AppointmentHistory from "../components/AppointmentHistory";

const PatientDashboard = ({ setIsLoggedIn }) => {
  const { id } = useParams(); // Get patient ID from URL
  const [userName, setUserName] = useState("");
  const [patient, setPatient] = useState(null); // Initialize patient as null
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch patient data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      try {
        const API_BASE_URL =
          process.env.REACT_APP_API_URL || "http://localhost:8081";
        const response = await axios.get(`${API_BASE_URL}/patient/${id}`);

        if (response.data) {
          setPatient(response.data);
          setUserName(`${response.data.firstname} ${response.data.lastname}`);
        } else {
          setError("No user data returned");
        }
      } catch (error) {
        setError("Failed to fetch user data");
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData(); // Fetch user data on component mount
  }, [id]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <main>
      <div className="programs-section">
        <div className="left-content">
          <div className="dashboard-container">
            {loading ? (
              <h2>Loading patient data...</h2> // Loading state
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p> // Error message
            ) : (
              <>
                <h1 style={{ fontSize: "40px" }}>
                  Welcome, {patient.firstname} {patient.lastname}!
                </h1>
                {patient ? (
                  <table className="patient-details">
                    <thead>
                      <tr>
                        <th>Detail</th>
                        <th>Information</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Patient information rows */}
                      <tr>
                        <td>Email</td>
                        <td>{patient.email}</td>
                      </tr>
                      <tr>
                        <td>Room Number</td>
                        <td>{patient.roomnumber}</td>
                      </tr>
                      <tr>
                        <td>Weight</td>
                        <td>{patient.weight} kg</td>
                      </tr>
                      <tr>
                        <td>Height</td>
                        <td>{patient.height} cm</td>
                      </tr>
                      <tr>
                        <td>Age</td>
                        <td>{patient.age} years</td>
                      </tr>
                      <tr>
                        <td>Blood Group</td>
                        <td>{patient.bloodgroup}</td>
                      </tr>
                      <tr>
                        <td>DOB</td>
                        <td>{patient.DOB}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{patient.gender}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{patient.city}</td>
                      </tr>
                      <tr>
                        <td>Contact</td>
                        <td>{patient.contact}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p>No patient data available</p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="right-content">
          {/* Pass setAppointments to RegularAppointment */}
          {patient && (
            <RegularAppointment
              patient={patient}
              setAppointments={setAppointments}
            />
          )}
        </div>
      </div>

      <div className="appointment-history-container">
        <div style={{ overflowX: "auto" }}>
          <div>
            <h2>Appointment History</h2>
          </div>

          {/* Pass appointments and setAppointments */}
          {patient && (
            <AppointmentHistory
              patient={patient}
              appointments={appointments}
              setAppointments={setAppointments}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default PatientDashboard;
