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
let dayShort = DAYS_SHORT[date.getDay()];

const initApp = () => {
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
						populateData(data);
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

	function populateData(data) {
		// Current Data
		document.getElementById('date').innerText = month + ', ' + day + ' ' + date.getDate();
		document.getElementById('location').innerText = data.timezone.split('/').pop();
		document.getElementById('description').innerText = capitaliseString(data.current.weather[0].description);
		document.getElementById('temp').innerText = Math.round(data.current.temp) + '°';
		document.getElementById('tempMin').innerText = Math.round(data.daily[0].temp.min) + '°';
		document.getElementById('tempMax').innerText = Math.round(data.daily[0].temp.max) + '°';
		document.getElementById('clouds').innerText = data.current.clouds + '%';
		document.getElementById('wind').innerText = data.current.wind_speed + ' km/h';
		document.getElementById('windDeg').innerText = data.current.wind_deg;
		document.getElementById('humidity').innerText = data.current.humidity + '%';
		document.getElementById('pressure').innerText = data.current.pressure + ' hPa';
		document.getElementById('visibility').innerText = data.current.visibility / 1000 + ' km';
		document.getElementById('dewPoint').innerText = Math.round(data.current.dew_point) + '°';
		document.getElementById('uvi').innerText = data.current.uvi;
		document.getElementById('sunrise').innerText =
			new Date(data.current.sunrise * 1000).getHours() + ':' + new Date(data.current.sunrise * 1000).getMinutes();
		document.getElementById('sunset').innerText =
			new Date(data.current.sunset * 1000).getHours() + ':' + new Date(data.current.sunset * 1000).getMinutes();

		// 7 Days Forecast
		data.daily
			.slice(1) // This skip the 1st entry which is the current day
			.map((data) => {
				let date = new Date(data.dt * 1000);
				const list = document.createElement('div');
				list.classList.add('card');

				list.innerHTML = `
				<div class="card-body">
					<div class="flex horizontal details">
						<h5 class="titleS">${DAYS_SHORT[date.getDay()] + ' ' + date.getDate()}</h5>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M10.0033 5.97211C11.6618 5.26915 13.5 6.48651 13.5 8.28787C13.5 9.67697 12.3739 10.803 10.9848 10.803L5 10.803C4.44772 10.803 4 10.3553 4 9.80305C4 9.25076 4.44772 8.80305 5 8.80305L10.9848 8.80305C11.2693 8.80305 11.5 8.5724 11.5 8.28787C11.5 7.9189 11.1235 7.66955 10.7838 7.81354L10.6024 7.89043C10.0939 8.10595 9.50693 7.86845 9.29141 7.35995C9.07588 6.85146 9.31339 6.26452 9.82188 6.049L10.0033 5.97211ZM15.32 9.26583C16.5188 8.06699 18.4274 7.96128 19.7513 9.0204C20.5426 9.65345 21 10.6161 21 11.6242C21 13.4755 19.5005 15 17.6361 15L3.5 15C2.94772 15 2.5 14.5523 2.5 14C2.5 13.4477 2.94772 13 3.5 13L17.6361 13C18.3828 13 19 12.384 19 11.6242C19 11.2184 18.8147 10.8324 18.5019 10.5821C17.9738 10.1596 17.2124 10.2018 16.7342 10.68L16.2071 11.2071C15.8166 11.5977 15.1834 11.5977 14.7929 11.2071C14.4024 10.8166 14.4024 10.1834 14.7929 9.79291L15.32 9.26583ZM7 17C6.44772 17 6 17.4477 6 18C6 18.5523 6.44772 19 7 19H15C15.5523 19 16 18.5523 16 18C16 17.4477 15.5523 17 15 17H7Z"
								class="icons"
							/>
						</svg>
					</div>
					<div class="description">
						<h4 class="titleXS-regular tertiary">${capitaliseString(data.weather[0].description)}</h4>
					</div>
					<div class="flex horizontal details space8">
						<h3 class="titleXS secondary">Min</h3>
						<h3 class="titleXS primary">${Math.round(data.temp.min) + '°'}</h3>
					</div>
					<div class="flex horizontal details">
						<h3 class="titleXS secondary">Max</h3>
						<h3 class="titleXS primary">${Math.round(data.temp.max) + '°'}</h3>
					</div>
				</div>
				`;
				document.getElementById('daily-weather').appendChild(list);
			})
			.join('');
	}

	function capitaliseString(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
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
