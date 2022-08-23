/* Global Variables */
const apikey="&appid=2c57d4b334fa1a6a98cc6b5e517476c1&units=metric";
const baseurl="https://api.openweathermap.org/data/2.5/weather?zip=";
 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let Temp ;
let City;

document.getElementById('generate').addEventListener('click',preformAction);
document.getElementById('update').addEventListener('click',preformUpdate);
document.getElementById('alldata').addEventListener('click',showAlldata);
document.getElementById('clear').addEventListener('click',clearAll);

function clearAll(){

    clearData('/clearAll');

}


function preformAction(e){
  const zipcode=document.getElementById('zipcode').value;
  console.log(zipcode);
  const feeling=document.getElementById('feeling').value;
  console.log(feeling);

  
  getTemp(baseurl,zipcode,apikey).then(function(data){
    
    postData('/addData',{zipcode:zipcode,city:data.name,feeling:feeling,date:newDate,temp:data.main.temp})
  }
    );
    
  
  



}

function showAlldata(){

  getAllData('/getAllData');
}
function preformUpdate(){

  updateUI("/getData");
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
  const clearData = async ( url = '', data = {})=>{
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
   
    newData.array.forEach(element => {
      document.getElementById('recent').textContent=element.city;
    });
     
   
    


  }
  catch(error) {
    console.log("error", error);
  }
}
const updateUI = async  ( url = '')=>{

  const res = await fetch(url);
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

const getTemp = async (baseurl,zipcode,apikey)=>{

  const res = await fetch(baseurl+zipcode+apikey);
  
  try {
    
    const newData = await res.json();
    
    return newData;


  }
  catch(error) {
    console.log("error", error);
  }
}

// getTemp(baseurl,'85730',apikey);