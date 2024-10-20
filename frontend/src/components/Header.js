import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="header-left">
        <img
          className="body-logo"
          src="/images/hospital-logo.png"
          alt="XYZ Hospital Logo"
        />
      </div>
      <div className="header-center">
        <h1>XYZ HOSPITAL</h1>
        <h2>123 Health St, Wellness City, Country</h2>
      </div>
      <div className="header-right">
        <nav>
          <div className="top-navbar">
            <div className="dropdown">
              <button className="dropbtn">
                Emergency <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <p>Chennai Alwarpet - 044 40006000</p>
                <p>Chennai Radial Road - 044 40504050</p>
                <p>Chennai Vadapalani - 044 40006000</p>
                <p>Trichy - 0431 4077777</p>
                <p>Salem - 0427 2677777</p>
                <p>Hosur - 0434 4272727</p>
                <p>Tirunelveli - 0462 4006000</p>
                <p>Bengaluru - 0123 7894512</p>
              </div>
            </div>

            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/new-appointment">Book Appointment</Link>
          </div>

          <hr width="100%" size="1" />
          <div className="bot-navbar">
            <Link to="/">Home</Link>
            <Link to="/departments">Departments</Link>
            <Link to="/services">Services</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/login">Login</Link>
            <Link to="/health-packages">Health Packages</Link>
            <Link to="/blog&journal">Blog & Journal</Link>
            <Link to="/news&events">News & Events</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
