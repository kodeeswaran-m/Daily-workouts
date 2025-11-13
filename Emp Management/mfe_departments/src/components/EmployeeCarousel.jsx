import "../styles/EmployeeCarousel.css";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { CAROUSEL } from "../constants/employeeCarousel";

const EmployeeCarousel = ({ employees }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % employees.length);
    }, CAROUSEL.INTERVAL_MS);
    return () => clearInterval(interval);
  }, [employees.length]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {employees.map((emp) => (
          <div className="carousel-card" key={emp._id}>
            {emp.avatar ? (
              <img src={emp.avatar} alt={emp.firstName} className="avatar" />
            ) : (
              <UserRound className="avatar" />
            )}
            <h4 className="name">
              {emp.firstName} {emp.lastName}
            </h4>
            <p>
              {CAROUSEL.EMPLOYEE_ID_LABEL}: {emp.employeeId || CAROUSEL.NONE_TEXT}
            </p>
            <p className="title">{emp.jobTitle}</p>
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {employees.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeCarousel;




// import "../styles/EmployeeCarousel.css";
// import { UserRound } from "lucide-react";
// import { useEffect, useState } from "react";

// const EmployeeCarousel = ({ employees }) => {
//   const [index, setIndex] = useState(0);
// console.log("EMPLOYEE", employees);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % employees.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [employees.length]);

//   return (
//     <div className="carousel-container">
//       <div
//         className="carousel-track"
//         style={{ transform: `translateX(-${index * 100}%)` }}
//       >
//         {employees.map((emp) => (
//           <div className="carousel-card" key={emp._id}>
//             {emp.avatar ? (
//               <img src={emp.avatar} alt={emp.firstName} className="avatar" />
//             ) : (
//               <UserRound className="avatar" />
//             )}
//             <h4 className="name">
//               {emp.firstName} {emp.lastName}
//             </h4>
//             <p>Employee ID: {emp.employeeId || "None"}</p>
//             <p className="title">{emp.jobTitle}</p>
//           </div>
//         ))}
//       </div>

//       <div className="carousel-dots">
//         {employees.map((_, i) => (
//           <span
//             key={i}
//             className={`dot ${i === index ? "active" : ""}`}
//             onClick={() => setIndex(i)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EmployeeCarousel;
