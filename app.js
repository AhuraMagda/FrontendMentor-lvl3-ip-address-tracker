


// API to get geo location
const apiKey = "at_KXo5scKHkHqvoE4fJfRzFWOEeaU8Y";
let apiToCall = "https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey;

// result field
const ipAdress = document.querySelector("#ip-adress");
const ipLocation = document.querySelector("#location");
const ipTimezone = document.querySelector("#timezone");
const ipIsp = document.querySelector("#isp");
let map = false;
let marker;

const submitButton = document.getElementById('submit-btn')


// 0. test what type of input it is
const testInput = () => {
    let input = document.getElementById('given-ip-input').value
    let ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    let domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
    if(ipRegex.test(input)) {
        setApiByIp(input)
    } else if (domainRegex.test(input)) {
        setApiByDomain(input)
    } else {
        return
    }
  }

// 1. Set API to call (by IP)
const setApiByIp = (ip) => {
    let newApiToCall;
    newApiToCall = "https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey + "&ipAddress=" + ip;
    changeValue(newApiToCall)
}

// 1. Set API to call (by domain)
const setApiByDomain = (domain) => {
    let newApiToCall;
    newApiToCall = "https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey + "&domain=" + domain;
    changeValue(newApiToCall)
}


// 2. Get data by local ip / given ip
async function getIpData(newApiToCall) {
  const response = await fetch(newApiToCall);
  data = await response.json();
  return data;
}


// 3. Result field - change value by data
async function changeValue(api) {
  await getIpData(api);
  ipAdress.innerHTML = data.ip;
  ipLocation.innerHTML = data.location.region;
  ipTimezone.innerHTML = "UTC " + data.location.timezone;
  ipIsp.innerHTML = data.isp;
  setMap(data.location.lat, data.location.lng)
}


// 4. Change the map
const setMap = (mapLat, mapLng) => {
    let myIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [30, 40],
    });

    if(!map) {
        map = L.map('map').setView([mapLat, mapLng], 17);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        marker = L.marker([mapLat, mapLng], { icon: myIcon } ).addTo(map)
          .openPopup();
    } else {
        map.setView([mapLat, mapLng], 13);
        marker.setLatLng([mapLat, mapLng])
    }

}

// Change "Enter" press to button click
let inputField = document.getElementById('given-ip-input')

inputField.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      submitButton.click();
    }
  });



// First time on page - local IP data (i guess it doesn't work)

changeValue(apiToCall)

submitButton.addEventListener("click", testInput)

