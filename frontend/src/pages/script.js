import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    // Form validation code (equivalent to your DOMContentLoaded function)

    const loginForm = document.querySelector(".login-form");
    const registrationForm = document.getElementById("registrationForm");

    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const showPasswordCheckbox = document.getElementById("show-password");

        const usernameRegex = /^[a-zA-Z0-9]{2,}$/;
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/;

        let isValid = true;

        if (!usernameRegex.test(username)) {
          alert(
            "Username must be alphanumeric and at least 8 characters long."
          );
          isValid = false;
        }

        if (!passwordRegex.test(password)) {
          alert(
            "Password must be at least 10 characters long and include one special character, one uppercase letter, and one numeric digit."
          );
          isValid = false;
        }

        if (!isValid) {
          event.preventDefault();
        }

        // Toggle password visibility
        if (showPasswordCheckbox) {
          showPasswordCheckbox.addEventListener("change", function () {
            if (showPasswordCheckbox.checked) {
              document.getElementById("password").type = "text";
            } else {
              document.getElementById("password").type = "password";
            }
          });
        }
      });
    }

    if (registrationForm) {
      registrationForm.addEventListener("submit", function (event) {
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobileNumber = document
          .getElementById("mobileNumber")
          .value.trim();
        const city = document.getElementById("city").value.trim();
        const doctorId = document.getElementById("doctorId").value.trim();
        const doctorName = document.getElementById("doctorName").value.trim();
        const address = document.getElementById("address").value.trim();
        const contactNo = document.getElementById("contactNo").value.trim();
        const gender = document.getElementById("gender").value;

        let isValid = true;

        if (
          !firstName ||
          !lastName ||
          !email ||
          !mobileNumber ||
          !city ||
          !doctorId ||
          !doctorName ||
          !address ||
          !contactNo ||
          !gender
        ) {
          alert("Please fill out all fields.");
          isValid = false;
        }

        const alphabeticRegex = /^[A-Za-z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!alphabeticRegex.test(firstName)) {
          alert("First name should contain only alphabetic characters.");
          isValid = false;
        }

        if (!alphabeticRegex.test(lastName)) {
          alert("Last name should contain only alphabetic characters.");
          isValid = false;
        }

        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address.");
          isValid = false;
        }

        if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
          alert("Please enter a valid 10-digit mobile number.");
          isValid = false;
        }

        if (contactNo.length !== 10 || isNaN(contactNo)) {
          alert("Please enter a valid 10-digit contact number.");
          isValid = false;
        }

        const doctorIdRegex = /^[a-zA-Z0-9]+$/;
        if (!doctorIdRegex.test(doctorId)) {
          alert("Doctor ID must be alphanumeric.");
          isValid = false;
        }

        if (!isValid) {
          event.preventDefault();
        } else {
          alert(
            `Patient detail is registered successfully. Welcome, ${firstName}!`
          );
        }
      });
    }

    // Slideshow functionality
    let slideIndex = 0;
    const showSlides = () => {
      const slides = document.getElementsByClassName("mySlides");
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 3000); // Change slide every 3 seconds
    };
    showSlides();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      {/* Your JSX code here */}
      {/* Example for a form */}
      <form className="login-form">
        <input id="username" type="text" placeholder="Username" />
        <input id="password" type="password" placeholder="Password" />
        <input id="show-password" type="checkbox" /> Show Password
        <button type="submit">Login</button>
      </form>

      {/* Other HTML/JSX structure */}
    </div>
  );
}

export default Home;
