// import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { Express } from 'express';
// import path from 'path';

// // Define Swagger options
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'SWAPI Movies API',
//       version: '1.0.0',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000', // Replace with your server URL
//       },
//     ],
//   },
//   apis: [path.join(__dirname, './routes/*.ts')], // Path to the API routes
// };

// // Generate Swagger documentation
// const swaggerDocs = swaggerJsDoc(swaggerOptions);

// // Function to set up Swagger in an Express app
// export const setupSwagger = (app: Express) => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// };

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';

// Define Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SWAPI Movies API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Movie: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            title: {
              type: 'string',
            },
            episode_id: {
              type: 'integer',
            },
            opening_crawl: {
              type: 'string',
            },
            director: {
              type: 'string',
            },
            producer: {
              type: 'string',
            },
            release_date: {
              type: 'string',
              format: 'date',
            },
          },
        },
        MovieInput: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            episode_id: {
              type: 'integer',
            },
            description: {
              type: 'string',
            },
            director: {
              type: 'string',
            },
            producer: {
              type: 'string',
            },
            release_date: {
              type: 'string',
              format: 'date',
            },
          },
          required: ['title', 'episode_id', 'director', 'producer', 'release_date'],
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.ts')], // Path to the API routes
};

// Generate Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Function to set up Swagger in an Express app
export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

