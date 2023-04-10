
// Adding a map to the page
// var map = L.map('map').setView([51.505, -0.09], 13);

let mapLat = 51.505;
let mapLng = -0.09;



// My api key and given IP

const apiKey = "at_Kj8jaalEUx3dQLHFZI3jj2yeer6BU";
let ip = "68.103.99.97"; 
ip = localStorage.getItem("newIp") //musi być na zewnątrz, żeby to działało po odświeżeniu bo tak to nie wywoła funkcji
let apiToCall = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=" + apiKey + "&ipAddress=" + ip;
console.log(apiToCall)

// Get input


const getIpFromInput = () => {
  newIp = document.getElementById('given-ip-input').value
  localStorage.setItem("newIp", newIp) //zapisujemy nowe ip w pamięci
  ip = localStorage.getItem("newIp") //nadpisywanie?
  apiToCall = "https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey + "&ipAddress=" + ip;
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
  ipIsp.innerHTML = data.isp
  changeMap(data.location.lat, data.location.lng)
  setMap()
}

changeValue()


// changing the map



const changeMap = (newLat, newLng) => {
  mapLat = newLat;
  mapLng = newLng;
  console.log("map lat: " + mapLat)
}


const setMap = () => {
  let map = L.map('map').setView([mapLat, mapLng], 17);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}
