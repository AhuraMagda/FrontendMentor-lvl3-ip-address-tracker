


// API to get geo location
const apiKey = "at_KXo5scKHkHqvoE4fJfRzFWOEeaU8Y";
let apiToCall;
apiToCall = localStorage.getItem("newApiToCall")

// result field
const ipAdress = document.querySelector("#ip-adress");
const ipLocation = document.querySelector("#location");
const ipTimezone = document.querySelector("#timezone");
const ipIsp = document.querySelector("#isp");

const submitButton = document.getElementById('submit-btn')


// 1. Set API to call
const setApiToCall = (ip) => {
  let newApiToCall;
  if (ip) {
    newApiToCall = "https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey + "&ipAddress=" + ip;
  } else {
    newApiToCall = "https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey;
  }
  localStorage.setItem("newApiToCall", newApiToCall)
}


// 2. Get data by local ip / given ip
async function getIpData() {
  const response = await fetch(apiToCall);
  data = await response.json();
  return data;
}


// 3. Result field - change value by data
async function changeValue() {
  await getIpData();
  ipAdress.innerHTML = data.ip;
  ipLocation.innerHTML = data.location.region;
  ipTimezone.innerHTML = "UTC " + data.location.timezone;
  ipIsp.innerHTML = data.isp;
  setMap(data.location.lat, data.location.lng)
}


// 4. Change the map
const setMap = (mapLat, mapLng) => {
  let map = L.map('map').setView([mapLat, mapLng], 17);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
  L.marker([mapLat, mapLng]).addTo(map)
    .openPopup();
}


// 0. Get input and do step 1-4
const getIpFromInput = () => {
  let newIp = document.getElementById('given-ip-input').value
  setApiToCall(newIp)
  changeValue()  
}


// First time on page - local IP data
setApiToCall();
changeValue()

submitButton.addEventListener("click", getIpFromInput)