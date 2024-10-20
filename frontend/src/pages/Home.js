import ExcellenceCard from "../components/ExcellenceCard";

export default function Home() {
  return (
    <main>
      <div className="slideshow-container">
        <img src="./images/img_hospital.jpg" style={{ width: "100%" }} />
      </div>
      <div className="programs-section">
        <div className="left-content">
          <h2>Why Choose XYZ Healthcare?</h2>
          <p>
            Established by Dr person_A in 1980, XYZ Healthcare has a robust
            presence across the healthcare ecosystem. From routine wellness
            &amp; preventive health care to innovative life-saving treatments
            and diagnostic services, XYZ Hospitals has touched more than 100
            million lives from over 100 countries.
          </p>
          <ul>
            <li>
              <span className="number">70+</span>{" "}
              <span className="statement">
                Largest private healthcare network of Hospitals
              </span>
            </li>
            <li>
              <span className="number">200+</span>{" "}
              <span className="statement">
                Largest private network of clinics across India
              </span>
            </li>
            <li>
              <span className="number">2,306+</span>{" "}
              <span className="statement">Diagnostic centres across India</span>
            </li>
            <li>
              <span className="number">5,220+</span>{" "}
              <span className="statement">Pharmacies</span>
            </li>
            <li>
              <span className="number">9,000+</span>{" "}
              <span className="statement">Pin codes Served across India</span>
            </li>
            <li>
              <span className="number">10,000+</span>{" "}
              <span className="statement">Doctors</span>
            </li>
          </ul>
        </div>
        <div className="right-content">
          <img src="./images/XYZ-healthcare.jpg" alt="XYZ Healthcare" />
        </div>
      </div>

      <ExcellenceCard />
    </main>
  );
}
