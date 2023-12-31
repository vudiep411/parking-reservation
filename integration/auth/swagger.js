import swaggerJSDoc from 'swagger-jsdoc'

const prodUrl = 'https://parking-reservation.vercel.app'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: `Auth Service API`,
      description: 'API',
      version: '0.0.1'
    },
    contact: {
      name: 'Vu',
      email: 'vudiep411@gmail.com'
    },
    servers: [
      {
        url: process.env.DEV == 1 ? 'http://localhost:5001' : prodUrl
      }
    ]
  }
  
const swaggerOptions = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['../*.js', '../*/*.js', '../*/routes/*.js'],
    servers: [
      {
        url: process.env.DEV == 1 ? 'http://localhost:5001' : prodUrl,
        description: 'Development server'
      }
    ]
  }
  
export const swaggerUIOptions = {
    customSiteTitle: 'API Doc',
    explorer: true,
    swaggerOptions: {
      layout: 'StandaloneLayout',
      displayOperationId: true,
      docExpansion: 'none'
    }
  }
  
export const swaggerSpec = swaggerJSDoc(swaggerOptions)