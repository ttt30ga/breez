import * as icon from './icons.js';

document.addEventListener('readystatechange', (event) => {
	if (event.target.readyState === 'complete') {
		initApp();
	}
});

const API_KEY = '5a7b2510914a22fd7ba68845a8b74973';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Date
let date = new Date();
let month = MONTHS[date.getMonth()];
let day = DAYS[date.getDay()];
let offset = date.getTimezoneOffset() * 60;

const initApp = () => {
	let browserTitle = document.querySelector('title');
	let location = document.getElementById('location');
	let description = document.getElementById('description');
	let temp = document.getElementById('temp');
	let tempMin = document.getElementById('tempMin');
	let tempMax = document.getElementById('tempMax');
	let clouds = document.getElementById('clouds');
	let wind = document.getElementById('wind');
	let windDeg = document.getElementById('windDeg');
	let humidity = document.getElementById('humidity');
	let pressure = document.getElementById('pressure');
	let visibility = document.getElementById('visibility');
	let dewPoint = document.getElementById('dewPoint');
	let uvi = document.getElementById('uvi');
	let sunrise = document.getElementById('sunrise');
	let sunset = document.getElementById('sunset');
	let aqi = document.getElementById('aqi');

	function getGeolocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					let lat = position.coords.latitude;
					let lon = position.coords.longitude;

					getData(lat, lon)
						.then(([weatherData, airData, geoReverseData]) => {
							document.getElementById('hourly-weather').innerHTML = '';
							document.getElementById('daily-weather').innerHTML = '';
							populateCurrentData(weatherData, geoReverseData[0].name);
							populateForecastData(weatherData);
							populateAirQualityData(airData);
						})
						.catch((error) => {
							console.log(error);
						});
				},
				(error) => {
					isError(error);
					switch (error.code) {
						case error.PERMISSION_DENIED:
							location.innerText = '⚠️ Geolocation request denied.';
							break;
						case error.POSITION_UNAVAILABLE:
							navigator.onLine ? (location.innerText = '🌍 Location unavailable.') : (location.innerText = '📡 No internet.');
							break;
						case error.TIMEOUT:
							location.innerText = '⏰ Timed out request.';
							break;
						case error.UNKNOWN_ERROR:
							location.innerText = '🤔 Unknown error occurred.';
							break;
					}
				}
			);
		}
	}

	getGeolocation();

	const getData = async (lat, lon) => {
		const weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
		const air = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
		const geoReverse = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
		const [weatherResponse, airResponse, geoReverseResponse] = await Promise.all([fetch(weather), fetch(air), fetch(geoReverse)]);

		const weatherData = await weatherResponse.json();
		const airData = await airResponse.json();
		const geoReverseData = await geoReverseResponse.json();

		return [weatherData, airData, geoReverseData];
	};

	const getGeoDirectData = async (city) => {
		try {
			const geoDirect = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;
			const geoDirectResponse = await fetch(geoDirect);
			const geoDirectData = await geoDirectResponse.json();
			let lat = geoDirectData[0].lat;
			let lon = geoDirectData[0].lon;
			getData(lat, lon).then((data) => {
				document.getElementById('hourly-weather').innerHTML = '';
				document.getElementById('daily-weather').innerHTML = '';
				populateCurrentData(data[0], geoDirectData[0].name);
				populateForecastData(data[0]);
				populateAirQualityData(data[1]);
			});
			return geoDirectData;
		} catch (error) {
			location.innerText = '🗺️ Where to?';
			isError(error);
		}
	};

	// Search
	let searchForm = document.getElementById('searchForm');
	let search = document.getElementById('search');

	searchForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const city = search.value;

		if (city) {
			getGeoDirectData(city);
			search.value = '';
		}
	});

	function populateAirQualityData(data) {
		let index = data.list[0].main.aqi;

		if (index == 1) {
			aqi.innerText = 'Air - Good';
		} else if (index == 2) {
			aqi.innerText = 'Air - Fair';
		} else if (index == 3) {
			aqi.innerText = 'Air - Moderate';
		} else if (index == 4) {
			aqi.innerText = 'Air - Poor';
		} else if (index == 5) {
			aqi.innerText = 'Air - Very Poor';
		}
	}

	function populateCurrentData(data, cityName) {
		// TODO: Add all data to an object so to map through and create string HTML
		// TODO: Remove html tags from index.html
		if (cityName) {
			let dateSunrise = new Date((data.current.sunrise + data.timezone_offset + offset) * 1000);
			let dateSunset = new Date((data.current.sunset + data.timezone_offset + offset) * 1000);

			browserTitle.innerText = cityName + ' ' + Math.round(data.current.temp) + '°';
			date.innerText = month + ', ' + day + ' ' + date.getDate();
			location.innerText = cityName;
			description.innerText = capitaliseString(data.current.weather[0].description);
			temp.innerText = Math.round(data.current.temp) + '°';
			tempMin.innerText = Math.round(data.daily[0].temp.min) + '°';
			tempMax.innerText = Math.round(data.daily[0].temp.max) + '°';
			clouds.innerText = data.current.clouds + '%';
			wind.innerText = data.current.wind_speed + ' km/h';
			windDeg.innerText = data.current.wind_deg;
			humidity.innerText = data.current.humidity + '%';
			pressure.innerText = data.current.pressure + ' hPa';
			visibility.innerText = data.current.visibility / 1000 + ' km';
			dewPoint.innerText = Math.round(data.current.dew_point) + '°';
			uvi.innerText = data.current.uvi;
			sunrise.innerText = dateSunrise.getHours() + ':' + (dateSunrise.getMinutes() < 10 ? '0' : '') + dateSunrise.getMinutes();
			sunset.innerText = dateSunset.getHours() + ':' + (dateSunset.getMinutes() < 10 ? '0' : '') + dateSunset.getMinutes();
		}
		switchTheme(data);
	}

	function populateForecastData(data) {
		data.hourly
			.slice(0, 25) // This shows only the first 24 hrs
			.map((dataHourly) => {
				let date = new Date((dataHourly.dt + data.timezone_offset + offset) * 1000);
				const hourlyList = document.createElement('div');

				hourlyList.innerHTML = `
				<div class="flex vertical hourly details">
					${populateIcon(dataHourly.weather[0].id, dataHourly.weather[0].icon)}
					<h5 class="titleXS secondary">${date.getHours()}</h5>
				</div>
				`;
				document.getElementById('hourly-weather').appendChild(hourlyList);
			});

		data.daily
			.slice(1) // This skip the 1st entry which is the current day
			.map((dataDaily) => {
				let date = new Date(dataDaily.dt * 1000);
				const dailyList = document.createElement('div');
				dailyList.classList.add('card');

				dailyList.innerHTML = `
				<div class="card-body">
					<div class="flex horizontal details">
						<h5 class="titleS">${DAYS_SHORT[date.getDay()] + ' ' + date.getDate()}</h5>
						${populateIcon(dataDaily.weather[0].id, dataDaily.weather[0].icon)}
					</div>
					<div class="description">
						<h4 class="titleXS-regular tertiary">${capitaliseString(dataDaily.weather[0].description)}</h4>
					</div>
					<div class="flex horizontal details space8">
						<h3 class="titleXS secondary">Min</h3>
						<h3 class="titleXS primary">${Math.round(dataDaily.temp.min) + '°'}</h3>
					</div>
					<div class="flex horizontal details">
						<h3 class="titleXS secondary">Max</h3>
						<h3 class="titleXS primary">${Math.round(dataDaily.temp.max) + '°'}</h3>
					</div>
				</div>
				`;
				document.getElementById('daily-weather').appendChild(dailyList);
			})
			.join('');
	}

	function populateIcon(id, iconCode) {
		if (id >= 200 && id <= 232) {
			return icon.thunderstorm;
		} else if (id >= 300 && id <= 321) {
			return icon.showerRain;
		} else if (id >= 500 && id <= 504) {
			return icon.rain;
		} else if (id == 511) {
			return icon.snow;
		} else if (id >= 520 && id <= 531) {
			return icon.showerRain;
		} else if (id >= 600 && id <= 622) {
			return icon.snow;
		} else if (id >= 700 && id <= 781) {
			return icon.showerRain;
		} else if (id == 800) {
			if (iconCode == '01d') {
				return icon.sun;
			} else {
				return icon.moon;
			}
		} else if (id == 801) {
			if (iconCode == '02d') {
				return icon.fewClouds;
			} else {
				return icon.fewCloudsNight;
			}
		} else if (id == 802) {
			if (iconCode == '03d') {
				return icon.scatteredClouds;
			} else {
				return icon.scatteredCloudsNight;
			}
		} else if (id == 803 || id == 804) {
			return icon.brokenClouds;
		}
	}

	function capitaliseString(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	function switchTheme(data) {
		let dateSunrise = new Date((data.current.sunrise + data.timezone_offset + offset) * 1000);
		let dateSunset = new Date((data.current.sunset + data.timezone_offset + offset) * 1000);
		let dateTime = new Date((data.current.dt + data.timezone_offset + offset) * 1000);

		dateTime < dateSunrise || dateTime > dateSunset
			? document.documentElement.setAttribute('data-theme', 'dark')
			: document.documentElement.setAttribute('data-theme', 'light');
	}

	function isError(error) {
		document.getElementById('hourly-weather').innerHTML = '';
		document.getElementById('daily-weather').innerHTML = '';
		if (error) {
			description.innerText = '-';
			temp.innerText = '';
			tempMin.innerText = '-';
			tempMax.innerText = '-';
			clouds.innerText = '-';
			wind.innerText = '-';
			windDeg.innerText = '-';
			humidity.innerText = '-';
			pressure.innerText = '-';
			visibility.innerText = '-';
			dewPoint.innerText = '-';
			uvi.innerText = '-';
			sunrise.innerText = '-';
			sunset.innerText = '-';
			aqi.innerText = '-';
		}
	}
};
