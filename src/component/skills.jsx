import React from "react";

function Skills() {
  return (
    <section id="skills">
      <h2>My Skills</h2>

      <div className="skill-category">
        <h3>Programming Languages</h3>
        <p>Java &nbsp; Python &nbsp; C</p>
      </div>

      <div className="skill-category">
        <h3>Frontend</h3>
        <p>HTML &nbsp; CSS</p>
      </div>

      <div className="skill-category">
        <h3>Backend & Database</h3>
        <p>Flask &nbsp; MySQL &nbsp; APIs</p>
      </div>

      <div className="skill-category">
        <h3>Tools</h3>
        <p>Git &nbsp; GitHub &nbsp; VS Code</p>
      </div>
    </section>
  );
}

export default Skills;