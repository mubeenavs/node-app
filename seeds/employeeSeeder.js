import Employee from "../models/Employee.js";
import Role from "../models/role.js";

const EmployeeSeeder = () => {
  // Insert Empoloyee
  const employee = {
    name: "Super Admin",
    email: "info@nodeapp.com",
    password: "Admin@123,.",
    role: "Super Admin",
    guard: "admin",
  };

  const seedEmployee = async () => {
    const existingEmployee = await Employee.findOne({
      email: employee.email,
    });
    if (!existingEmployee) {
      const existingRole = await Role.findOne({
        name: employee.role,
      });
      if (!existingRole) {
        const role = new Role({
          name: employee.role,
        });
        role.save();
      }
      const newEmployee = new Employee(employee);
      await newEmployee.save();
    }
  };
  seedEmployee();
};

export default EmployeeSeeder;
