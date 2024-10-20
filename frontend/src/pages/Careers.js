import React from "react";

const Careers = () => {
  return (
    <main>
      <div className="careers-container">
        <h1>Careers at XYZ Hospital</h1>
        <p className="intro-text">
          Join our team of dedicated healthcare professionals at XYZ Hospital,
          where you can make a difference in the lives of patients while
          advancing your career. Explore the opportunities we offer and become
          part of our mission to provide quality care for all.
        </p>

        <div className="job-listing">
          <h2>Current Openings</h2>

          <div className="job-item">
            <h3>Registered Nurse (Full-Time)</h3>
            <p>
              We are looking for compassionate and skilled nurses to join our
              team. You will provide patient care, administer medications, and
              collaborate with physicians to ensure the best outcomes.
            </p>
            <h4>Requirements:</h4>
            <ul>
              <li>Valid nursing license</li>
              <li>2+ years of experience in a hospital setting</li>
              <li>Excellent communication and teamwork skills</li>
            </ul>
            <button className="apply-button">Apply Now</button>
          </div>

          <div className="job-item">
            <h3>Medical Laboratory Technician (Full-Time)</h3>
            <p>
              Join our diagnostic team as a lab technician, conducting tests and
              providing accurate results that aid in patient treatment.
            </p>
            <h4>Requirements:</h4>
            <ul>
              <li>Degree in Medical Laboratory Technology</li>
              <li>Experience with lab testing equipment</li>
              <li>Strong attention to detail</li>
            </ul>
            <button className="apply-button">Apply Now</button>
          </div>

          <div className="job-item">
            <h3>Administrative Assistant (Part-Time)</h3>
            <p>
              We are seeking an organized and detail-oriented individual to
              assist with administrative tasks in our busy hospital environment.
            </p>
            <h4>Requirements:</h4>
            <ul>
              <li>Previous administrative experience</li>
              <li>Strong organizational skills</li>
              <li>Proficiency in MS Office</li>
            </ul>
            <button className="apply-button">Apply Now</button>
          </div>
        </div>

        <div className="why-join-us">
          <h2>Why Join Us?</h2>
          <p>
            At XYZ Hospital, we foster a culture of care, teamwork, and
            professional growth. Whether you are a healthcare professional or
            supporting staff, you'll find opportunities to enhance your skills
            and make a real impact. We offer:
          </p>
          <ul>
            <li>Competitive salaries and benefits</li>
            <li>Professional development and training programs</li>
            <li>Collaborative and supportive work environment</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Careers;
