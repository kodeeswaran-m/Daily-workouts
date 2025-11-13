const mongoose = require("mongoose");
const Department = require("./models/Department");
const Employee = require("./models/Employee");

const deptEmployeeCounts = {
  "JLM": 99,
  "NSA": 33,
  "AIML": 75,
  "RPA": 55,
  "Training team": 8,
  "Insurance": 80,
  "HR": 30,
  "Finance": 20,
  "Management": 20,
  "JLM2": 20,
  "BFS": 70,
  "HelpDesk": 20,
  "Testing": 44,
};

const hireDates = [
//   new Date("2020-01-15"),
  new Date("2020-07-15"),
//   new Date("2021-01-15"),
  new Date("2021-07-15"),
//   new Date("2022-01-15"),
  new Date("2022-07-15"),
//   new Date("2023-01-15"),
  new Date("2023-07-15"),
//   new Date("2024-01-15"),
  new Date("2024-07-15"),
//   new Date("2025-01-15"),
  new Date("2025-07-15"),
];

function getRandomHireDate() {
  const index = Math.floor(Math.random() * hireDates.length);
  return hireDates[index];
}

async function seed() {
  try {
    await mongoose.connect("mongodb+srv://kodeeswaranm2221662:kodeeswaranm2221662@cluster0.bol2hqo.mongodb.net/myapp");
    console.log("Connected to MongoDB");

    let existingCount = await Employee.countDocuments();
    let employeeCounter = existingCount + 1;
    let phoneCounter = 9000000000;

    for (const [deptName, count] of Object.entries(deptEmployeeCounts)) {
      const dept = await Department.findOne({ name: new RegExp(`^${deptName}$`, "i") });
      if (!dept) {
        console.log(`Department ${deptName} not found`);
        continue;
      }

      console.log(`Adding ${count} employees to ${deptName}...`);

      const employees = [];
      for (let i = 0; i < count; i++) {
        const firstName = `${deptName}Emp${i + 1}`;
        const lastName = "User";

        employees.push({
          employeeId: `ACE${employeeCounter.toString().padStart(4, "0")}`,
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
          phone: (phoneCounter++).toString(),
          jobTitle: "Staff",
          hireDate: getRandomHireDate(),
          employmentType: "full-time",
          department: dept._id,
          status: "active",
        });

        employeeCounter++;
      }

      // 10% inactive employees
      const inactiveCount = Math.floor(count * 0.1);
      for (let j = 0; j < inactiveCount; j++) {
        const randomIndex = Math.floor(Math.random() * employees.length);
        employees[randomIndex].status = "inactive";
      }

      const savedEmployees = await Employee.insertMany(employees);

      dept.employees.push(...savedEmployees.map((e) => e._id));
      await dept.save();

      console.log(`Inserted ${count} employees into ${deptName} (${inactiveCount} inactive)`);
    }

    console.log("All employees seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding employees:", err);
    process.exit(1);
  }
}

seed();
