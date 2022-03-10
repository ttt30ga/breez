document.addEventListener('readystatechange', (event) => {
	if (event.target.readyState === 'complete') {
		initApp();
	}
});

const API_KEY = '5a7b2510914a22fd7ba68845a8b74973';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAYS_SHORT = ['Mon', 'Tue', 'Wedn', 'Thu', 'Fri', 'Sat', 'Sun'];

// Date
let date = new Date();
let month = MONTHS[date.getMonth()];
let day = DAYS[date.getDay()];
let day_short = DAYS_SHORT[date.getDay()];

const initApp = () => {
	let city = 'London';

	function getGeolocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					let lat = position.coords.latitude;
					let lon = position.coords.longitude;

					const getWeatherData = async () => {
						try {
							const weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=metric&appid=${API_KEY}`;
							const response = await fetch(weather);
							const data = await response.json();
							return data;
						} catch (err) {
							console.log(err);
						}
					};

					getWeatherData().then((data) => {
						populateDailyData(data);
					});

					const getCityData = async () => {
						try {
							const currentData = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
							const response = await fetch(currentData);
							const data = await response.json();
							return data;
						} catch (err) {
							console.log(err);
						}
					};

					getCityData().then((data) => {
						populateCityData(data);
					});
				},
				(error) => {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							x.innerHTML = 'User denied the request for Geolocation.';
							break;
						case error.POSITION_UNAVAILABLE:
							x.innerHTML = 'Location information is unavailable.';
							break;
						case error.TIMEOUT:
							x.innerHTML = 'The request to get user location timed out.';
							break;
						case error.UNKNOWN_ERROR:
							x.innerHTML = 'An unknown error occurred.';
							break;
					}
				}
			);
		}
	}

	getGeolocation();

	function populateDailyData(data) {
		for (i = 0; i < 7; i++) {
			let daily = data.daily[i];
			let dailyDescription = daily.weather[0].description;
			let dailyTempMin = daily.temp.min;
			let dailyTempMax = daily.temp.max;
			let dailyTempMorn = daily.temp.morn;
			let dailyTempDay = daily.temp.day;
			let dailyTempEve = daily.temp.eve;
			let dailyTempNight = daily.temp.night;
			let dailySunrise = daily.sunrise;
			let dailySunset = daily.sunset;
			let dailyMoonrise = daily.moonrise;
			let dailyMoonset = daily.moonset;
			let dailyMoonPhase = daily.moon_phase;

			document.getElementById('daily-weather').innerHTML = `
			<div class="card col-lg-2 col-6">
				<div class="card-body">
					<div class="flex horizontal details">
						<h5 class="titleS">${day_short + ' ' + date.getDate()}</h5>
						<svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M8.0033 0.972089C9.66184 0.269133 11.5 1.48649 11.5 3.28785C11.5 4.67695 10.3739 5.80303 8.98482 5.80303L3 5.80303C2.44772 5.80303 2 5.35532 2 4.80303C2 4.25075 2.44772 3.80303 3 3.80303L8.98482 3.80303C9.26935 3.80303 9.5 3.57238 9.5 3.28785C9.5 2.91888 9.12349 2.66953 8.78378 2.81352L8.60236 2.89041C8.09386 3.10593 7.50693 2.86843 7.29141 2.35993C7.07588 1.85144 7.31339 1.2645 7.82188 1.04898L8.0033 0.972089ZM13.32 4.26581C14.5188 3.06697 16.4274 2.96126 17.7513 4.02038C18.5426 4.65343 19 5.61604 19 6.6242C19 8.47544 17.5005 10 15.6361 10L1.5 10C0.947715 10 0.5 9.55228 0.5 9C0.5 8.44772 0.947715 8 1.5 8L15.6361 8C16.3828 8 17 7.384 17 6.6242C17 6.21837 16.8147 5.83237 16.5019 5.58212C15.9738 5.15963 15.2124 5.20179 14.7342 5.68002L14.2071 6.20711C13.8166 6.59763 13.1834 6.59763 12.7929 6.20711C12.4024 5.81658 12.4024 5.18342 12.7929 4.79289L13.32 4.26581ZM5 12C4.44772 12 4 12.4477 4 13C4 13.5523 4.44772 14 5 14L13 14C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12L5 12Z"
								class="icons"
							/>
						</svg>
					</div>
					<div class="description">
						<h4 class="titleXS-regular tertiary">${dailyDescription}</h4>
					</div>
					<div class="flex horizontal details spaceS">
						<h3 class="titleXS secondary">Min</h3>
						<h3 class="titleXS primary">${Math.round(dailyTempMin) + '°'}</h3>
					</div>
					<div class="flex horizontal details spaceS">
						<h3 class="titleXS secondary">Max</h3>
						<h3 class="titleXS primary">${Math.round(dailyTempMax) + '°'}</h3>
					</div>
					<hr class="divider" />
					<div class="flex horizontal details spaceS">
						<h3 class="titleXS secondary">Morning</h3>
						<h3 class="titleXS primary">${Math.round(dailyTempMorn) + '°'}</h3>
					</div>
					<div class="flex horizontal details spaceS">
						<h3 class="titleXS secondary">Day</h3>
						<h3 class="titleXS primary">${Math.round(dailyTempDay) + '°'}</h3>
					</div>
					<div class="flex horizontal details spaceS">
						<h3 class="titleXS secondary">Evening</h3>
						<h3 class="titleXS primary">${Math.round(dailyTempEve) + '°'}</h3>
					</div>
					<div class="flex horizontal details">
						<h3 class="titleXS secondary">Night</h3>
						<h3 class="titleXS primary">${Math.round(dailyTempNight) + '°'}</h3>
					</div>
				</div>
			</div>
			`;

			console.log(daily);
		}
	}

	function populateCityData(data) {
		let location = data.name;
		let description = data.weather[0].description;
		let temp = data.main.temp;
		let tempMin = data.main.temp_min;
		let tempMax = data.main.temp_max;
		let humidity = data.main.humidity;
		let pressure = data.main.pressure;
		let wind = data.wind.speed;
		let clouds = data.clouds.all;
		let sunrise = data.sys.sunrise;
		let sunset = data.sys.sunset;

		document.getElementById('date').innerText = month + ', ' + day + ' ' + date.getDate();
		document.getElementById('location').innerText = location;
		document.getElementById('description').innerText = description;
		document.getElementById('temp').innerText = Math.round(temp) + '°';
		document.getElementById('tempMin').innerText = Math.round(tempMin) + '°';
		document.getElementById('tempMax').innerText = Math.round(tempMax) + '°';
		document.getElementById('clouds').innerText = clouds + '%';
		document.getElementById('wind').innerText = wind + 'km/h';
		document.getElementById('humidity').innerText = humidity + '%';
		document.getElementById('pressure').innerText = pressure;
		document.getElementById('sunrise').innerText = new Date(sunrise * 1000).getHours() + ':' + new Date(sunrise * 1000).getMinutes();
		document.getElementById('sunset').innerText = new Date(sunset * 1000).getHours() + ':' + new Date(sunset * 1000).getMinutes();
	}

	// const search = () => {
	// 	document.getElementById('go').addEventListener('click', () => {
	// 		let value = document.getElementById('search').value;
	// 		console.log(value);
	// 		return value;
	// 	});
	// };

	// search();
};
