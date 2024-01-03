const fetchData = async (city) => {
  const apiKey = "adcdfdaf9c470d668d782600993614e2";
  const units = "metric";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      alert("City not found");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = (data) => {
  const {
    name: cityName,
    main: { temp, humidity, pressure },
    sys: { country },
    clouds: { all: clouds },
    wind: { speed: wind },
    weather,
  } = data;

  const mainWeather = weather[0].main;

  result.innerHTML = `
    <div>
      <div class="temp">
        <h1>${Math.floor(temp)}°C</h1>
        <div class="city">
          <p>${cityName}</p>
          <p>${mainWeather}</p>
        </div>
      </div>
      <div class="details-container">
        <div class="details">
          <h3>Clouds</h3>
          <h1>${clouds}</h1>
        </div>
        <div class="details">
          <h3>Humidity</h3>
          <h1>${humidity}</h1>
        </div>
        <div class="details">
          <h3>Pressure</h3>
          <h1>${pressure}</h1>
        </div>
        <div class="details">
          <h3>Country</h3>
          <h1>${country}</h1>
        </div>
        <div class="details">
          <h3>Wind</h3>
          <h1>${wind}km/h</h1>
        </div>
      </div>
    </div>
  `;
};

const searchData = async () => {
  const city = inputData.value;

  if (city) {
    try {
      const data = await fetchData(city);
      updateUI(data);
    } catch (error) {
      error.innerHTML = error.message;
    }
  } else {
    error.innerHTML = "Enter a value!";
  }
};
