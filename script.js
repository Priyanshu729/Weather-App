const apikey = "09e79eaf2984514c8c52f6e965117b8e"
const searchinput = document.getElementById("input1");
const searchbtn = document.getElementById("btn");
const locate=document.getElementById("location");
const answer=document.getElementById("weather1");

//function for displaying data

function displayweather(data,ans){
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}${ans}`;

    document.querySelector(".desc").innerHTML = (data.weather[0].description)[0].toUpperCase() + data.weather[0].description.slice(1);
    document.querySelector(".temp2").innerHTML = data.name;

    document.querySelector(".wind").innerHTML = `${data.wind.speed}Km/h`;

    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;

    document.querySelector("#icon").src = `images/${(data.weather[0].main).toLowerCase()}.png`;

   
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}
//asynchronous function finding weather using city name

async function checkweather(city,ans) {
    const apiurl = ans ==='°C'?"https://api.openweathermap.org/data/2.5/weather?units=metric&q=":"https://api.openweathermap.org/data/2.5/weather?units=standard&q=";
    const response = await fetch(apiurl + city + `&appid=${apikey}`);//fetching data using openweather api
    if (response.status == 404) {
        document.querySelector(".error").innerHTML = "Invalid City Name";//display error message
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        const data = await response.json();
       displayweather(data,ans);//calling display function
       //console.log(data);

    }

};
searchbtn.addEventListener("click", () => {
    //if input is nothing then show user some message
    if(searchinput.value==""){
        
        document.querySelector(".error").innerHTML = "Please Enter City Name";//display error message
        document.querySelector(".error").style.display = "block";
        
    }else{
        checkweather(searchinput.value,answer.value);
        
    }
});
//finding weather of current location using geolocation 
async function gotlocation(position){
    const {latitude,longitude}=position.coords;//acessing coordinates from geoloaction
    const apiurl = answer.value ==='°C'?`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&q=`:`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=standard&q=`;
    const response = await fetch(apiurl + `&appid=${apikey}`);//fetching open weather api using coordinates
    if (response.status == 404) {
        document.querySelector(".error").innerHTML = "Invalid City Name";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        const data = await response.json();
       displayweather(data,answer.value);
       //console.log(data);

    } 
}function failtoconnect(){
    //if user dont give location permisssion show pop up message//

    document.querySelector(".error").innerHTML = "Permission Denied";

    document.querySelector(".error").style.display = "block";

    document.querySelector(".weather").style.display = "none";
    
}
locate.addEventListener('click',async()=>{
    searchinput.value=""
    navigator.geolocation.getCurrentPosition(gotlocation,failtoconnect);
});




