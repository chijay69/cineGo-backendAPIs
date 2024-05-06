// import {swaggerAutogen} from 'swagger-autogen';
import swaggerAutogen = require("swagger-autogen")

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Cinego RestAPI Project',
        description: 'Implementation of Swagger with TypeScript for cinego backend rest apis'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.ts', './src/routes/auth/routes.ts', './src/routes/auth/routes.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);