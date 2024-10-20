import React from "react";
import "../styles/HealthPackages.css"; // Move one level up, then go to styles folder

const HealthPackages = () => {
  return (
    <main>
      <div className="packages-container">
        <h1>Comprehensive Health Packages</h1>
        <p className="intro-text">
          At XYZ Hospital, we believe in preventive healthcare and offer a range
          of comprehensive health packages designed to suit your unique needs.
          Explore our packages and take the first step towards a healthier life.
        </p>

        <table className="packages-table">
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Tests Included</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Health Check-Up</td>
              <td>
                Complete Blood Count (CBC), Blood Sugar Levels, Cholesterol
                Screening, Blood Pressure Measurement
              </td>
              <td>₹2,000</td>
              <td>
                <button className="book-button">Book Now</button>
              </td>
            </tr>
            <tr>
              <td>Comprehensive Health Check-Up</td>
              <td>
                Complete Blood Count (CBC), Liver Function Test (LFT), Kidney
                Function Test (KFT), ECG & Chest X-ray
              </td>
              <td>₹5,000</td>
              <td>
                <button className="book-button">Book Now</button>
              </td>
            </tr>
            <tr>
              <td>Women’s Wellness Package</td>
              <td>
                Pap Smear, Breast Ultrasound, Bone Density Test, Hormone Panel
              </td>
              <td>₹4,500</td>
              <td>
                <button className="book-button">Book Now</button>
              </td>
            </tr>
            <tr>
              <td>Senior Citizen Health Package</td>
              <td>
                Blood Sugar & Cholesterol, Bone Density Test, Heart Screening
                (ECG), Eye Examination
              </td>
              <td>₹6,000</td>
              <td>
                <button className="book-button">Book Now</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default HealthPackages;
