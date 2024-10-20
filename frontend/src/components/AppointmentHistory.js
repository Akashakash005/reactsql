import React, { useEffect } from "react";
import axios from "axios";

export default function AppointmentHistory({
  patient,
  appointments,
  setAppointments,
}) {
  useEffect(() => {
    const fetchAppointments = async () => {
      console.log("Patient ID:", patient.ID); // Check if the correct ID is being used
      console.log(
        "Making API request to:",
        `${process.env.REACT_APP_API_URL}/appointment-history/${patient.ID}`
      );

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/appointment-history/${patient.ID}`
        );

        console.log("Fetched Appointments Data:", res.data); // Log the data to check if appointments are fetched

        if (res.data) {
          setAppointments(res.data); // Wrap the object in an array
        } else {
          console.error("No appointment data returned");
        }
      } catch (error) {
        console.error("Failed to fetch appointment data", error);
      }
    };

    if (patient.ID) {
      // Ensure patient.ID exists before making the request
      fetchAppointments();
    }
  }, [patient.ID, setAppointments]);

  return (
    <div className="table-container">
      <table className="bp4-html-table modifier">
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
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((data) => (
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No appointment data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
