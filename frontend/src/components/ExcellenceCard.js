export default function ExcellenceCard() {
  return (
    <div className="body-content">
      <div className="excellence">
        <h2>Centres of Excellence</h2>
      </div>

      <div className="home-container">
        {/* <!-- First Card --> */}
        <div className="home-card">
          <img src="./images/cardiology.jpg" alt="Cardiology" />
          <h2>Cardiology</h2>
          <p>Providing comprehensive cardiac care.</p>
        </div>

        {/* <!-- Second Card --> */}
        <div className="home-card">
          <img src="./images/oncology.jpg" alt="Oncology" />
          <h2>Oncology</h2>
          <p>Advanced cancer treatment and care.</p>
        </div>

        {/* <!-- Third Card --> */}
        <div className="home-card">
          <img src="./images/nephrology.jpg" alt="Nephrology and Urology" />
          <h2>Nephrology and Urology</h2>
          <p>Expert care for kidney and urinary tract diseases.</p>
        </div>

        {/* <!-- Fourth Card --> */}
        <div className="home-card">
          <img src="./images/orthopaedics.jpg" alt="Orthopaedics" />
          <h2>Orthopaedics</h2>
          <p>Specialized bone and joint treatment.</p>
        </div>

        {/* <!-- Fifth Card --> */}
        <div className="home-card">
          <img src="./images/neurology.jpg" alt="Neurology" />
          <h2>Neurology</h2>
          <p>Comprehensive neurological care.</p>
        </div>

        {/* <!-- Sixth Card --> */}
        <div className="home-card">
          <img src="./images/gastroenterology.jpg" alt="Gastroenterology" />
          <h2>Gastroenterology</h2>
          <p>Expertise in digestive system health.</p>
        </div>
      </div>
    </div>
  );
}
