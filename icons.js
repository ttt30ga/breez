const sun = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#FFC634"/>
    </svg>
`;

const moon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1798 15.9726C19.9309 16.6287 18.5088 17 17 17C12.0294 17 8 12.9706 8 8C8 5.7772 8.80581 3.74262 10.1412 2.17242C5.50657 3.04362 2 7.1123 2 12C2 17.5228 6.47715 22 12 22C16.1112 22 19.643 19.519 21.1798 15.9726Z" fill="#8798B5"/>
        <path d="M15 5L15.1393 5.68986C15.4479 7.21785 16.5329 8.4733 18 9V9V9C16.5329 9.5267 15.4479 10.7822 15.1393 12.3101L15 13L14.8607 12.3101C14.5521 10.7822 13.4671 9.5267 12 9V9V9C13.4671 8.4733 14.5521 7.21785 14.8607 5.68986L15 5Z" fill="#D0D7E9"/>
        <path d="M20 2L20.0742 2.34436C20.2912 3.35214 21.023 4.17116 22 4.5V4.5V4.5C21.023 4.82883 20.2913 5.64785 20.0742 6.65564L20 7L19.9258 6.65564C19.7087 5.64785 18.977 4.82883 18 4.5V4.5V4.5C18.977 4.17117 19.7087 3.35214 19.9258 2.34436L20 2Z" fill="#D0D7E9"/>
    </svg>
`;

const fewClouds = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16.5" cy="9.5" r="5.5" fill="#FFC634"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 17.866 5.13401 21 9 21H17C19.7614 21 22 18.7614 22 16C22 13.2386 19.7614 11 17 11C16.4547 11 15.9299 11.0873 15.4386 11.2486C14.3696 8.75042 11.8892 7 9 7C5.13401 7 2 10.134 2 14Z" fill="#CCD2E3"/>
    </svg>
`;

const fewCloudsNight = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16.5" cy="9.5" r="5.5" fill="#8798B5"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 17.866 5.13401 21 9 21H17C19.7614 21 22 18.7614 22 16C22 13.2386 19.7614 11 17 11C16.4547 11 15.9299 11.0873 15.4386 11.2486C14.3696 8.75042 11.8892 7 9 7C5.13401 7 2 10.134 2 14Z" fill="#D0D7E9"/>
    </svg>
`;

const scatteredClouds = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 15.866 5.13401 19 9 19H17C19.7614 19 22 16.7614 22 14C22 11.2386 19.7614 9 17 9C16.4547 9 15.9299 9.08728 15.4386 9.24864C14.3696 6.75042 11.8892 5 9 5C5.13401 5 2 8.13401 2 12Z" fill="#CCD2E3"/>
    </svg>
`;

const scatteredCloudsNight = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 15.866 5.13401 19 9 19H17C19.7614 19 22 16.7614 22 14C22 11.2386 19.7614 9 17 9C16.4547 9 15.9299 9.08728 15.4386 9.24864C14.3696 6.75042 11.8892 5 9 5C5.13401 5 2 8.13401 2 12Z" fill="#D0D7E9"/>
    </svg>
`;

const brokenClouds = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 15.866 5.13401 19 9 19H17C19.7614 19 22 16.7614 22 14C22 11.2386 19.7614 9 17 9C16.4547 9 15.9299 9.08728 15.4386 9.24864C14.3696 6.75042 11.8892 5 9 5C5.13401 5 2 8.13401 2 12Z" fill="#566580"/>
    </svg>
`;

const showerRain = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.00005 4C6.00005 4 3 6.57812 3 9.05259C3 10.1875 3.75 12.25 6 12.25C8.25 12.25 9 10.1875 9 9.05259C9 6.29663 6.00005 4 6.00005 4Z" fill="#77CEFF"/>
        <path d="M15.0001 6C15.0001 6 9 11 9 15.799C9 18 10.5 22 15 22C19.5 22 21 18 21 15.799C21 10.4541 15.0001 6 15.0001 6Z" fill="#77CEFF"/>
    </svg>
`;

const rain = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0001 4C12.0001 4 6 9 6 13.799C6 16 7.5 20 12 20C16.5 20 18 16 18 13.799C18 8.45408 12.0001 4 12.0001 4Z" fill="#77CEFF"/>
    </svg>
`;

const thunderstorm = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.23072 22L10 14H5L15.7691 2L14 10H19L8.23072 22Z" fill="#FFC634"/>
    </svg>
`;

const snow = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="1" fill="#77CEFF"/>
        <path d="M10.51 9.41926L12 8.57473L13.49 9.41926L14.9664 10.2874L14.98 12L14.9664 13.7126L13.49 14.5807L12 15.4253L10.51 14.5807L9.03363 13.7126L9.02002 12L9.03363 10.2874L10.51 9.41926Z" stroke="#77CEFF"/>
        <path d="M12.0001 8.57143V6.28571M12.0001 4V6.28571M12.0001 6.28571L9.71436 5.14286M12.0001 6.28571L14.2858 5.14286" stroke="#77CEFF" stroke-linecap="round"/>
        <path d="M11.9999 15.4286L11.9999 17.7143M11.9999 20L11.9999 17.7143M11.9999 17.7143L14.2856 18.8571M11.9999 17.7143L9.71422 18.8571" stroke="#77CEFF" stroke-linecap="round"/>
        <path d="M11.9999 15.4286L11.9999 17.7143M11.9999 20L11.9999 17.7143M11.9999 17.7143L14.2856 18.8571M11.9999 17.7143L9.71422 18.8571" stroke="#77CEFF" stroke-linecap="round"/>
        <path d="M14.969 10.2857L16.9485 9.14285M18.928 7.99999L16.9485 9.14285M16.9485 9.14285L16.7954 6.59194M16.9485 9.14285L19.0811 10.5509" stroke="#77CEFF" stroke-linecap="round"/>
        <path d="M9.03096 13.7143L7.05147 14.8571M5.07199 16L7.05147 14.8571M7.05147 14.8571L7.20459 17.4081M7.05147 14.8571L4.91887 13.4491" stroke="#77CEFF" stroke-linecap="round"/>
        <path d="M14.969 13.7142L16.9485 14.857M18.9279 15.9999L16.9485 14.857M16.9485 14.857L19.0811 13.449M16.9485 14.857L16.7953 17.4079" stroke="#77CEFF" stroke-linecap="round"/>
        <path d="M9.03103 10.2858L7.05154 9.14299M5.07206 8.00013L7.05154 9.14299M7.05154 9.14299L4.91894 10.551M7.05154 9.14299L7.20466 6.59207" stroke="#77CEFF" stroke-linecap="round"/>
    </svg>
`;

const mist = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22 5H6V6H22V5ZM18 7H2V8H18V7ZM6 9H22V10H6V9ZM18 11H2V12H18V11ZM6 13H22V14H6V13ZM18 15H2V16H18V15ZM6 17H22V18H6V17ZM18 19H2V20H18V19Z" fill="#CCD2E3"/>
    </svg>
`;

export {
	sun,
	moon,
	fewClouds,
	fewCloudsNight,
	scatteredClouds,
	scatteredCloudsNight,
	brokenClouds,
	showerRain,
	rain,
	thunderstorm,
	snow,
	mist,
};
