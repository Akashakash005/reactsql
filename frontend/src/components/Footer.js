import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>123 Health St, Wellness City, Country</p>
          <p>1800-123-4567</p>
          <p>info@xyzhospital.com</p>
        </div>
        <div className="footer-section">
          <h3>Main Navigation</h3>
          <ul>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Services</Link>
            </li>
            <li>
              <Link to="#">Facilities</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Sister Concerns</h3>
          <ul>
            <li>
              <Link to="#">XYZ Medical College</Link>
            </li>
            <li>
              <Link to="#">XYZ Research Center</Link>
            </li>
            <li>
              <Link to="#">XYZ Clinics</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="#">Apply Now</Link>
            </li>
            <li>
              <Link to="#">Admission</Link>
            </li>
            <li>
              <Link to="#">Contact Us</Link>
            </li>
          </ul>
          <p>Follow Us</p>
        </div>
      </div>
    </footer>
  );
}
