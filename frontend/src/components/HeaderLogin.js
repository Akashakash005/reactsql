import { Link, useNavigate } from "react-router-dom";

export default function Header({ setIsLoggedIn, fullName }) {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Show a browser confirmation alert
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      setIsLoggedIn(false); // Set the logged-in state to false
      navigate("/"); // Navigate back to home after logout
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/dashboard">
          <img
            className="body-logo"
            src="/images/hospital-logo.png"
            alt="XYZ Hospital Logo"
          />
        </Link>
      </div>

      <div className="header-center">
        <h1>XYZ HOSPITAL</h1>
        <h2>123 Health St, Wellness City, Country</h2>
      </div>

      <div className="header-right">
        <div className="top-navbar">
          <h2>{fullName} </h2>
          <div className="user-info">
            <div className="logout">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <hr width="100%" size="1" />
        <div className="bot-navbar">
          <Link to="/departments">Departments</Link>
          <Link to="/services">Services</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/health-packages">Health Packages</Link>
          <Link to="/blog&journal">Blog & Journal</Link>
          <Link to="/news&events">News & Events</Link>
        </div>
      </div>
    </header>
  );
}
