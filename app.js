console.log("This is Tabassum Shaikh");

const { Console } = require("console");
const express = require("express");
const fs = require("fs");
const Joi =require("joi");
const jwt = require("jsonwebtoken");

const app = express();

//const index = fs.readFileSync("index.html");
app.use(express.json());
const port = process.env.PORT || 3000;
const options = [
  { id: 1, name: "Tabassum" },
  { id: 2, name: "Shaikh" },
];

app.get("/", (req, res) => {
  // res.setHeader('Content-Type', 'text/html');
  // res.send(index);
  res.send("Hello World!");
});
app.get("/api", (req, res) => {
  res.send(options);
});

app.post("/api/test", (req, res) => {

  // if(!req.body.name|| req.body.name.length<3){
  //   console.log(req.body.name)
  //   res.status(400).send("404 error name");
  //   return;
  // }
  
  // const test= {
  //   //id : options.length +1,
  //   id: req.body.id,
  //   name : req.body.name
  // };
  // options.push(test)
  //res.send(options);
 

  jwt.sign({options}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
  });
  
});

app.post("/api/body",verifyjwt, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err,authData)=>{
    if(err){
      res.sendStatus(403);
    }
    else{
      res.json({
        message:"POST CREATED",
        authData
      });
    }
  });
  // res.send("POST CREATED");
});

app.get("/api/test/:id", (req, res) => {
  // res.send(req.params.id);
  const test = options.find((c) => c.id === parseInt(req.params.id));
  if (!test) res.status(404).send("NOT FOUND");
  res.send(test);
});
// app.get("/post",(req,res)=>{
//     res.send("post");
// });

function verifyjwt(req,res,next){
  const bearerHeader= req.headers['authorization'];
  if (typeof(bearerHeader !== "undefined")){
    const Bearer = bearerHeader.split(' ');
    const bearerToken = Bearer[1];
    req.token=bearerToken;
    next();
  }
  else{
    res.sendStatus(403);
  }
}

app.listen(port, () => {
  console.log(`app succesful on port ${port}`);
});

// function getjson (req, res) {
//     var data = '';

//     req.on('data', function (chunk) {
//       data += chunk;
//     });

//     req.on('end', function () {
//       console.log('POST data received');
//       res.writeHead(200, {
//         'Content-Type': 'text/json'
//       });
//       res.write(JSON.stringify(data));
//       res.end();
//     });
//   };
// module.exports = getjson;
// function (req, res) {
//     var data = '';

//     req.on('data', function (chunk) {
//       data += chunk;
//     });

//     req.on('end', function () {
//       console.log('POST data received');
//       res.writeHead(200, {
//         'Content-Type': 'text/json'
//       });
//       res.write(JSON.stringify(data));
//       res.end();
//     });
//   };



