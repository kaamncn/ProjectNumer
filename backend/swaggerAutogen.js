const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger-autogen.json'
const endPointfiles = ['./index.js']
swaggerAutogen(outputFile,endPointfiles)