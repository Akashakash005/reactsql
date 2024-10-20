import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import "./styles/header.css";
// Header styles
import "./styles/aboutus.css"; // Importing the CSS file

import "./styles/animation.css"; // Animation styles
import "./styles/footer.css"; // Footer styles
import "./styles/appointment-form.css"; // Appointment Form styles
import "./styles/global.css";
import "./styles/check-form.css"; // Check Form styles
import "./styles/login-form.css"; // Login Form styles
import "./styles/table.css"; // Table styles
import "./styles/departments.css"; // Departments styles
import "./styles/careers.css"; // Careers styles
import "./styles/check-form.css";
import "./styles/dashboard-form.css";
import "./styles/home-card.css";
import "./styles/HealthPackages.css";
import "./styles/misc.css";
import "./styles/navbar.css";
import "./styles/blog.css";
import "./styles/patient-details.css";
import "./styles/programs-section.css";
import "./styles/registration-form.css";
import "./styles/NewsAndEvents.css";
import "./styles/contact.css";
import "./styles/main.css"; // Health Packages styles
// import "./styles/service.css"; // Service styles

import Header from "./components/Header";
import HeaderLogin from "./components/HeaderLogin";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";

import PatientDashboard from "./pages/PatientDashboard";
import Registration from "./pages/Registration";
import SignUp from "./pages/SignUp";
import Appointments from "./pages/Appointments";
import NewAppointment from "./components/NewAppointment";
import Departments from "./pages/Departments";
import UnregAppointments from "./pages/UnregAppointments";

import Services from "./pages/Services";
import Careers from "./pages/Careers";
import HealthPackages from "./pages/HealthPackages";
import Blog from "./pages/Blog";
import NewsAndEvents from "./pages/NewsAndEvents";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login status
  const [fullName, setFullName] = useState("");

  return (
    <div>
      <Router>
        {isLoggedIn ? (
          <HeaderLogin setIsLoggedIn={setIsLoggedIn} fullName={fullName} />
        ) : (
          <Header />
        )}{" "}
        {/* Conditional header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setFullName={setFullName} />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard/:id"
            element={<Dashboard setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/patientdashboard/:id"
            element={<PatientDashboard setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/registration" element={<Registration />} />
          <Route path="/new-appointment" element={<NewAppointment />} />
          <Route
            path="/dashboard/:id/appointments"
            element={<Appointments />}
          />
          <Route
            path="/dashboard/:id/new-appointments"
            element={<UnregAppointments />}
          />
          <Route path="/departments" element={<Departments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/health-packages" element={<HealthPackages />} />
          <Route path="/blog&journal" element={<Blog />} />
          <Route path="/news&events" element={<NewsAndEvents />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
