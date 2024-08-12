import React, { useState, useEffect } from 'react';
import './App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState(['']);
  const [projects, setProjects] = useState([{ name: '', description: '' }]);
  const [education, setEducation] = useState([{ institution: '', degree: '', year: '' }]);
  const [experience, setExperience] = useState([{ company: '', role: '', duration: '' }]);
  const [socialLinks, setSocialLinks] = useState([{ platform: '', url: '' }]);
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');

  const handleAddSkill = () => setSkills([...skills, '']);
  const handleAddProject = () => setProjects([...projects, { name: '', description: '' }]);
  const handleAddEducation = () => setEducation([...education, { institution: '', degree: '', year: '' }]);
  const handleAddExperience = () => setExperience([...experience, { company: '', role: '', duration: '' }]);
  const handleAddSocialLink = () => setSocialLinks([...socialLinks, { platform: '', url: '' }]);

  const handleGeneratePortfolio = () => {
    setError('');

    if (!name || !email || !summary) {
      setError('Name, email, and summary are required.');
      return;
    }

    const generatedPortfolio = `
      <div class="portfolio-section">
        <h2>${name}'s Portfolio</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Summary:</strong> ${summary}</p>
      </div>
      <div class="portfolio-section">
        <h3>Skills</h3>
        <ul>${skills.map(skill => skill && `<li>${skill}</li>`).join('')}</ul>
      </div>
      <div class="portfolio-section">
        <h3>Projects</h3>
        <ul>${projects.map(project => project.name && `<li><strong>${project.name}</strong>: ${project.description}</li>`).join('')}</ul>
      </div>
      <div class="portfolio-section">
        <h3>Education</h3>
        <ul>${education.map(edu => edu.institution && `<li><strong>${edu.degree}</strong> from ${edu.institution} (${edu.year})</li>`).join('')}</ul>
      </div>
      <div class="portfolio-section">
        <h3>Experience</h3>
        <ul>${experience.map(exp => exp.company && `<li><strong>${exp.role}</strong> at ${exp.company} (${exp.duration})</li>`).join('')}</ul>
      </div>
      <div class="portfolio-section">
        <h3>Social Links</h3>
        <ul>${socialLinks.map(link => link.platform && `<li><a href="${link.url}" target="_blank">${link.platform}</a></li>`).join('')}</ul>
      </div>
    `;

    setPortfolio(generatedPortfolio);
  };

  useEffect(() => {
    handleGeneratePortfolio();
  }, [name, email, summary, skills, projects, education, experience, socialLinks]);

  const handleDownloadPDF = () => {
    const portfolioElement = document.querySelector('.portfolio');
    html2canvas(portfolioElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${name}_Portfolio.pdf`);
    });
  };

  return (
    <div className="App">
      <h1>AI Portfolio Builder - Abiodun Obafemi</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Summary:</label>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
      </div>
      <div>
        <label>Skills:</label>
        {skills.map((skill, index) => (
          <input
            key={index}
            type="text"
            value={skill}
            onChange={(e) => {
              const newSkills = [...skills];
              newSkills[index] = e.target.value;
              setSkills(newSkills);
            }}
          />
        ))}
        <button onClick={handleAddSkill}>Add Skill</button>
      </div>
      <div>
        <label>Projects:</label>
        {projects.map((project, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[index].name = e.target.value;
                setProjects(newProjects);
              }}
            />
            <input
              type="text"
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[index].description = e.target.value;
                setProjects(newProjects);
              }}
            />
          </div>
        ))}
        <button onClick={handleAddProject}>Add Project</button>
      </div>
      <div>
        <label>Education:</label>
        {education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].institution = e.target.value;
                setEducation(newEducation);
              }}
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].degree = e.target.value;
                setEducation(newEducation);
              }}
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].year = e.target.value;
                setEducation(newEducation);
              }}
            />
          </div>
        ))}
        <button onClick={handleAddEducation}>Add Education</button>
      </div>
      <div>
        <label>Experience:</label>
        {experience.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const newExperience = [...experience];
                newExperience[index].company = e.target.value;
                setExperience(newExperience);
              }}
            />
            <input
              type="text"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => {
                const newExperience = [...experience];
                newExperience[index].role = e.target.value;
                setExperience(newExperience);
              }}
            />
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => {
                const newExperience = [...experience];
                newExperience[index].duration = e.target.value;
                setExperience(newExperience);
              }}
            />
          </div>
        ))}
        <button onClick={handleAddExperience}>Add Experience</button>
      </div>
      <div>
        <label>Social Links:</label>
        {socialLinks.map((link, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Platform"
              value={link.platform}
              onChange={(e) => {
                const newSocialLinks = [...socialLinks];
                newSocialLinks[index].platform = e.target.value;
                setSocialLinks(newSocialLinks);
              }}
            />
            <input
              type="text"
              placeholder="URL"
              value={link.url}
              onChange={(e) => {
                const newSocialLinks = [...socialLinks];
                newSocialLinks[index].url = e.target.value;
                setSocialLinks(newSocialLinks);
              }}
            />
          </div>
        ))}
        <button onClick={handleAddSocialLink}>Add Social Link</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {portfolio && (
        <>
          <div className="portfolio" dangerouslySetInnerHTML={{ __html: portfolio }} />
          <button onClick={handleDownloadPDF}>Download PDF</button>
        </>
      )}
    </div>
  );
}

export default App;
