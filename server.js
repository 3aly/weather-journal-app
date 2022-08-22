// Setup empty JS object to act as endpoint for all routes
const projectData = [
];
let newEntry={animal:'',fact:''};

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


app.post('/addAnimal', addAnimal);
app.get('/getAnimal',getData);

function addAnimal(req,res){

  newEntry.animal=req.body.animal;
  newEntry.fact=req.body.fact;
 projectData.push(newEntry);
 newEntry={animal:'',fact:''};
 

}


function getData(req,res){

    res.send(projectData);
    console.log(projectData,'data');
}
