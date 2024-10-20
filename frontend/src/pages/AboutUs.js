import React from "react";

const AboutUs = () => {
  return (
    <main>
      <div className="about-us-container">
        {/* Top Section: Overview and 30+ Years in one div */}
        <div className="overview-experience-container">
          <div className="overview">
            <h2>Experience World-Class Care at XYZ Hospital</h2>
            <div className="years-experience">
              <img src="/images/anniversary.png" alt="anniversary.png" />
            </div>
          </div>
        </div>

        {/* Middle Section: About and Vision & Mission */}
        <div className="middle-section">
          <div className="about">
            <p>
              XYZ Hospital launched its first hospital over two decades ago with
              a vision to create world-class healthcare facilities that are
              affordable for everyone. The journey began in 1999, when the
              founding doctors opened a 30-bed hospital in Trichy, aiming to
              provide ‘best-in-class healthcare, with a personal touch.’ At the
              time, this was a groundbreaking concept for a tier 2 city like
              Trichy, which lacked a tertiary care hospital.
            </p>
            <p>
              Since then, XYZ has grown into a multi-specialty hospital chain
              with <strong>2250+ beds</strong> across six locations, including
              Trichy, Chennai, Salem, Hosur, Tirunelveli, and Bengaluru. With
              twelve hospitals and a dedicated workforce of over 8000+
              employees, XYZ continues its mission of delivering high-quality
              secondary and tertiary care to the communities it serves.
            </p>
          </div>

          <div className="vision-mission">
            <h2>Our Vision</h2>
            <p>To be the most respected and trusted healthcare provider.</p>

            <h2>Our Mission</h2>
            <p>
              To make great healthcare affordable for everyone, by staying
              committed to our core values:
            </p>
          </div>
        </div>
        <div className="bottom-section">
          <div className="values-section">
            <h2>Our Values</h2>
            <ul>
              <li>Continual Improvement</li>
              <li>Heartfelt Personal Touch</li>
              <li>Ethical</li>
              <li>Empathetic Care</li>
              <li>Real Accountability</li>
              <li>Service Excellence</li>
            </ul>
          </div>
          <div className="group-section">
            <div className="grp-content">
              <h2> XYZ Group of Hospitals</h2>
              <p>
                XYZ Hospital is a leading, multi-speciality hospital offering
                best-in-class medical services for nearly 2 decades. With
                paramount focus on patient care, patient safety and patient
                satisfaction, we are committed to offer exemplary medical
                services going beyond the norm of healthcare.
              </p>
            </div>
            <div className="group-img">
              <img src="/images/hospital.jpg" alt="hospital.jpg" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
