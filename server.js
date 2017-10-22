var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));




// CHALLENGE 01: Write a route for "/verify" that takes json data like the following:
// { "name": "Troy", "state": "AZ" } If the state is not AZ send a 400 status.
// If it is AZ send a 200 status.
app.post('/verify', function(req,res){
  if (req.body.state == "AZ"){
    res.sendStatus(200);
  }

  else {
    res.sendStatus(400);
  }
});

// -----------------------------------------------------------------------------


// CHALLENGE 02: Create a route "/calculate" that takes json data like the following:
// { "operation": "add", "numOne": 3, "numTwo": 18 } It should return the result of
// doing the operation on numOne and numTwo.
app.post('/calculate', function(req, res){
  let sum = req.body.numOne + req.body.numTwo;
  console.log(sum);
  res.sendStatus(200);
});

// AUTIN'S SOLUTION
app.post("/calculate", (req, res) => {
  let a = req.body.numOne; b = req.body.numTwo;
  let calc;

  switch (req.body.operation) {
    case "add":
      calc = (a + b);
    break;
    case "subtract":
      calc = (a - b);
    break;
    case "multiply":
      calc = (a * b);
    break;
    case "divide":
      calc = (a / b);
    break;
  }

  res.json(calc);
});


// -----------------------------------------------------------------------------

// CHALLENGE 03: Create a route "/students" that takes json data like the following:
// { "teacher": "John", "class": "g58", "students": [ { name:"kevin", class:"g34" },
// { name:"chris", class:"g58" }, { name:"marie", class:"g66" }, { name:"james", class:"g58" }, ] }
// Filter the students array so that it only contains the students that are in the same
// class as the instructor. Then return the new updated object.
app.post('/students', function(req, res){
  var newObj = {};
  newObj.teacher = req.body.teacher;
  newObj.class = req.body.class;
  newObj.students = [];

  for (let i = 0; i < req.body.students.length; i++){
    if (req.body.students[i].class == newObj.class){
      newObj.students.push(req.body.students[i].name);
    }
  }

  console.log(newObj);
  res.sendStatus(200);
});

// BRYAN'S SOLUTION
app.post(‘/students’, function(req,res){
  let newObj = {
    name: req.body.teacher,
    class: req.body.class,
    students : req.body.students.filter((item)=>{
      return item.class === req.body.class;
    })
  };
 res.json(newObj);
})

// -----------------------------------------------------------------------------


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
