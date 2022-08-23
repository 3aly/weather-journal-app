/* Global Variables */
const apikey="&appid=2c57d4b334fa1a6a98cc6b5e517476c1&units=metric";
const baseurl="https://api.openweathermap.org/data/2.5/weather?zip=";
 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let Temp ;

document.getElementById('generate').addEventListener('click',preformAction)



function preformAction(e){
  const zipcode=document.getElementById('zipcode').value;
  console.log(zipcode);
  const feeling=document.getElementById('feeling').value;
  console.log(feeling);

  
  getTemp(baseurl,zipcode,apikey).then(
    postData('/addData',{zipcode:zipcode,feeling:feeling,date:newDate,temp:Temp}).then(updateUI('/getData')
      )
      
    )
  
  




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
        console.log(newData,'postAnimal');
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
  const getData = async ( url = '')=>{

    const res = await fetch(url);
    try {
      const newData = await res.json();
      console.log(newData,'getAniaml');
      return newData;


    }
    catch(error) {
      console.log("error", error);
    }


}
const updateUI = async  ( url = '')=>{

  const res = await fetch(url);
  try {
    const newData = await res.json();
   
    document.getElementById('recent').textContent=(newData.length-1!==0)?`
    Zipcode: ${newData[newData.length-2].zipcode}, \n
    Feeling: ${newData[newData.length-2].feeling},
    Date: ${newData[newData.length-2].date}
    Temp: ${Temp}
    `:"";
    


  }
  catch(error) {
    console.log("error", error);
  }


}

const getTemp = async (baseurl,zipcode,apikey)=>{

  const res = await fetch(baseurl+zipcode+apikey);
  
  try {
    const newData = await res.json();
    
    Temp=newData.main.temp;
    console.log(Temp,'Temp');
    return newData;


  }
  catch(error) {
    console.log("error", error);
  }
}

// getTemp(baseurl,'85730',apikey);