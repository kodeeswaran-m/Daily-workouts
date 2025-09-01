import * as React from "react";
import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function PiechartComponent() {
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
    let val = Number(value);
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    setFormData({ ...formData, [name]: val });
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

  const getPieData = (student) => {
    const subjects = ["Tamil", "English", "Math", "Science", "Social"];
    const colors = ["red", "blue", "green", "orange", "purple"];
    return student.marks.map((mark, index) => ({
      id: index,
      value: mark,
      label: `${subjects[index]} (${mark})`,
      color: colors[index],
    }));
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
      />
      <input
        type="number"
        name="tamil"
        placeholder="Tamil"
        value={formData.tamil}
        onChange={handleChange}
      />
      <input
        type="number"
        name="english"
        placeholder="English"
        value={formData.english}
        onChange={handleChange}
      />
      <input
        type="number"
        name="math"
        placeholder="Math"
        value={formData.math}
        onChange={handleChange}
      />
      <input
        type="number"
        name="science"
        placeholder="Science"
        value={formData.science}
        onChange={handleChange}
      />
      <input
        type="number"
        name="social"
        placeholder="Social"
        value={formData.social}
        onChange={handleChange}
      />

      <button onClick={handleAddStudent}>Add Student</button>

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
          <PieChart
            series={[
              {
                data: getPieData(selectedStudent),
                innerRadius: 40,
                outerRadius: 100,
              },
            ]}
            height={300}
            margin={{ top: 30, bottom: 30, left: 30, right: 30 }}
          />
        </div>
      )}
    </div>
  );
}

export default PiechartComponent;
