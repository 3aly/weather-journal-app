/* Global Variables */
const apikey="&appid=2c57d4b334fa1a6a98cc6b5e517476c1";
const baseurl="https://api.openweathermap.org/data/2.5/weather?zip=";
const unitsUrl ="&units="
 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let Temp ;
let City;
let units;

//add the event listner on click for all buttons in the app
document.getElementById('generate').addEventListener('click',preformAction);
document.getElementById('update').addEventListener('click',preformUpdate);
document.getElementById('alldata').addEventListener('click',showAlldata);
document.getElementById('clear').addEventListener('click',clearAll);


/*********start main functions*********/


//clear all project data on click
function clearAll(){

    clearData('/clearAll');

}

//call the api and get the value of the temp, post it to the server data
function preformAction(e){
  
  //get the zipcode value from the input field and save it to a const
  const zipcode=document.getElementById('zipcode').value;

  //get the feeling value from the input field and save it to a const
  const feeling=document.getElementById('feeling').value;

  //get the selected unit form the user
  unit = document.getElementById('units').value;

  //call the api, pass the collected argument to it, then post the data to the server
  getTemp(baseurl,zipcode,apikey,unitsUrl,unit).then(
    
    //use the data retrived from the API and the data collected from the user and post it to the server data 
    function(data){
    postData('/addData',{zipcode:zipcode,city:data.name,feeling:feeling,date:newDate,temp:data.main.temp})
  }
    );
    
  
  



}
//get all the data saved at the server
function showAlldata(){

  getAllData('/getAllData');
}

//responsible for updating the ui on click after any operation 
function preformUpdate(){
  updateUI();
}


  const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData,);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }


/*********end main functions*********/




/*********start POST GET methods*********/


//POST method to empty the projectData array
  const clearData = async ( url = '' )=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
  });

    try {
      const newData = "Data Cleared!";
      
      document.getElementById('recent').textContent=newData;

    }catch(error) {
    console.log("error", error);
    }
}

  //GET method to get the last object pushed in the projectData array at the server
  const getData = async ( url = '')=>{

    const res = await fetch(url);
    try {
      const newData = await res.json();
      console.log(newData,"retrived data");
      return newData;


    }
    catch(error) {
      console.log("error", error);
    }


}

//get the whole project data array of objects, loop through each element and print it's content and index
const getAllData = async ( url = '')=>{
  const res = await fetch(url);
  try {
    const newData = await res.json();
    
    console.log(newData);
    document.getElementById('recent').textContent="";
    newData.forEach((element,index) => {
      document.getElementById('recent').textContent+=
    `${index}:
      ---
      Zipcode: ${element.zipcode},
      City: ${element.city}
      Feeling: ${element.feeling},
      Date: ${element.date}
      Temp: ${element.temp}
      ---
      `
      ;
      
    });
      
    }
     
   
    


  
  catch(error) {
    console.log("error", error);
  }
}

//get the last object in the projectData array and print it in the 'recent' textarea
const updateUI = async  ( )=>{

  const res = await fetch('/getData');
  try {
    const newData = await res.json();
    
    console.log(newData);
   
    document.getElementById('recent').textContent=`
    Zipcode: ${newData.zipcode},
    City: ${newData.city}
    Feeling: ${newData.feeling},
    Date: ${newData.date}
    Temp: ${newData.temp}
    `;


  }
  catch(error) {
    console.log("error", error);
  }


}

//build the api request link sen it to the api server 
const getTemp = async (baseurl,zipcode,apikey,unitsUrl,unit)=>{
  
  console.log(baseurl+zipcode+apikey+unitsUrl+unit);

  const res = await fetch(baseurl+zipcode+apikey+unitsUrl+unit);
  
  try {
    
    const newData = await res.json();
    
    return newData;


  }
  catch(error) {
    console.log("error", error);
  }
}
/*********end POST GET functions*********/

