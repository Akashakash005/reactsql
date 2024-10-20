import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RegularAppointment({ patient, setAppointments }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    department: "",
    doctorname: "",
    city: "",
    date: "",
    status: "pending..",
    // Track selected department
  });

  const [departmentsData, setDepartmentsData] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Store filtered doctors

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch("/doctors.json")
      .then((response) => response.json())
      .then((data) => {
        setDepartmentsData(data); // Store full department and doctor data
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  useEffect(() => {
    if (patient) {
      setFormData((prevState) => ({
        ...prevState,
        firstname: patient.firstname || "",
        lastname: patient.lastname || "",
      }));
    }
  }, [patient]);

  // Handle department change and filter doctors
  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setFormData({
      ...formData,
      department: selectedDepartment,
    });

    // Find doctors in the selected department
    const departmentData = departmentsData.find(
      (dept) => dept.department === selectedDepartment
    );
    setFilteredDoctors(departmentData ? departmentData.doctors : []); // Set doctors or empty if none found
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/regular-appointment/${patient.ID}`,
        formData
      );

      if (response.status === 200) {
        const updatedAppointments = await axios.get(
          `${process.env.REACT_APP_API_URL}/appointment-history/${patient.ID}`
        );
        setAppointments(updatedAppointments.data);

        alert("Appointment Booked successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          doctorname: "",
          city: "",
          date: "",
          status: "pending..",
          department: "", // Reset department
        });
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred while booking an appointment.");
    }
  };

  return (
    <div>
      <div className="registration-form">
        <h1>Book appointment</h1>
        <form className="registrationForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name: </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name: </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department: </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleDepartmentChange} // Use the new handler
              required
            >
              <option value="">Select Department</option>
              {departmentsData.map((dept, index) => (
                <option key={index} value={dept.department}>
                  {dept.department}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="doctorname">Doctor name: </label>
            <select
              id="doctorname"
              name="doctorname"
              value={formData.doctorname}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Doctor</option>
              {/* Map through filteredDoctors array to display options */}
              {filteredDoctors.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">City: </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            >
              <option value="">Select city</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Madurai">Madurai</option>
              <option value="Kochi">Kochi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
