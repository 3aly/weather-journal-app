// Setup empty JS object to act as endpoint for all routes
const projectData = [
];
let newEntry={zipcode:'',city:'',feeling:'',date:'',temp:''};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/

const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

function listening() {
    console.log(`Server running on port: ${port}`);
}

const server = app.listen(port, listening);


app.post('/addData', addData);
app.get('/getData',getData);
app.get('/getAllData',getAllData);
app.post('/clearAll', clearAll);

function addData(req,res){
    
  newEntry.zipcode=req.body.zipcode;
  newEntry.city=req.body.city;
  newEntry.feeling=req.body.feeling;
  newEntry.temp=req.body.temp;
  newEntry.date=req.body.date;

 projectData.push(newEntry);
 newEntry={};
 

}
function clearAll(req,res){
    
   
  
   projectData.length=0;
   res.send("NO DATA!");

  }


function getData(req,res){
    res.send(projectData[projectData.length-1]);
}
function getAllData(req,res){
    res.send(projectData);
}
