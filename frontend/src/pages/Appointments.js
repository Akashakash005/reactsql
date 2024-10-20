import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@blueprintjs/core";

export default function Appointments() {
  const [patients, setPatients] = useState([]); // State to hold appointment data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/appointment-history`
        );

        if (res.data) {
          setPatients(res.data); // Set the fetched data to the state
        } else {
          console.error("No patient data returned");
        }
      } catch (error) {
        console.error("Failed to fetch patient data", error);
        setError("Failed to fetch appointment data."); // Set error state
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
    return <div>{error}</div>; // Error state
  }

  const handleUpdate = async (appointmentno) => {
    const patient = patients.find(
      (patient) => patient.appointment_no === appointmentno
    );
    if (!patient) return;

    // Update the patient status to 'Approved'
    const updatedPatient = { ...patient, status: "Approved" };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/appointments/${patient.appointment_no}`,
        updatedPatient
      );

      if (response.status === 200) {
        console.log("Appointment approved successfully:", response.data);

        // Update the local state to reflect the status change
        setPatients((prevPatients) =>
          prevPatients.map((p) =>
            p.appointment_no === patient.appointment_no
              ? { ...p, status: "Approved" }
              : p
          )
        );
      } else {
        console.error("Failed to approve appointment");
      }
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  return (
    <main>
      <h2>Registered Appointments</h2>
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
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th> {/* Added Action column for the button */}
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((data) => (
                <tr key={data.appointment_no}>
                  <td>{data.appointment_no}</td>
                  <td>{data.ID}</td>
                  <td>{data.firstname}</td>
                  <td>{data.lastname}</td>
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
                    >
                      Approve
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No appointment data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
