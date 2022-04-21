<p align="center">
  <img src="./images/logo.svg" width="300px">
</p>

<p align="center">A web-based weather app</p>

## About

Breez is a weather app for the web made with plain HTML, CSS and Javascript

## Data

Breez uses data from the [OpenWeather API](https://openweathermap.org/api).

## Usage

You can freely download the project and register [here](https://openweathermap.org/api) to get your API KEY.
At that point just add the key in `app.js`

```javascript
const API_KEY = 'xxxxx';
```

> ⚠️ The API KEY used in old commits has been deleted.

## Features

-   **Geolocation** - Get geographical position of the user.
-   **Search City** - Search over 200,000 cities.
-   **Air Quality Index** - Current air pollution data.
-   **Hourly Forecast** - Display weather forecast for the next 24 hrs.
-   **Daily Forecast** - Display weather forecast for the following 7 days.
-   **Current Weather** - Current weather including:
    -   Min & Max
    -   Sunrise & Sunset
    -   Wind & Wind Degree
    -   Clouds, Visibility, Humidity, Pressure, UV Index, Dew Point

## License

This project is open source and available under the [MIT License](LICENSE).

![Breez Light](./images/breez-light.png)
![Breez Dark](./images/breez-dark.png)

<p float="left">
  <img src="./images/breez-geolocation-denied.png" width="49%" align="left"/>
  <img src="./images/breez-no-internet.png" width="49%" align="right"/> 
</p>
