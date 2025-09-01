import * as React from "react";
import { useState } from "react";
import { BarChart } from "@mui/x-charts";
import { Link } from "react-router-dom";

function BarchartComponent() {
  const [students, setStudents] = useState([
    { name: "Arun", marks: [78, 85, 90, 72, 88] },
    { name: "Divya", marks: [92, 80, 76, 89, 95] },
    { name: "Karthik", marks: [65, 70, 60, 75, 68] },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    tamil: "",
    english: "",
    math: "",
    science: "",
    social: "",
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = () => {
    if (!formData.name) return alert("Please enter a name");
    const newStudent = {
      name: formData.name,
      marks: [
        Number(formData.tamil),
        Number(formData.english),
        Number(formData.math),
        Number(formData.science),
        Number(formData.social),
      ],
    };

    setStudents([...students, newStudent]);
    setFormData({
      name: "",
      tamil: "",
      english: "",
      math: "",
      science: "",
      social: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Student Marks Entry</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="number"
        name="tamil"
        placeholder="Tamil"
        value={formData.tamil}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="number"
        name="english"
        placeholder="English"
        value={formData.english}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="number"
        name="math"
        placeholder="Math"
        value={formData.math}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="number"
        name="science"
        placeholder="Science"
        value={formData.science}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="number"
        name="social"
        placeholder="Social"
        value={formData.social}
        onChange={handleChange}
        style={inputStyle}
      />

      <button onClick={handleAddStudent} style={buttonStyle}>
        Add Student
      </button>

      <Link to="/pieChart">Go to Pie Chart</Link>

      <h3>Students List</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {students.map((student, index) => (
          <li
            key={index}
            style={{
              cursor: "pointer",
              color: "blue",
              margin: "5px 0",
              fontWeight: "bold",
            }}
            onClick={() => setSelectedStudent(student)}
          >
            {student.name}
          </li>
        ))}
      </ul>
      {selectedStudent && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ textAlign: "center" }}>
            {selectedStudent.name}'s Marks
          </h3>
          <BarChart
            xAxis={[
              {
                zoom:true,
                data: ["Tamil", "English", "Math", "Science", "Social"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: selectedStudent.marks,
                color: "blue",
              },
            ]}
            height={300}
            margin={{ top: 30, bottom: 30, left: 40, right: 10 }}
          />
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  margin: "5px 0",
  padding: "8px",
  border: "1px solid grey",
  borderRadius: "5px",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default BarchartComponent;
