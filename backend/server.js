const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const sql = require("mssql");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Nodemailer configuration for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// MySQL Database connection for Azure
const config = {
  server: "sqlakashserver1.database.windows.net", // Azure SQL Database hostname
  port: 1433, // Default port for SQL Server
  database: "sqldemodata", // The name of your database
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: false, // Set to true if you have issues with certificates
  },
};

sql
  .connect(config)
  .then((pool) => {
    console.log("Connected to the SQL database!");
    return pool
      .request() // Create a request from the pool
      .query("SELECT * FROM patient"); // Replace 'your_table_name' with the actual table name
  })
  .then((result) => {
    console.log("Query results:", result.recordset);
  })
  .catch((err) => {
    console.error("Database connection or query failed:", err);
  });

// =========================================
// PATIENT MANAGEMENT
// =========================================

// Fetch all patients
app.get("/patient", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM patient");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get patient by ID
app.get("/patient/:id", async (req, res) => {
  try {
    const pool = await sql.connect(config); // Connect to the database
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id) // Use parameterized queries to avoid SQL injection
      .query("SELECT * FROM patient WHERE ID = @id"); // Use the parameter in your query

    if (result.recordset.length > 0) {
      return res.json(result.recordset[0]);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ error: "Database query error" });
  }
});

// Add new patient
app.post("/add-patient", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    roomnumber,
    weight,
    height,
    age,
    bloodgroup,
    DOB,
    gender,
    city,
    address,
    contact,
    username,
    password,
  } = req.body;

  // Insert new patient
  const insertQuery = `
      INSERT INTO patient (firstname, lastname, email, roomnumber, weight, height, age, bloodgroup, DOB, gender, city, address, contact, username, password)
      VALUES (@firstname, @lastname, @email, @roomnumber, @weight, @height, @age, @bloodgroup, @DOB, @gender, @city, @address, @contact, @username, @password)
  `;

  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("firstname", sql.VarChar, firstname)
      .input("lastname", sql.VarChar, lastname)
      .input("email", sql.VarChar, email)
      .input("roomnumber", sql.Int, roomnumber)
      .input("weight", sql.Int, weight)
      .input("height", sql.Int, height)
      .input("age", sql.Int, age)
      .input("bloodgroup", sql.VarChar, bloodgroup)
      .input("DOB", sql.VarChar, DOB)
      .input("gender", sql.VarChar, gender)
      .input("city", sql.VarChar, city)
      .input("address", sql.VarChar, address)
      .input("contact", sql.VarChar, contact)
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .query(insertQuery);

    res.status(200).json({ message: "Patient added successfully" });
  } catch (err) {
    console.error("Error inserting patient:", err);
    return res.status(500).json({ error: "Failed to insert patient" });
  }
});

// Update patient
app.put("/patient/:id", async (req, res) => {
  const patientId = req.params.id;
  const {
    firstname,
    lastname,
    email,
    roomnumber,
    weight,
    height,
    age,
    bloodgroup,
    DOB,
    gender,
    city,
    address,
    contact,
  } = req.body;

  // Update query
  const patientUpdate = `UPDATE patient 
                         SET firstname = @firstname, lastname = @lastname, email = @email, roomnumber = @roomnumber,
                         weight = @weight, height = @height, age = @age, bloodgroup = @bloodgroup, 
                         DOB = @DOB, gender = @gender, city = @city, address = @address, contact = @contact
                         WHERE ID = @id`;

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("firstname", sql.VarChar, firstname)
      .input("lastname", sql.VarChar, lastname)
      .input("email", sql.VarChar, email)
      .input("roomnumber", sql.Int, roomnumber)
      .input("weight", sql.Int, weight)
      .input("height", sql.Int, height)
      .input("age", sql.Int, age)
      .input("bloodgroup", sql.VarChar, bloodgroup)
      .input("DOB", sql.VarChar, DOB)
      .input("gender", sql.VarChar, gender)
      .input("city", sql.VarChar, city)
      .input("address", sql.VarChar, address)
      .input("contact", sql.VarChar, contact)
      .input("id", sql.Int, patientId)
      .query(patientUpdate);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json({ message: "Patient updated successfully" });
  } catch (err) {
    console.error("Error updating patient details:", err);
    return res.status(500).json({ error: "Failed to update patient data" });
  }
});

// DELETE a patient by ID
app.delete("/delete/:id", async (req, res) => {
  const patientId = req.params.id;

  // SQL query to delete the patient
  const deleteQuery = "DELETE FROM patient WHERE ID = @id";

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id", sql.Int, patientId)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Patient deleted successfully" });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res.status(500).json({ error: "Error deleting patient" });
  }
});

// =========================================
// APPOINTMENT MANAGEMENT
// =========================================

app.get("/appointment-history", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query("SELECT * FROM regular_appointment");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get appointment history for a particular patient

app.get("/appointment-history/:id", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM regular_appointment WHERE ID = @id"); // Assuming `user_id` is the column representing the user

    if (result.recordset.length > 0) {
      return res.json(result.recordset); // Return all matching records
    } else {
      return res.status(404).json({ message: "No appointments found" });
    }
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ error: "Database query error" });
  }
});

// Add new regular appointment
// Add new regular appointment using MSSQL
app.post("/regular-appointment/:id", async (req, res) => {
  const { firstname, lastname, department, doctorname, city, date, status } =
    req.body;
  const patientId = req.params.id;

  try {
    // Connect to the MSSQL pool
    const pool = await sql.connect(config);

    // Query to insert a new appointment into the 'regular_appointment' table
    const insertQuery = `
      INSERT INTO regular_appointment (id, firstname, lastname, department, doctorname, city, date, status)
      VALUES (@patientId, @firstname, @lastname, @department, @doctorname, @city, @date, @status)
    `;

    // Prepare and execute the query
    await pool
      .request()
      .input("patientId", sql.Int, patientId) // id is assumed to be an integer
      .input("firstname", sql.NVarChar, firstname)
      .input("lastname", sql.NVarChar, lastname)
      .input("department", sql.NVarChar, department)
      .input("doctorname", sql.NVarChar, doctorname)
      .input("city", sql.NVarChar, city)
      .input("date", sql.Date, date) // Assuming 'date' is in proper format (YYYY-MM-DD)
      .input("status", sql.NVarChar, status)
      .query(insertQuery);

    // Send success response
    res.status(200).json({
      message: "Appointment booked successfully!",
      id: patientId,
    });
  } catch (err) {
    console.error("Error inserting appointment:", err);
    res.status(500).json({ error: "Failed to book an appointment" });
  }
});

// Approval of regular appointment

app.put("/appointments/:appointment_no", async (req, res) => {
  const { status } = req.body;

  try {
    // Connect to the database
    const pool = await sql.connect(config);

    // Parameterized query to prevent SQL injection
    const query = `
      UPDATE regular_appointment 
      SET status = @status 
      WHERE appointment_no = @appointment_no
    `;

    // Execute the query
    const result = await pool
      .request()
      .input("status", sql.VarChar, status) // Pass status value
      .input("appointment_no", sql.Int, req.params.appointment_no) // Pass appointment_no
      .query(query);

    // Check if any rows were affected
    if (result.rowsAffected[0] > 0) {
      return res
        .status(200)
        .json({ message: "Appointment updated successfully" });
    } else {
      return res.status(404).json({ message: "Appointment not found" });
    }
  } catch (err) {
    console.error("Database update error:", err);
    return res.status(500).json({ error: "Database update error" });
  }
});

// =========================================
// NEW APPOINTMENT MANAGEMENT
// =========================================

// Get new appointment history for all patients

app.get("/new-appointment-history", async (req, res) => {
  try {
    // Connect to the database
    const pool = await sql.connect(config);

    // Query to fetch data from new_appointment table
    const result = await pool.request().query("SELECT * FROM new_appointment");

    // Send the fetched data as the response
    return res.json(result.recordset);
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ error: "Database query error" });
  }
});

//add new unregistered appointment
app.post("/new-appointment", async (req, res) => {
  const {
    firstname,
    lastname,
    department,
    doctorname,
    city,
    date,
    contact,
    email,
    status,
  } = req.body;
  const mailOptions = {
    from: "drdavidjacob1999@gmail.com",
    to: email,
    subject: "Appointment Confirmation",
    text: `Dear ${firstname} ${lastname},
  
  Your appointment has been successfully booked. Here are the details:
  
  - **Department:** ${department}
  - **Doctor:** ${doctorname}
  - **City:** ${city}
  - **Date:** ${date}
  - **Contact:** ${contact}
  - **Email:** ${email}
  - **Status:** ${status}
  
  Please note that your appointment is currently waiting for confirmation. We will inform you once it has been approved.
  
  Thank you for choosing our service.
  
  Best regards,
  Jacob Hospital
  `,
  };

  try {
    const pool = await sql.connect(config);

    // Insert new appointment without specifying the identity column
    const insertQuery = `
      INSERT INTO new_appointment (firstname, lastname, department, doctorname, city, date, contact, email, status)
      VALUES (@firstname, @lastname, @department, @doctorname, @city, @date, @contact, @email, @status)
    `;

    await pool
      .request()
      .input("firstname", sql.VarChar, firstname)
      .input("lastname", sql.VarChar, lastname)
      .input("department", sql.VarChar, department)
      .input("doctorname", sql.VarChar, doctorname)
      .input("city", sql.VarChar, city)
      .input("date", sql.VarChar, date)
      .input("contact", sql.VarChar, contact)
      .input("email", sql.VarChar, email)
      .input("status", sql.VarChar, status)
      .query(insertQuery);

    // Send email if provided
    if (email) {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Error sending email" });
        } else {
          console.log("Email sent: " + info.response);
          return res
            .status(200)
            .json({ message: "Appointment booked and email sent" });
        }
      });
    } else {
      return res
        .status(200)
        .json({ message: "Appointment booked (No email sent)" });
    }
  } catch (err) {
    console.error("Error handling appointment:", err);
    return res.status(500).json({ error: "Database operation failed" });
  }
});

// Approval of new appointment

app.put("/new-appointments/:appointment_no", async (req, res) => {
  const {
    status,
    firstname,
    lastname,
    department,
    doctorname,
    city,
    date,
    contact,
    email, // Email is optional now
  } = req.body;

  const updateQuery =
    "UPDATE new_appointment SET status = @status WHERE appointment_no = @appointment_no";

  const mailOptions = {
    from: "drdavidjacob1999@gmail.com",
    to: email,
    subject: "Appointment Confirmation",
    html: `
      <p>Dear ${firstname} ${lastname},</p>
      <p>We are pleased to inform you that your appointment has been successfully approved.</p>
      <p>Details:</p>
      <ul>
        <li>Department: ${department}</li>
        <li>Doctor: ${doctorname}</li>
        <li>City: ${city}</li>
        <li>Date: ${date}</li>
        <li>Contact: ${contact}</li>
      </ul>
      <p>Thank you for choosing our hospital!</p>
      <p>Best regards,<br> XYZ Hospital Team</p>
    `,
  };

  try {
    // Connect to the database
    const pool = await sql.connect(config);

    // Update the appointment status
    const result = await pool
      .request()
      .input("status", sql.VarChar, status)
      .input("appointment_no", sql.Int, req.params.appointment_no)
      .query(updateQuery);

    if (result.rowsAffected > 0) {
      // Check if email is provided before sending
      if (email) {
        // Send email notification
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res
              .status(500)
              .json({ error: "Failed to send email notification" });
          }
          console.log("Email sent:", info.response);
          return res.status(200).json({
            message: "Appointment updated and email sent successfully",
          });
        });
      } else {
        // If no email provided, respond with success but without sending email
        return res.status(200).json({
          message: "Appointment updated successfully. No email sent.",
        });
      }
    } else {
      return res.status(404).json({ message: "Appointment not found" });
    }
  } catch (err) {
    console.error("Database update error:", err);
    return res.status(500).json({ error: "Database update error" });
  }
});

// =========================================
// ADMIN MANAGEMENT
// =========================================

//get admin by id
app.get("/admin/:id", async (req, res) => {
  try {
    const pool = await sql.connect(config); // Connect to the database
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id) // Use parameterized queries to avoid SQL injection
      .query("SELECT * FROM admin WHERE ID = @id"); // Use the parameter in your query

    if (result.recordset.length > 0) {
      return res.json(result.recordset[0]);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ error: "Database query error" });
  }
});

// =========================================
// LOGIN MANAGEMENT
// =========================================
// Existing login route
// Example POST /login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connect to MSSQL
    const pool = await sql.connect(config);

    // First check in the admin table
    const adminSql = `SELECT * FROM admin WHERE username = @username AND password = @password`;
    const adminData = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .query(adminSql);

    if (adminData.recordset.length > 0) {
      // If found in admin table
      const adminUser = adminData.recordset[0]; // Get the first record

      res.json({
        message: "Login successful",
        user: {
          ID: adminUser.ID, // Include ID if needed
          firstname: adminUser.firstname, // Updated to use firstname
          lastname: adminUser.lastname, // Include lastname if needed
          username: adminUser.username, // Include username if needed
        },
        role: "admin",
      });
    } else {
      // If not found in admin, check in the patient table
      const patientSql = `SELECT * FROM patient WHERE username = @username AND password = @password`;
      const patientData = await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("password", sql.VarChar, password)
        .query(patientSql);

      if (patientData.recordset.length > 0) {
        // If found in patient table
        const patientUser = patientData.recordset[0]; // Get the first record

        res.json({
          message: "Login successful",
          user: {
            ID: patientUser.ID, // Include ID if needed
            firstname: patientUser.firstname, // Updated to use firstname
            lastname: patientUser.lastname, // Include lastname if needed
            username: patientUser.username, // Include username if needed
          },
          role: "patient",
        });
      } else {
        // If not found in both tables
        res.json({
          message: "Login failed: incorrect username or password",
        });
      }
    }
  } catch (err) {
    // Handle database connection errors
    console.error("Database error: ", err);
    res.json({ error: "Database error occurred" });
  }
});

// Forgot password route
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check in the admin table
    const admin = await getUserByEmail(email, "admin");
    if (admin) {
      await sendOTPEmail(email, OTP); // Send the OTP to the admin's email
      return res.json({ message: "OTP has been sent to your email." });
    }

    // Check in the patient table
    const patient = await getUserByEmail(email, "patient");
    if (patient) {
      await sendOTPEmail(email, OTP); // Send the OTP to the patient's email
      return res.json({ message: "OTP has been sent to your email." });
    }

    // If user is not found in both tables
    return res.status(404).json({ message: "User not found." });
  } catch (error) {
    console.error("Error processing forgot password request:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

const OTP = "9874"; // Hardcoded OTP for demonstration purposes
let otpEmail; // Declare it outside of the function to use it globally
let sentOTPs = {}; // Initialize as an empty object

// Function to send OTP email
async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: "drdavidjacob1999@gmail.com",
    to: email,
    subject: "One-Time Password (OTP) for Password Reset",
    html: `
      <p>Dear User,</p>
      <p>We received a request to reset your password. To proceed with the password reset, please use the following One-Time Password (OTP):</p>
      <p style="font-size: 20px; font-weight: bold;">${otp}</p>
      <p>Please note that this OTP is valid for a limited time only. If you did not request a password reset, please ignore this email.</p>
      <p>Thank you for choosing our service.</p>
      <p>Best regards,<br>Jacob Hospital Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    sentOTPs[email] = otp; // Store the OTP for the email
    otpEmail = email; // Store the last email sent OTP
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Could not send OTP email.");
  }
}

// Endpoint to verify OTP
app.post("/verify-otp", (req, res) => {
  const { otp, email } = req.body;

  if (otp === OTP && email === otpEmail) {
    return res.status(200).json({ success: true, message: "OTP verified." });
  }
  return res.status(400).json({ success: false, message: "Invalid OTP." });
});

app.post("/reset-password", async (req, res) => {
  const { otp, newPassword } = req.body;

  // Verify the OTP (hardcoded for demonstration purposes)
  if (otp !== OTP) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  try {
    // Find the user by email (you need to get the email from the frontend)
    const email = req.body.email; // Make sure to send the email with OTP request
    const admin = await getUserByEmail(email, "admin");
    const patient = await getUserByEmail(email, "patient");

    if (admin) {
      // Update the password in the admin table
      await updateUserPassword(admin.ID, newPassword, "admin");
      return res.json({ message: "Password has been reset successfully." });
    }

    if (patient) {
      // Update the password in the patient table
      await updateUserPassword(patient.ID, newPassword, "patient");
      return res.json({ message: "Password has been reset successfully." });
    }

    return res.status(404).json({ message: "User not found." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Function to update user password in the specified table
async function updateUserPassword(id, newPassword, role) {
  const pool = await sql.connect(config);
  const query =
    role === "admin"
      ? `UPDATE admin SET password = @Password WHERE ID = @ID`
      : `UPDATE patient SET password = @Password WHERE ID = @ID`;

  await pool
    .request()
    .input("Password", sql.VarChar, newPassword)
    .input("ID", sql.Int, id)
    .query(query);
}
// Function to get user by email from your database

async function getUserByEmail(email, role) {
  try {
    const pool = await sql.connect(config); // Your DB connection config
    const query =
      role === "admin"
        ? `SELECT * FROM admin WHERE email = @Email`
        : `SELECT * FROM patient WHERE email = @Email`;

    const result = await pool
      .request()
      .input("Email", sql.VarChar, email) // Use the appropriate SQL data type
      .query(query); // Adjusted to use the correct query based on the role

    return result.recordset[0]; // Return the first user found
  } catch (err) {
    console.error("Database query error:", err);
    throw new Error("Database query error");
  }
}

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
