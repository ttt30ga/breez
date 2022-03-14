const sun = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#FFC634"/>
    </svg>

`;

const fewClouds = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16.5" cy="9.5" r="5.5" fill="#FFC634"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 17.866 5.13401 21 9 21H17C19.7614 21 22 18.7614 22 16C22 13.2386 19.7614 11 17 11C16.4547 11 15.9299 11.0873 15.4386 11.2486C14.3696 8.75042 11.8892 7 9 7C5.13401 7 2 10.134 2 14Z" fill="#CCD2E3"/>
    </svg>
`;

const scatteredClouds = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 15.866 5.13401 19 9 19H17C19.7614 19 22 16.7614 22 14C22 11.2386 19.7614 9 17 9C16.4547 9 15.9299 9.08728 15.4386 9.24864C14.3696 6.75042 11.8892 5 9 5C5.13401 5 2 8.13401 2 12Z" fill="#CCD2E3"/>
    </svg>
`;

const brokenClouds = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 15.866 5.13401 19 9 19H17C19.7614 19 22 16.7614 22 14C22 11.2386 19.7614 9 17 9C16.4547 9 15.9299 9.08728 15.4386 9.24864C14.3696 6.75042 11.8892 5 9 5C5.13401 5 2 8.13401 2 12Z" fill="#72819B"/>
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
        <rect x="6" y="5" width="16" height="1" fill="#CCD2E3"/>
        <rect x="2" y="7" width="16" height="1" fill="#CCD2E3"/>
        <rect x="6" y="9" width="16" height="1" fill="#CCD2E3"/>
        <rect x="2" y="11" width="16" height="1" fill="#CCD2E3"/>
        <rect x="6" y="13" width="16" height="1" fill="#CCD2E3"/>
        <rect x="2" y="15" width="16" height="1" fill="#CCD2E3"/>
        <rect x="6" y="17" width="16" height="1" fill="#CCD2E3"/>
        <rect x="2" y="19" width="16" height="1" fill="#CCD2E3"/>
    </svg>

`;

export { sun, fewClouds, scatteredClouds, brokenClouds, showerRain, rain, thunderstorm, snow, mist };
