
// załączamy mapę
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// my api

const apiKey = "at_xBJdAtUKy09djAvrhjBmeCl6kNzOc";
let ip = "192.168.0.60";
let apiToCall = "https://geo.ipify.org/api/v2/country?apiKey=" + apiKey + "&ipAddrxess=" + ip


// input - get ip
const getInputValue = () => {
  let givenIp = document.querySelector('#given-ip').value
  console.log(givenIp)
}

// get data by ip
let data;
async function getIpData() {
  const response = await fetch(apiToCall);
  console.log(apiToCall)
  data = await response.json();
  // console.log(data)
  // console.log(data.ip)
  // console.log(data.location.region)
  // console.log(data.location.timezone)
  // console.log(data.isp)
}


// result
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
}

changeValue()


