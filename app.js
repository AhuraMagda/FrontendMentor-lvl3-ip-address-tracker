
// Adding a map to the page
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// My api key and given IP

const apiKey = "at_Kj8jaalEUx3dQLHFZI3jj2yeer6BU";
let ip = "211.14.214.5"; 
let apiToCall = "https://geo.ipify.org/api/v2/country?apiKey=" + apiKey + "&ipAddress=" + ip;
console.log(apiToCall)

// Get input


const getIpFromInput = () => {
  ip = document.getElementById('given-ip-input').value
  apiToCall = "https://geo.ipify.org/api/v2/country?apiKey=" + apiKey + "&ipAddress=" + ip;
  changeValue()  
}

const submitButton = document.getElementById('submit-btn')
submitButton.addEventListener("click", getIpFromInput)


// Get data by given IP
let data;

async function getIpData() {
  console.log(apiToCall)
  const response = await fetch(apiToCall);
  data = await response.json();
  console.log(data)
}


// Result - change value by data
const ipAdress = document.querySelector("#ip-adress");
const ipLocation = document.querySelector("#location");
const ipTimezone = document.querySelector("#timezone");
const ipIsp = document.querySelector("#isp");

async function changeValue() {
  await getIpData();
  ipAdress.innerHTML = data.ip
  ipLocation.innerHTML = data.location.region
  ipTimezone.innerHTML = "UTC " + data.location.timezone
  ipIsp.innerHTML = data.ispgirb
changeValue()

// random ip 211.14.214.5
