import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "./Profile.css";

const SUPABASE_URL = "https://kgblcekcxkkmigjsbwbo.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_vevfsasP9ZzzU8zCLh5qWQ_H4uLd_2W";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem("profilePhoto") || null
  );

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setUser(user);
      setEmail(user.email || "");
      setPhone(user.user_metadata?.phone || "");
      setDepartment(user.user_metadata?.department || "");
      setYear(user.user_metadata?.year || "");
    };

    getUser();
  }, [navigate]);

  if (!user) {
    return null;
  }


  const handleSaveProfile = async () => {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      data: {
        phone: phone,
        department: department,
        year: year,
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    setUser(data.user);
    setEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
            {profilePhoto ? (
            <img
                src={profilePhoto}
                alt="Profile"
            />
            ) : (
            "♙"
            )}
        </div>

        <h1>
            {user.user_metadata?.fullName || "My Profile"}
        </h1>

        {editing && (
          <>
            <label className="photo-upload">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files[0];

                  if (!file) return;

                  const reader = new FileReader();

                  reader.onloadend = () => {
                    const imageUrl = reader.result;

                    setProfilePhoto(imageUrl);

                    localStorage.setItem(
                      "profilePhoto",
                      imageUrl
                    );

                    window.dispatchEvent(
                      new Event("profilePhotoChanged")
                    );
                  };

                  reader.readAsDataURL(file);
                }}
              />
            </label>
          </>
        )}

        {editing ? (
          <input
            className="profile-edit-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          ) : (
          <p className="profile-email">
            {email}
          </p>
        )}

        {editing ? (
          <div className="profile-detail">
            <strong>Phone:</strong>{" "}
            <input
              className="profile-edit-input"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        ) : (
          <p className="profile-detail">
            <strong>Phone:</strong>{" "}
            {phone || "Not provided"}
          </p>
        )}

        {editing ? (
          <div className="profile-detail">
            <strong>Department:</strong>{" "}
            <select
              className="profile-edit-input"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="CSIT">CSIT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="ME">ME</option>
            </select>
          </div>
        ) : (
          <p className="profile-detail">
            <strong>Department:</strong>{" "}
            {department || "Not provided"}
          </p>
        )}

        {editing ? (
          <div className="profile-detail">
            <strong>Year:</strong>{" "}
            <select
              className="profile-edit-input"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
        ) : (
          <p className="profile-detail">
            <strong>Year:</strong>{" "}
            {year || "Not provided"}
          </p>
        )}

        <button
          className="profile-back-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

        
        {editing ? (
          <button
            className="profile-edit-btn"
            onClick={handleSaveProfile}
          >
            Save Changes
          </button>
          ) : (
          <button
            className="profile-edit-btn"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}

        <button
          className="profile-logout-btn"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;