/* Global Variables */

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',preformAction)



function preformAction(e){
  const animal=document.getElementById('name').value;
  console.log(animal);
  const fact=document.getElementById('fact').value;
  console.log(fact);

  

    postAnimal('/addAnimal',{animal:animal,fact:fact}).then(
      getAnimalData('/getAnimal').then(updateUI('/getAnimal')
      )
      
    )
  




}
  const postAnimal = async ( url = '', data = {})=>{
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
  const getAnimalData = async ( url = '')=>{

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
   
    document.getElementById('recent').textContent=(newData.length-1!==0)?`Animal: ${newData[newData.length-2].animal} Fact: ${newData[newData.length-2].fact}`:"";
    


  }
  catch(error) {
    console.log("error", error);
  }


}

