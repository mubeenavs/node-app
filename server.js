import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRoutes from "./routes/authRoutes.js";
// import swagger from './config/swagger.js'
import employeeRoutes from "./routes/employeeRoutes.js";
import usersRoutes from "./routes/usersRoutes.js"
// const app = express();
// const port = process.env.PORT || 3000;
// const hostname = process.env.HOST || "localhost";
// app.set("view engine", "ejs");

// app.use(express.json());
// // Rendering index page
// app.get("/", (req, res) => {
//   res.render("index");
// });
// const specs = swaggerJsdoc(swagger);
// // Serve Swagger UI with Bearer Token authentication
// app.use(
//   "/api/documentation",
//   (req, res, next) => {
//     // Assuming you've stored the token after login
//     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUwNmU3OWQ0ODViOTNkMmUxY2IwN2YiLCJpYXQiOjE3MTY1NTU0ODYsImV4cCI6MTcxOTE0NzQ4Nn0.p3eD_0-fgPmKy4IRsEpYrzHafQKcYiExi-9Zxy2_SlA";
//     // req.headers.authorization = `Bearer ${token}`;
//     next();
//   },
//   swaggerUi.serve,
//   swaggerUi.setup(specs, { explorer: true })
// );
// // Application routes
// app.use("/api", authRoutes);
// app.use("/api/users", userRoutes);
// // Server listen
// app.listen(port, hostname, () => {
//   console.log(`Server is running at http://${hostname}:${port}/`);
// });
dotenv.config();


const app = express();

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "localhost";
app.set("view engine", "ejs");
//Swagger setup
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "node-app Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "DiamondLease",
        url: "https://diamondlease.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
          
        },
      }
    },
    security: [{
      jwt: []
    }],
  },
  apis: ["./controllers/*.js"],
};
const specs = swaggerJsdoc(options);

// Rendering index page
app.get("/", (req, res) => {
    res.render("index");
  });
  
  
  
 // Server listen
 app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
}); 

app.use(
  "/api/documentation",
  (req, res, next) => {
    // Assuming you've stored the token after login
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUwNmU3OWQ0ODViOTNkMmUxY2IwN2YiLCJpYXQiOjE3MTY1NTU0ODYsImV4cCI6MTcxOTE0NzQ4Nn0.p3eD_0-fgPmKy4IRsEpYrzHafQKcYiExi-9Zxy2_SlA";
    // req.headers.authorization = `Bearer ${token}`;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
// Importing mongodb connection
connectDB();

// Application routes
app.use("/api", authRoutes);
app.use("/aauthRoutespi/employee",employeeRoutes );
app.use("/api/user",usersRoutes);





  

