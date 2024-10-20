import React from "react";

const Contact = () => {
  // Randomly generated contact numbers
  const generateRandomNumber = () => {
    return `+91 ${Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, "0")}`;
  };

  const locations = [
    { city: "Delhi", address: "XYZ Hospital, Connaught Place, Delhi" },
    { city: "Mumbai", address: "XYZ Hospital, Andheri, Mumbai" },
    { city: "Kolkata", address: "XYZ Hospital, Park Street, Kolkata" },
    { city: "Chennai - Alwarpet", address: "XYZ Hospital, Alwarpet, Chennai" },
    {
      city: "Chennai - Radial Road",
      address: "XYZ Hospital, Radial Road, Chennai",
    },
    {
      city: "Chennai - Vadapalani",
      address: "XYZ Hospital, Vadapalani, Chennai",
    },
    { city: "Trichy - Tennur", address: "XYZ Hospital, Tennur, Trichy" },
    {
      city: "Trichy - Cantonment",
      address: "XYZ Hospital, Cantonment, Trichy",
    },
    { city: "Trichy - Heartcity", address: "XYZ Hospital, Heartcity, Trichy" },
    {
      city: "Maa Kauvery Trichy",
      address: "XYZ Hospital, Maa Kauvery, Trichy",
    },
    { city: "Hosur", address: "XYZ Hospital, Hosur" },
    { city: "Salem", address: "XYZ Hospital, Salem" },
    {
      city: "Chennai - Corporate Office",
      address: "XYZ Hospital, Corporate Office, Chennai",
    },
    { city: "Bengaluru", address: "XYZ Hospital, Bengaluru" },
    { city: "Tirunelveli", address: "XYZ Hospital, Tirunelveli" },
  ];

  return (
    <main>
      <div className="contact-container">
        <h1>Contact XYZ Hospital</h1>
        <table className="contact-table">
          <thead>
            <tr className="table-header">
              <th>City</th>
              <th>Address</th>
              <th>Doctor Appointments / Emergency</th>
              <th>Patient Admission & Liaison Services</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.city}>
                <td>{location.city}</td>
                <td>{location.address}</td>
                <td>{generateRandomNumber()}</td>
                <td>{generateRandomNumber()}</td>
                <td>{location.city.toLowerCase()}info@xyzhospital.com</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Contact;
