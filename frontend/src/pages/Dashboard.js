import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Button, EditableText } from "@blueprintjs/core";

const Dashboard = ({ setIsLoggedIn }) => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [patients, setPatients] = useState([]);

  //fetch the name by the id

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/${id}`
        );
        if (response.data) {
          setUserName(response.data.firstname);
          console.log(response.data.lastname);
        } else {
          console.error("No data returned");
        }
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      }
    };

    fetchUserData();
  }, [id]);

  //fetching the data of the patient
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/patient`);
        if (res.data) {
          setPatients(res.data);
        } else {
          console.error("No patient data returned");
        }
      } catch (error) {
        console.error("Failed to fetch patient data", error);
      }
    };

    fetchPatients();
  }, []);

  const onChangeHandler = (id, key, value) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.ID === id ? { ...patient, [key]: value } : patient
      )
    );
  };

  //handle update the patient
  const handleUpdate = async (id) => {
    const patient = patients.find((patient) => patient.ID === id);
    if (!patient) return;

    try {
      const response = await axios.put(
        `http://localhost:8081/patient/${patient.ID}`,
        patient
      );

      if (response.status === 200) {
        console.log("Patient updated successfully:", response.data);
      } else {
        console.error("Failed to update patient data");
      }
    } catch (error) {
      console.error("Error updating patient data", error);
    }
  };

  //delete the patient
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!confirmed) return;

    try {
      const response = await axios.delete(`http://localhost:8081/delete/${id}`);

      if (response.status === 200) {
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.ID !== id)
        );
        alert("Patient deleted successfully!");
      } else {
        console.error("Failed to delete patient data");
      }
    } catch (error) {
      console.error("Error deleting patient data", error);
    }
  };

  return (
    <main>
      <h2>Dashboard</h2>

      <div className="dashboard-container">
        <p>Welcome, {userName}!</p>
        <div className="dashboard-collection">
          <div className="dash-group">
            <label htmlFor="create">To create a patient details:</label>{" "}
            <Link to="/registration">
              <button>Click here</button>
            </Link>
          </div>
          <div className="dash-group">
            <label htmlFor="appointment">Registered appointments:</label>{" "}
            <Link to={`/dashboard/${id}/Appointments`}>
              <button>Click here</button>
            </Link>
          </div>
          <div className="dash-group">
            <label htmlFor="appointment">Unregistered appointments:</label>{" "}
            <Link to={`/dashboard/${id}/New-Appointments`}>
              <button>Click here</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="patient-list-container">
        <div>
          <div>
            <h2>Patient details</h2>
          </div>
          <div className="table">
            <table className="bp4-html-table ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Room Number</th>
                  <th>Weight</th>
                  <th>Height</th>
                  <th>Age</th>
                  <th>Blood Group</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <tr key={patient.ID}>
                      <td>{patient.ID}</td>
                      {[
                        "firstname",
                        "lastname",
                        "email",
                        "roomnumber",
                        "weight",
                        "height",
                        "age",
                        "bloodgroup",
                        "DOB",
                        "gender",
                        "city",
                        "address",
                        "contact",
                      ].map((field) => (
                        <td key={field}>
                          <EditableText
                            onChange={(value) =>
                              onChangeHandler(patient.ID, field, value)
                            }
                            value={patient[field]}
                            placeholder="Click to edit"
                          />
                        </td>
                      ))}

                      <td>
                        <Button
                          onClick={() => {
                            handleUpdate(patient.ID);
                          }}
                          intent="primary"
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            handleDelete(patient.ID);
                          }}
                          intent="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15">No patient data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
