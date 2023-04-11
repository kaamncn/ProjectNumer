require('dotenv').config()
var express = require('express') //api
var cors = require('cors')
const mysql = require('mysql2');
//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJSDoc = require('swagger-jsdoc');

//const swaggerDocumentTest = require('./testSwagger.json');
// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
var app = express()

app.use(cors())

// app.get('/products/:id', function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for all origins!' })
// })
app.get('/dataEquation', function (req, res, next) {
    // simple query
    connection.query(
        'SELECT * FROM `dataEquation`',
        function (err, results, fields) {
            res.json(results)
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
})

const SwaggerSpec = swaggerJSDoc(swaggerDocument)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentTest));

app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
})