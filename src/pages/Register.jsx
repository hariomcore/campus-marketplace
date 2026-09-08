import React, { useState } from "react";
import "./Register.css";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kgblcekcxkkmigjsbwbo.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_vevfsasP9ZzzU8zCLh5qWQ_H4uLd_2W";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [terms, setTerms] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const [loading, setLoading] = useState(false);

  const getPasswordScore = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const passwordScore = getPasswordScore();

  const getStrengthText = () => {
    if (!password) return "";

    if (passwordScore === 1) {
      return "Weak password";
    }

    if (passwordScore === 2) {
      return "Fair password";
    }

    if (passwordScore === 3) {
      return "Good password";
    }

    return "Strong password";
  };

  const showError = (message) => {
    setErrorMessage(message);
    setSuccessMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value
      .replace(/[^0-9]/g, "")
      .slice(0, 10);

    setPhone(value);
  };

  const handleStudentIdChange = (event) => {
    const value = event.target.value
      .toUpperCase()
      .replace(/\s/g, "");

    setStudentId(value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (fullName.trim().length < 2) {
      showError("Please enter your full name.");
      return;
    }

    if (studentId.trim().length < 3) {
      showError("Please enter a valid Student ID.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      showError(
        "Please enter a valid college email address."
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      showError(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (!department) {
      showError("Please select your department.");
      return;
    }

    if (!year) {
      showError("Please select your year.");
      return;
    }

    if (password.length < 8) {
      showError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (!/[A-Z]/.test(password)) {
      showError(
        "Password must contain at least one uppercase letter."
      );
      return;
    }

    if (!/[0-9]/.test(password)) {
      showError(
        "Password must contain at least one number."
      );
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      showError(
        "Password must contain at least one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    if (!terms) {
      showError(
        "Please accept the Terms & Conditions."
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          fullName: fullName.trim(),
          studentId: studentId.trim(),
          phone: phone,
          department: department,
          year: year,
        },
      },
    });

    setLoading(false);

    if (error) {
      showError(error.message);
      return;
    }

    setSuccessMessage(
      "Account created successfully! Redirecting to login..."
    );

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="register-page">

      {/* HEADER */}
      <header className="top-header">

        <a href="/" className="logo">

          <div className="logo-icon">
            🎓
          </div>

          <div className="logo-text">
            Campus<br />
            <span>Marketplace</span>
          </div>

        </a>


        <a href="/" className="home-btn">

          <span className="home-arrow">
            ←
          </span>

          <span className="home-text">
            Back to Home
          </span>

        </a>

      </header>


      {/* MAIN */}
      <main className="page">

        <section className="register-card">

          {/* HEADING */}
          <div className="heading">

            <div className="heading-icon">
              ♙
            </div>

            <h1>
              Create Your Account
            </h1>

            <p>
              Join your campus community and start
              buying or selling.
            </p>

          </div>


          {/* ERROR */}
          {errorMessage && (
            <div className="message error-message show">
              {errorMessage}
            </div>
          )}


          {/* SUCCESS */}
          {successMessage && (
            <div className="message success-message show">
              {successMessage}
            </div>
          )}


          {/* FORM */}
          <form onSubmit={handleRegister}>

            {/* ROW 1 */}
            <div className="form-row">

              {/* FULL NAME */}
              <div className="form-group">

                <label htmlFor="fullName">
                  Full Name
                  <span className="required">*</span>
                </label>

                <div className="input-icon-box">

                  <span className="field-icon">
                    ♙
                  </span>

                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    maxLength="60"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* STUDENT ID */}
              <div className="form-group">

                <label htmlFor="studentId">
                  Student ID
                  <span className="required">*</span>
                </label>

                <div className="input-icon-box">

                  <span className="field-icon">
                    ▣
                  </span>

                  <input
                    type="text"
                    id="studentId"
                    placeholder="e.g. 24CSE1234"
                    maxLength="30"
                    value={studentId}
                    onChange={handleStudentIdChange}
                    required
                  />

                </div>

              </div>

            </div>


            {/* ROW 2 */}
            <div className="form-row">

              {/* EMAIL */}
              <div className="form-group">

                <label htmlFor="email">
                  College Email
                  <span className="required">*</span>
                </label>

                <div className="input-icon-box">

                  <span className="field-icon">
                    ✉
                  </span>

                  <input
                    type="email"
                    id="email"
                    placeholder="yourname@college.edu"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* PHONE */}
              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                  <span className="required">*</span>
                </label>

                <div className="input-icon-box">

                  <span className="field-icon">
                    ☎
                  </span>

                  <input
                    type="tel"
                    id="phone"
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />

                </div>

              </div>

            </div>


            {/* ROW 3 */}
            <div className="form-row">

              {/* DEPARTMENT */}
              <div className="form-group">

                <label htmlFor="department">
                  Department
                  <span className="required">*</span>
                </label>

                <select
                  id="department"
                  value={department}
                  onChange={(event) =>
                    setDepartment(event.target.value)
                  }
                  required
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="CSE">
                    CSE
                  </option>

                  <option value="CSIT">
                    CSIT
                  </option>

                  <option value="ECE">
                    ECE
                  </option>

                  <option value="EEE">
                    EEE
                  </option>

                  <option value="ME">
                    ME
                  </option>

                </select>

              </div>


              {/* YEAR */}
              <div className="form-group">

                <label htmlFor="year">
                  Year
                  <span className="required">*</span>
                </label>

                <select
                  id="year"
                  value={year}
                  onChange={(event) =>
                    setYear(event.target.value)
                  }
                  required
                >

                  <option value="">
                    Select Year
                  </option>

                  <option value="1st Year">
                    1st Year
                  </option>

                  <option value="2nd Year">
                    2nd Year
                  </option>

                  <option value="3rd Year">
                    3rd Year
                  </option>

                  <option value="4th Year">
                    4th Year
                  </option>

                </select>

              </div>

            </div>


            {/* ROW 4 */}
            <div className="form-row">

              {/* PASSWORD */}
              <div className="form-group">

                <label htmlFor="password">
                  Password
                  <span className="required">*</span>
                </label>

                <div className="password-box">

                  <span className="password-lock">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    id="password"
                    placeholder="Create a password"
                    minLength="8"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label="Show password"
                  >
                    {showPassword ? "◉" : "◌"}
                  </button>

                </div>

                <div className="password-info">
                  At least 8 characters with uppercase,
                  number and special character.
                </div>


                {password.length > 0 && (
                  <div className="strength-container show">

                    <div className="strength-bar">

                      <div
                        className="strength-fill"
                        style={{
                          width:
                            passwordScore * 25 + "%",
                        }}
                      />

                    </div>

                    <div className="strength-text">
                      {getStrengthText()}
                    </div>

                  </div>
                )}

              </div>


              {/* CONFIRM PASSWORD */}
              <div className="form-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                  <span className="required">*</span>
                </label>

                <div className="password-box">

                  <span className="password-lock">
                    🔒
                  </span>

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    id="confirmPassword"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    required
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label="Show password"
                  >
                    {showConfirmPassword
                      ? "◉"
                      : "◌"}
                  </button>

                </div>


                {confirmPassword && (
                  <div
                    className={
                      password === confirmPassword
                        ? "password-match-message success"
                        : "password-match-message error"
                    }
                  >
                    {password === confirmPassword
                      ? "Passwords match."
                      : "Passwords do not match."}
                  </div>
                )}

              </div>

            </div>


            {/* TERMS */}
            <div className="terms">

              <input
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={(event) =>
                  setTerms(event.target.checked)
                }
                required
              />

              <label htmlFor="terms">

                I agree to the{" "}

                <a href="#">
                  Terms & Conditions
                </a>{" "}

                and{" "}

                <a href="#">
                  Privacy Policy
                </a>{" "}

                of Campus Marketplace.

              </label>

            </div>


            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>


          {/* LOGIN */}
          <div className="login-text">

            Already have an account?{" "}

            <a href="/login">
              Login here
            </a>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Register;