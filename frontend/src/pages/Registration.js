import { useState } from "react";
import axios from "axios";

export default function Registration() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    roomnumber: "", // Change this key
    weight: "", // Change this key
    height: "", // Change this key
    age: "", // Change this key
    bloodgroup: "", // Change this key
    DOB: "", // Keep this key unchanged
    gender: "", // Change this key
    city: "",
    address: "", // Change this key
    contact: "", // Change this key
    username: "",
    password: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is a number
    const isNumberField = ["roomnumber", "weight", "height", "age"].includes(
      name
    );

    // Set the state with appropriate type
    setFormData({
      ...formData,
      [name]: isNumberField ? Number(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_BASE_URL =
        process.env.REACT_APP_API_URL || "http://localhost:8081";
      const response = await axios.post(
        `${API_BASE_URL}/add-patient`,
        formData
      );

      if (response.status === 200) {
        alert("Patient registered successfully!");
        // Reset form data
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          roomnumber: "",
          weight: "",
          height: "",
          age: "",
          bloodgroup: "",
          DOB: "", // Keep this key unchanged
          gender: "",
          city: "",
          address: "",
          contact: "",
          username: "",
          password: "",
        });
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred while registering the patient.");
    }
  };

  return (
    <main>
      <div className="registration-form">
        <h1>Patient Registration Form</h1>
        <form className="registrationForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email ID:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomnumber">Room Number:</label>
            <input
              type="number"
              id="roomnumber"
              name="roomnumber"
              value={formData.roomnumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bloodgroup">Blood Group:</label>
            <select
              id="bloodgroup"
              name="bloodgroup"
              value={formData.bloodgroup}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Blood group</option>
              <option value="B+">B +ve</option>
              <option value="B-">B -ve</option>
              <option value="A+">A +ve</option>
              <option value="A-">A -ve</option>
              <option value="AB+">AB +ve</option>
              <option value="AB-">AB -ve</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="DOB">DOB:</label>
            <input
              type="date"
              id="DOB"
              name="DOB"
              value={formData.DOB}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact:</label>
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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password" // Changed to password type for masking
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </main>
  );
}
