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

//setup GET POST routes
app.post('/addData', addData);
app.get('/getData',getData);
app.get('/getAllData',getAllData);
app.post('/clearAll', clearAll);

//get all the data for the client side and create a new object then push it to the projectData
function addData(req,res){
    
  newEntry.zipcode=req.body.zipcode;
  newEntry.city=req.body.city;
  newEntry.feeling=req.body.feeling;
  newEntry.temp=req.body.temp;
  newEntry.date=req.body.date;

 projectData.push(newEntry);
 newEntry={};
 

}

//set the projectData array length to 0 to clear it
function clearAll(req,res){
      
   projectData.length=0;
   res.send("NO DATA!");

  }


//send the last object in the projectData array to the client side
function getData(req,res){

    res.send(projectData[projectData.length-1]);
}

//send all the projectData array to the client side
function getAllData(req,res){
    
    res.send(projectData);
}
