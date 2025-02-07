const apiKey = "1d0d7c16f7eb396a653d359fea36b92f"; // Replace with your API key

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("weatherResult").innerHTML = "City not found!";
                return;
            }

            const weatherHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Weather: ${data.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
            `;
            document.getElementById("weatherResult").innerHTML = weatherHTML;
        })
        .catch(error => console.error("Error fetching data:", error));
}
