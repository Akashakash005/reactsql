//list of unregistered appointments

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@blueprintjs/core";

export default function Appointments() {
  const [patients, setPatients] = useState([]); // State to hold appointment data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [updating, setUpdating] = useState(false); // State to track if updating

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/new-appointment-history` // Use environment variable
        );
        if (res.data) {
          setPatients(res.data); // Set the fetched data to the state
        } else {
          setError("No patient data returned");
        }
      } catch (error) {
        setError("Failed to fetch appointment data."); // Set error state
        console.error("Failed to fetch patient data", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchPatients(); // Call the function to fetch patient data
  }, []); // Empty dependency array since we want to run this only once

  // Handle loading and error states
  if (loading) {
    return <div>Loading appointments...</div>; // Loading state
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Display error in red
  }

  const handleUpdate = async (appointmentno) => {
    setUpdating(true); // Start updating
    const patient = patients.find(
      (patient) => patient.appointment_no === appointmentno
    );
    if (!patient) return;

    // Update the patient status to 'Approved'
    const updatedPatient = { ...patient, status: "Approved" };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/new-appointments/${patient.appointment_no}`, // Use environment variable
        updatedPatient
      );

      if (response.status === 200) {
        console.log("Appointment approved successfully:", response.data);

        // Optimistically update the local state to reflect the status change
        setPatients((prevPatients) =>
          prevPatients.map((p) =>
            p.appointment_no === patient.appointment_no
              ? { ...p, status: "Approved" }
              : p
          )
        );
      } else {
        setError("Failed to approve appointment"); // Set error message
      }
    } catch (error) {
      console.error("Error updating data", error);
      setError("Error updating appointment."); // Set error message
    } finally {
      setUpdating(false); // End updating
    }
  };

  return (
    <main>
      <h2>Unregistered Appointments</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="table-container"
      >
        <table
          style={{ overflowX: "auto" }}
          className="bp4-html-table modifier"
        >
          <thead>
            <tr>
              <th>Appointment No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Department</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((data) => (
                <tr key={data.appointment_no}>
                  <td>{data.appointment_no}</td>
                  <td>{data.firstname}</td>
                  <td>{data.lastname}</td>
                  <td>{data.email}</td>
                  <td>{data.contact}</td>
                  <td>{data.department}</td>
                  <td>{data.doctorname}</td>
                  <td>{data.date}</td>
                  <td>{data.city}</td>
                  <td
                    style={{
                      color: data.status === "pending.." ? "red" : "green",
                    }}
                  >
                    {data.status}
                  </td>
                  <td>
                    <Button
                      onClick={() => handleUpdate(data.appointment_no)}
                      intent="primary"
                      disabled={updating} // Disable if updating
                    >
                      {updating ? "Approving..." : "Approve"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No appointment data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
