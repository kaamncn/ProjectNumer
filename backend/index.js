require('dotenv').config()
var express = require('express') //api
var cors = require('cors')
const mysql = require('mysql2');
var app = express()

app.use(cors())
app.use(express.json())
//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-autogen.json');
const swaggerJSDoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');
const secrect_key = "mncn"
// import library and files

const swaggerDocumentTest = require('./testSwagger.json');
//create the connection to database
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});
// const connection = mysql.createPool({
    
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'projectnumer',
//     port: '3306'
// });

function verifyToken(req, res, next) {
    console.log("123456");
    let token = req.headers['authorization'];
    console.log(token);
    if (!token) return res.status(401).json({ message: '1' });
    token = token.split(' ')[1]
    jwt.verify(token, secrect_key, (err, decoded) => {
        if (err) return res.status(401).json({ message: '2' });
        req.userId = decoded.id;
        next();
    });
}




// app.get('/products/:id', function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for all origins!' })
// })

app.get('/dataEquation',verifyToken, function (req, res, next) {
    // simple query
    console.log("helshlf");
    connection.query(
        'SELECT * FROM projectnumer.dataequation',
        function (err, results, fields) {
            res.json(results)
            console.log(results); // results contains rows returned by server

            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
})
app.get('/test', function (req, res, next) {
    // simple query
    // console.log("helshlf");
    connection.query(
        'SELECT * FROM projectnumer.dataequation WHERE value',
        function (err, results, fields) {
            if(err) throw err
            res.json(results)
            console.log(results); // results contains rows returned by server

            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
})
app.get('/login', function (req, res, next){
    // Check the user's credentials and get the user's ID
    const userId = "Kaam";
  
    // Generate a token with the user's ID
    const token = jwt.sign({ id: userId }, secrect_key, { expiresIn: '1h' });
  
    // Return the token to the client
    res.json({ token }); 
})

// app.post('/login', function (req, res, next) {
//     // Check the user's credentials and get the user's ID
//     const userId = 123;
  
//     // Generate a token with the user's ID
//     const token = jwt.sign({ id: userId }, 'your_secret_key', { expiresIn: '1h' });
  
//     // Return the token to the client
//     res.json({ token }); 
//   });

// app.post('/dataEquation', (req, res) => {
//     // const task = req.body.task;
//     // task.id = randomId(10);
//     // tasks.push(task);
//     // res.json(tasks);
//     connection.query(
//         'INSERT INTO `dataequation`(`value`, `label`, `xl`, `xr`) VALUES (?,?,?,?)',
//         function (err, results, fields) {
//             res.json(results)
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         }
//     );
//  })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(5500, function () {
    console.log('CORS-enabled web server listening on port 5500')
})
module.exports = app;
