import React, { useState } from "react";
import "./Login.css";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kgblcekcxkkmigjsbwbo.supabase.co";
const SUPABASE_KEY =
  "sb_publishable_vevfsasP9ZzzU8zCLh5qWQ_H4uLd_2W";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

    setLoading(false);

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    alert("Login successful!");

    window.location.href = "/";
  };

  const forgotPassword = () => {
    alert(
      "Password reset functionality will be connected to the backend."
    );
  };

  return (
    <div className="login-page">

      {/* HOME BUTTON */}
      <a href="/" className="home-btn">
        ← Home
      </a>

      {/* LOGIN PAGE */}
      <main className="page">

        <div className="login-container">

          {/* LEFT SIDE */}
          <section className="left-side">

            <div className="left-content">

              <div className="logo">

                <div className="logo-icon">
                  🎓
                </div>

                <div className="logo-text">
                  Campus<br />
                  <span>Marketplace</span>
                </div>

              </div>

              <h1>
                Welcome
                <br />
                Back!
              </h1>

              <p>
                Sign in to your Campus Marketplace
                account and discover great deals
                from students around your campus.
              </p>

              <div className="benefits">

                <div className="benefit">
                  <div className="benefit-icon">
                    ✓
                  </div>
                  Verified student community
                </div>

                <div className="benefit">
                  <div className="benefit-icon">
                    🛡
                  </div>
                  Safe and secure marketplace
                </div>

                <div className="benefit">
                  <div className="benefit-icon">
                    ⚡
                  </div>
                  Quick and easy transactions
                </div>

              </div>

            </div>

          </section>


          {/* RIGHT SIDE */}
          <section className="right-side">

            <div className="login-heading">

              <h2>Sign in</h2>

              <p>
                Enter your details to access your account.
              </p>

            </div>


            {/* LOGIN FORM */}
            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-container">

                  <span className="input-icon">
                    ✉
                  </span>

                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}
              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-container">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "◉" : "◌"}
                  </button>

                </div>

              </div>


              {/* OPTIONS */}
              <div className="form-options">

                <label className="remember">

                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) =>
                      setRemember(event.target.checked)
                    }
                  />

                  Remember me

                </label>

                <a
                  href="#"
                  className="forgot"
                  onClick={(event) => {
                    event.preventDefault();
                    forgotPassword();
                  }}
                >
                  Forgot password?
                </a>

              </div>


              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </form>


            {/* DIVIDER */}
            <div className="divider">
              OR
            </div>


            {/* REGISTER */}
            <div className="register">

              Don't have an account?

              <a href="/register">
                Create an account
              </a>

            </div>


            {/* SECURITY */}
            <div className="security">

              🛡️

              <span>
                Your account information is protected
                with secure authentication.
              </span>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Login;