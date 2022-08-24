/* Global Variables */
const apikey="&appid=2c57d4b334fa1a6a98cc6b5e517476c1";
const baseurl="https://api.openweathermap.org/data/2.5/weather?zip=";
const unitsUrl ="&units="
 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let Temp ;
let City;

document.getElementById('generate').addEventListener('click',preformAction);
document.getElementById('update').addEventListener('click',preformUpdate);
document.getElementById('alldata').addEventListener('click',showAlldata);
document.getElementById('clear').addEventListener('click',clearAll);
unit = document.getElementById('units').value;
console.log(unit);


function clearAll(){

    clearData('/clearAll');

}


function preformAction(e){
  const zipcode=document.getElementById('zipcode').value;
  console.log(zipcode);
  const feeling=document.getElementById('feeling').value;
  console.log(feeling);

  
  getTemp(baseurl,zipcode,apikey,unitsUrl,unit).then(function(data){
    
    postData('/addData',{zipcode:zipcode,city:data.name,feeling:feeling,date:newDate,temp:data.main.temp})
  }
    );
    
  
  



}

function showAlldata(){

  getAllData('/getAllData');
}
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
      const newData = "NO DATA!";
      document.getElementById('recent').textContent=newData;

    }catch(error) {
    console.log("error", error);
    }
}
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

