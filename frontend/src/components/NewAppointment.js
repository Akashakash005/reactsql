import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NewAppointment() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    doctorname: "",
    department: "",
    city: "",
    date: "",
    contact: "",
    email: "",
    status: "pending..",
  });
  const [departmentsData, setDepartmentsData] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
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
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "Making API request to:",
        `${process.env.REACT_APP_API_URL}/new-appointment`
      );

      const apiUrl = process.env.REACT_APP_API_URL;
      console.log("API Base URL:", apiUrl);
      const response = await axios.post(`${apiUrl}/new-appointment`, formData);
      // Handle the response

      if (response.status === 200) {
        alert("Appointment Booked successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          department: "",
          doctorname: "",
          city: "",
          date: "",
          contact: "",
          email: "",
          status: "pending..",
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
    <main>
      <div className="registration-form">
        <h1>Patient Appointment Form</h1>
        <form className="registrationForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name: </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname} // Use formData to include in submission
              onChange={handleInputChange} // Allow changes
              required // Make it required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name: </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname} // Use formData to include in submission
              onChange={handleInputChange} // Allow changes
              required // Make it required
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
            <label htmlFor="date">Contact: </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          color: "black",
          padding: "20px",
        }}
      >
        <p>For old patients </p>

        <Link style={{ marginLeft: "10px" }} to={"/login"}>
          {" "}
          click here
        </Link>
      </div>
    </main>
  );
}
