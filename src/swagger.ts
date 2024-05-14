// // // import {swaggerAutogen} from 'swagger-autogen';
// // import swaggerAutogen = require("swagger-autogen")

// // const doc = {
// //     definition: {
// //         openapi: "3.1.0",
// //         info: {
// //             version: 'v0.0.0',
// //             title: 'Cinego RestAPI Project',
// //             description: 'Implementation of Swagger with TypeScript for cinego backend rest apis'
// //         },
// //         contact: {
// //             name: "CineGo",
// //             url: "http://cinego.live",
// //             email: "chijay59@gmail.com",
// //           },
// //         servers: [
// //             {
// //                 url: 'http://localhost:3000',
// //                 description: 'This is a rest API of the cinego backend service. This url is for the localhost, swithch it out for the production url.'
// //             },
// //         ],
// //         components: {
// //             securitySchemes: {
// //                 bearerAuth: {
// //                     type: 'http',
// //                     scheme: 'bearer',
// //                 }
// //             }
// //         }
// //     },
// //     apis: ["./routes/*.js"],
// // };

// // const outputFile = './swagger_output.json';
// // const endpointsFiles = ['./src/routes/auth/routes.ts', './src/routes/auth/routes.ts'];

// // swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);

// import * as swaggerAutogen from "swagger-autogen";

// const doc = {
//   info: {
//     title: 'Cinego RestAPI Project',
//     description: 'Implementation of Swagger with TypeScript for cinego backend rest apis',
//     version: '1.0.0',
//     contact: {
//       name: "CineGo",
//       url: "http://cinego.live",
//       email: "chijay59@gmail.com",
//     },
//   },
//   servers: [
//     {
//       url: 'http://localhost:3000',
//       description: 'Local Development Server',
//     },
//   ],
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//       }
//     }
//   },
//   security: [
//     {
//       bearerAuth: [],
//     }
//   ],
//   paths: {
//     "/signup": {
//       post: {
//         summary: "Sign Up",
//         description: "Create a new user",
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   firstName: 
//                     {
//                       type: "string", 
//                       example: "John", 
//                       minimum: 1, 
//                       description: "your firstname" 
//                     },
//                   lastName: 
//                     { 
//                       type: "string", 
//                       example: "Doe" 
//                     },
//                   email: { type: "string", example: "john.doe@example.com" },
//                   password: { type: "string", example: "Password_123" },
//                   role: { type: "string", example: "user" },
//                   country: { type: "string", example: "NIGERIA" },
//                   referalCode: { type: "string", example: "123789" },
//                   selectedPlanName: { type: "string", example: "Basic" }
//                 },
//                 required: ["firstName", "lastName", "email", "password", "role", "country", "selectedPlanName"]
//               }
//             }
//           }
//         },
//         responses: {
//           "201": {
//             description: "User created successfully",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     message: { type: "string", example: "User created successfully" },
//                     token: { type: "string", example: "JWT token" },
//                     userDataResponse: { 
//                       type: "object",
//                       properties: {
//                         id: { type: "number", example: 1 },
//                         firstName: { type: "string", example: "John" },
//                         lastName: { type: "string", example: "Doe" },
//                         email: { type: "string", example: "john.doe@example.com" },
//                         role: { type: "string", example: "user" },
//                         country: { type: "string", example: "US" }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           "400": {
//             description: "Invalid input data"
//           },
//           "500": {
//             description: "Failed to create user"
//           },
//           default: {
//             description: "Unexpected error"
//           }
//         }
//       }
//     },
//     "/signin": {
//       post: {
//         summary: "Sign In",
//         description: "Authenticate a user",
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   email: { type: "string", example: "john.doe@example.com" },
//                   password: { type: "string", example: "Password_123" }
//                 },
//                 required: ["email", "password"]
//               }
//             }
//           }
//         },
//         responses: {
//           "200": {
//             description: "Login successful",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     message: { type: "string", example: "Login successful" },
//                     userDataResponse: { 
//                       type: "object",
//                       properties: {
//                         id: { type: "number", example: 1 },
//                         firstName: { type: "string", example: "John" },
//                         lastName: { type: "string", example: "Doe" },
//                         email: { type: "string", example: "john.doe@example.com" },
//                         role: { type: "string", example: "user" },
//                         country: { type: "string", example: "US" }
//                       }
//                     },
//                     token: { type: "string", example: "JWT token" }
//                   }
//                 }
//               }
//             }
//           },
//           "400": {
//             description: "Invalid credentials"
//           },
//           "500": {
//             description: "Internal server error"
//           }
//         }
//       }
//     }
//   }
// };

// const outputFile = './swagger_output.json';
// const endpointsFiles = ['./build/routes/auth/routes.js', './build/routes/main/routes.js'];

// swaggerAutogen()(outputFile, endpointsFiles, doc);
