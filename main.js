const apiKey = "ce4dd9351100471eb6a160652232010";
// const locationName = "annaba";
let lat;
let lon;

function getLocation() {
    try {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } catch {
        document.getElementById("err").innerHTML = "ERROR";
    }
}

getLocation();
function showPosition(position) {
    lat = position.coords.latitude; 
    lon = position.coords.longitude;

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`;
    fetch(apiUrl)
    .then((result) => {
        let myData = result.json(); 
        console.log(myData);
        return myData
    }).then((data) =>{
        // console.log(`the temperature at ${data.location.region} is : `+ data.current.temp_c);
        // console.log(`the humidity at ${data.location.region} is : ` + data.current.humidity);
        document.getElementById("temp").innerHTML ="&nbsp"+ data.current.temp_c + "&deg;";
        document.getElementById("hum").innerHTML ="&nbsp"+ data.current.humidity + "%";
        document.getElementById("reg").innerHTML = `${data.location.region}, ${data.location.country}`;
        document.getElementById("ico").src = data.current.condition.icon;
        document.getElementById("conditionText").innerHTML = data.current.condition.text;
        document.getElementById("lastUpd").innerHTML ="Last Updated On : "+ data.current.last_updated;
        document.getElementById("humIco").src = "icons/humidity.png";
    }).catch((error) => {
        console.log(error);
        document.getElementById("err").innerHTML = "Invalid Location";
    });
}


function showError(error) {
    if (error.code === error.PERMISSION_DENIED) {
        // Geolocation is available, but the user denied permission
        document.getElementById("err").innerHTML = "PLease Turn On Your GPS";
    } else {
        // Geolocation is available, but an error occurred
        document.getElementById("err").innerHTML = "An error occurred while trying to access geolocation data";
    }
}


// const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationName}&aqi=yes`;
