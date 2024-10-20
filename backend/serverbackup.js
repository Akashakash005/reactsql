const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer"); //to send mail

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail", // or use any other email provider (e.g., Outlook, Yahoo)
  auth: {
    user: "drdavidjacob1999@gmail.com",
    pass: "ybyx pxdg nstn bcdg",
  },
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Asd!123",
  database: "login",
});

// DELETE endpoint to remove a patient by ID
app.delete("/delete/:id", (req, res) => {
  const patientId = req.params.id;

  // SQL query to delete the patient
  const deleteQuery = "DELETE FROM patient WHERE ID = ?";

  db.query(deleteQuery, [patientId], (error, results) => {
    if (error) {
      console.error("Error deleting patient:", error);
      return res.status(500).json({ error: "Error deleting patient" });
    }

    // Check if any rows were affected
    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Patient deleted successfully" });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  });
});

// Start t

// Add new patient
app.post("/add-patient", (req, res) => {
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

  // Step 1: Retrieve the highest ID
  db.query("SELECT MAX(id) AS maxId FROM patient", (err, result) => {
    if (err) {
      console.error("Error fetching max ID:", err);
      return res.status(500).json({ error: "Failed to get max ID" });
    }

    const newId = result[0].maxId ? result[0].maxId + 1 : 1; // Increment max ID or start at 1

    // Step 2: Insert the new patient with the incremented ID
    const insertQuery = `
      INSERT INTO patient (id, firstname, lastname, email, roomnumber, weight, height, age, bloodgroup, DOB, gender, city, address, contact,username,password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
    `;

    db.query(
      insertQuery,
      [
        newId,
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
      ],
      (err) => {
        if (err) {
          console.error("Error inserting patient:", err);
          return res.status(500).json({ error: "Failed to insert patient" });
        }
        console.log("Request Body:", req.body);

        res
          .status(200)
          .json({ message: "Patient added successfully", id: newId });
      }
    );
  });
});

//updating the user
app.put("/patient/:id", (req, res) => {
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

  // Ensure patientId is a number
  if (!Number.isInteger(Number(patientId))) {
    return res.status(400).json({ error: "Invalid patient ID" });
  }

  // Update query to modify patient details based on the patient ID
  const patientUpdate = `UPDATE patient 
                         SET firstname = ?, lastname = ?, email = ?, roomnumber = ?, weight = ?, height = ?, age = ?, bloodgroup = ?, DOB = ?, gender = ?, city = ?, address = ?, contact = ?
                         WHERE id = ?`;

  // Execute the update query with values from req.body
  db.query(
    patientUpdate,
    [
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
      patientId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating patient details", err);
        return res.status(500).json({ error: "Failed to update patient data" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Patient not found" });
      }

      res.status(200).json({ message: "Patient updated successfully" });
    }
  );
});

// app.get("/", (req, res) => {
//   returnres.json("from backend side");
// });

// Existing login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // First check in the admin table
  const adminSql = "SELECT * FROM admin WHERE username =? AND password = ?";
  db.query(adminSql, [username, password], (err, adminData) => {
    if (err) return res.json("error");

    if (adminData.length > 0) {
      // If found in admin table
      return res.json({
        message: "Login successful",
        user: adminData[0],
        role: "admin",
      });
    } else {
      // If not found in admin, check in the patient table
      const patientSql =
        "SELECT * FROM patient WHERE username =? AND password = ?";
      db.query(patientSql, [username, password], (err, patientData) => {
        if (err) return res.json("error");

        if (patientData.length > 0) {
          // If found in patient table
          return res.json({
            message: "Login successful",
            user: patientData[0],
            role: "patient",
          });
        } else {
          // If not found in both tables
          return res.json({
            message: "Login failed: incorrect username or password",
          });
        }
      });
    }
  });
});

// Fetch all patients
app.get("/patient", (req, res) => {
  const sql = "SELECT * FROM patient";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/patient/:id", (req, res) => {
  const sql = "SELECT * FROM patient WHERE ID = ?"; // Assuming you want to fetch from the patient table
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: "Database query error" });
    if (data.length > 0) {
      return res.json(data[0]); // Return the user details
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
});

//appointmenthistory of particular patient
app.get("/appointment-history/:id", (req, res) => {
  const sql = "SELECT * FROM regular_appointment WHERE ID = ?"; // Assuming you want to fetch from the appointment table

  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: "Database query error" });
    if (data.length > 0) {
      return res.json(data);
      // Return all appointments for the user
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
});

//appointmenthistory of all patient
app.get("/appointment-history", (req, res) => {
  const sql = "SELECT * FROM regular_appointment "; // Assuming you want to fetch from the appointment table

  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: "Database query error" });
    if (data.length > 0) {
      return res.json(data); // Return all appointments for the user
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
});

app.get("/admin/:id", (req, res) => {
  const sql = "SELECT * FROM admin WHERE ID = ?"; // Assuming you want to fetch from the patient table
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: "Database query error" });
    if (data.length > 0) {
      return res.json(data[0]); // Return the user details
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
});

// Add new regular appointment
app.post("/regular-appointment/:id", (req, res) => {
  const { firstname, lastname, department, doctorname, city, date, status } =
    req.body;
  const patientId = req.params.id; // Get patient ID from URL parameters
  db.query(
    "SELECT MAX(appointment_no) AS maxNo FROM regular_appointment",
    (err, result) => {
      if (err) {
        console.error("Error fetching max No.:", err);
        return res.status(500).json({ error: "Failed to get max No." });
      }

      const newNo = result[0].maxNo ? result[0].maxNo + 1 : 1; // Increment max ID or start at 1

      const insertQuery = `
  INSERT INTO regular_appointment (appointment_no,id, firstname, lastname, department,doctorname ,city , date , status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
      db.query(
        insertQuery,
        [
          newNo,
          patientId,
          firstname,
          lastname,
          department,
          doctorname,
          city,
          date,
          status,
        ],
        (err) => {
          if (err) {
            console.error("Error inserting appontment:", err);
            return res
              .status(500)
              .json({ error: "Failed to Book an appointment " });
          }
          console.log("Request Body:", req.body);

          res.status(200).json({
            message: "appointment booked successfully!",
            id: patientId,
          });
        }
      );
    }
  );
});

// Add new new-appointment
app.post("/new-appointment", (req, res) => {
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
  
  - Department :${department}
  - Doctor: ${doctorname}
  - City: ${city}
  - Date: ${date}
  - Contact: ${contact}
  - Email: ${email}
  - Status: ${status}
  
  Thank you for choosing our service.
  
  Best regards,
  Jacob Hospital
  `,
  };

  db.query(
    "SELECT MAX(appointment_no) AS maxNo FROM new_appointment",
    (err, result) => {
      if (err) {
        console.error("Error fetching max No.:", err);
        return res.status(500).json({ error: "Failed to get max No." });
      }

      const newNo = result[0].maxNo ? result[0].maxNo + 1 : 1; // Increment max ID or start at 1

      const insertQuery = `
      INSERT INTO new_appointment (appointment_no, firstname, lastname,department, doctorname ,city , date ,contact,email ,status)
      VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;
      db.query(
        insertQuery,
        [
          newNo,
          firstname,
          lastname,
          department,
          doctorname,
          city,
          date,
          contact,
          email,
          status,
        ],
        (err) => {
          if (err) {
            console.error("Error inserting appointment:", err);
            return res
              .status(500)
              .json({ error: "Failed to book an appointment" });
          }
          if (email) {
            // Send email after the appointment is inserted
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                return res.status(500).json({ error: "Error sending email" });
              } else {
                console.log("Email sent: " + info.response);
                return res
                  .status(200)
                  .json({ message: "Appointment booked and email sent" });
              }
            });
          } else {
            // If no email is provided, simply return the success message without sending an email
            return res
              .status(200)
              .json({ message: "Appointment booked (No email sent)" });
          }
        }
      );
    }
  );
});

// Approval of appointment
app.put("/appointments/:appointment_no", (req, res) => {
  const { status } = req.body; // Get the new status from the request body
  const sql =
    "UPDATE regular_appointment SET status = ? WHERE appointment_no = ?";

  db.query(sql, [status, req.params.appointment_no], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database update error" });
    }
    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Appointment updated successfully" });
    } else {
      return res.status(404).json({ message: "Appointment not found" });
    }
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
