// app.test.js
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('./index');
test('test token',async ()=>{
  const token = await request(app).get('/login');
  console.log(token._body.token);
  const name = "Kaam"
  const secrect_key = "mncn"
  const verify = jwt.verify(token._body.token, secrect_key)
  expect(verify.id).toEqual(name)
})
// test('GET /test retrieves data from local endpoint', async () => {
//   const response = await request(app).get('/test');
//   //console.log(response);
//   const body = [
//     { value: 1, label: '(x^2)-4', xl: -1, xr: 5 },
//     { value: 2, label: '(x^2)-16', xl: 2, xr: 5 },
//     { value: 3, label: '(x^4)-13', xl: 0, xr: 2 }
//   ]
//   expect(response.status).toBe(200);
//   const data = JSON.parse(response.text)
//   expect(data).toEqual(body)
  // Assert the response status code and data
  //expect(response.body).toEqual(/* expected data from the /test endpoint */);
//});
