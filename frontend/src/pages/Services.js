import React from "react";

const Services = () => {
  return (
    <main className="services-container">
      <h1 className="section-head">Our Services</h1>
      <p className="intro-text">
        At XYZ Hospital, we offer a comprehensive range of medical services
        across multiple specialized departments. Our highly trained
        professionals are committed to providing exceptional healthcare tailored
        to the unique needs of each patient. Each department is equipped with
        state-of-the-art facilities and cutting-edge technology to ensure
        accurate diagnostics and effective treatments. We strive to deliver
        compassionate care, fostering a healing environment that promotes the
        well-being and recovery of our patients.
      </p>
      <div className="departments-list">
        <div className="department-item">
          <h2>Emergency Department</h2>
          <p>
            24/7 emergency care with immediate response to life-threatening
            conditions.
          </p>
          <h3>Services Offered:</h3>
          <ul>
            <li>Trauma Care</li>
            <li>Chest Pain Assessment</li>
            <li>Minor Surgery</li>
          </ul>
        </div>
        <div className="department-item">
          <h2>Cardiology</h2>
          <p>Comprehensive cardiovascular care for all ages.</p>
          <h3>Services Offered:</h3>
          <ul>
            <li>Echocardiograms</li>
            <li>Cardiac Catheterization</li>
            <li>Heart Failure Management</li>
          </ul>
        </div>

        <div className="department-item">
          <h2>Neurology Department</h2>
          <p>
            Expert care for neurological conditions, focusing on brain and
            nervous system health.
          </p>
          <h3>Services Offered:</h3>
          <ul>
            <li>EEG (Electroencephalogram)</li>
            <li>Stroke Management</li>
            <li>Neuromuscular Disorder Treatment</li>
          </ul>
        </div>

        <div className="department-item">
          <h2>Dermatology Department</h2>
          <p>
            Specialized care for skin, hair, and nail conditions, ensuring
            personalized treatment.
          </p>
          <h3>Services Offered:</h3>
          <ul>
            <li>Acne Treatment</li>
            <li>Skin Biopsies</li>
            <li>Laser Therapy for Skin Conditions</li>
          </ul>
        </div>

        <div className="department-item">
          <h2>Pediatrics</h2>
          <p>Specialized care for infants, children, and adolescents.</p>
          <h3>Services Offered:</h3>
          <ul>
            <li>Routine Check-ups</li>
            <li>Vaccinations</li>
            <li>Child Nutrition Counseling</li>
          </ul>
        </div>
        <div className="department-item">
          <h2>Orthopedics</h2>
          <p>Advanced treatment for musculoskeletal issues.</p>
          <h3>Services Offered:</h3>
          <ul>
            <li>Joint Replacement Surgery</li>
            <li>Physical Therapy</li>
            <li>Fracture Care</li>
          </ul>
        </div>
        <div className="department-item">
          <h2>Gynecology</h2>
          <p>Comprehensive women's health services.</p>
          <h3>Services Offered:</h3>
          <ul>
            <li>Annual Exams</li>
            <li>Family Planning</li>
            <li>Menopause Management</li>
          </ul>
        </div>
        <div className="department-item">
          <h2>Radiology</h2>
          <p>State-of-the-art imaging services for accurate diagnostics.</p>
          <h3>Services Offered:</h3>
          <ul>
            <li>X-rays</li>
            <li>CT Scans</li>
            <li>MRIs</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Services;
